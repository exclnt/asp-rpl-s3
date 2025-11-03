import { query } from '@/lib/db';
import { generateDataQrcode, isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { NextResponse } from 'next/server';

type DBValue = string | number | boolean | Date;

interface IDataSiswi {
  nama: string;
  kelas: string;
  nis: string;
  qr_code?: string;
}

function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

export async function POST(req: Request) {
  try {
    const { dataSiswi } = (await req.json()) as { dataSiswi: IDataSiswi[] };

    if (!Array.isArray(dataSiswi) || dataSiswi.length === 0) {
      throw new Error('dataSiswi harus berupa array dan tidak boleh kosong');
    }

    const siswiWithQr: IDataSiswi[] = await Promise.all(
      dataSiswi.map(async (siswi) => ({
        ...siswi,
        qr_code: await generateDataQrcode(siswi.nis, siswi.nama, siswi.kelas),
      }))
    );

    const columns = Object.keys(siswiWithQr[0]) as (keyof IDataSiswi)[];
    const values: string[] = [];
    const params: DBValue[] = [];

    siswiWithQr.forEach((row, i) => {
      const baseIndex = i * columns.length;
      const placeholders = columns
        .map((_, j) => `$${baseIndex + j + 1}`)
        .join(', ');
      values.push(`(${placeholders})`);

      for (const col of columns) {
        const val = getValue(row, col);
        params.push((val as DBValue) ?? null);
      }
    });

    const sql = `
      WITH to_insert (${columns.join(', ')}) AS (
        VALUES ${values.join(', ')}
      ),
      inserted AS (
        INSERT INTO m_siswi (${columns.join(', ')})
        SELECT * FROM to_insert
        ON CONFLICT (nis) DO NOTHING
        RETURNING nis, nama, kelas, qr_code
      )
      SELECT
        t.nis, t.nama, t.kelas, t.qr_code,
        CASE WHEN i.nis IS NULL THEN 'duplicate' ELSE 'inserted' END AS status
      FROM to_insert t
      LEFT JOIN inserted i ON t.nis = i.nis;
    `;

    const { rows } = await query(sql, params);

    const inserted = rows.filter((r) => r.status === 'inserted');
    const duplicates = rows.filter((r) => r.status === 'duplicate');

    return NextResponse.json(
      {
        code: 200,
        status: 'success',
        message: ` ${inserted.length} ditambahkan, ${duplicates.length} duplikat.`,
        data: { inserted, duplicates },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    let errorData: IError;

    if (isIError(err)) {
      errorData = err;
    } else if (err instanceof Error) {
      errorData = {
        code: 403,
        status: 'fail',
        message: err.message,
        error: err.name,
      };
    } else {
      errorData = {
        code: 500,
        status: 'fail',
        message: 'Unexpected error',
        error: 'Unknown',
      };
    }

    return NextResponse.json(errorData, { status: errorData.code || 500 });
  }
}
