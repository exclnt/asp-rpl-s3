import { query } from '@/lib/db';
import { isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { NextResponse } from 'next/server';

type DBValue = string | number | boolean | Date;

interface AbsensiInput {
  nama: string;
  tanggal: string | Date;
  jam: string;
  kelas: string;
  nis: string;
  waktusholat: 'duhur' | 'ashar';
}

export async function POST(req: Request) {
  try {
    const { dataSiswi } = (await req.json()) as { dataSiswi: AbsensiInput[] };

    if (!Array.isArray(dataSiswi) || dataSiswi.length === 0) {
      throw new Error('dataSiswi harus berupa array dan tidak boleh kosong');
    }

    const columns = Object.keys(dataSiswi[0]) as (keyof AbsensiInput)[];
    const values: string[] = [];
    const params: DBValue[] = [];

    dataSiswi.forEach((row, i) => {
      const baseIndex = i * columns.length;
      const placeholders = columns
        .map((_, j) => `$${baseIndex + j + 1}`)
        .join(', ');
      values.push(`(${placeholders})`);
      for (const col of columns) {
        params.push(row[col]);
      }
    });

    const sql = `
      WITH to_insert (${columns.join(', ')}) AS (
        VALUES ${values.join(', ')}
      ),
      inserted AS (
        INSERT INTO m_absensi (${columns.join(', ')})
        SELECT
          nama,
          tanggal::date,  
          jam::time,       
          kelas,
          nis,
          waktusholat
        FROM to_insert
        ON CONFLICT (nis, tanggal, waktusholat) DO NOTHING
        RETURNING nis, tanggal, waktusholat
      )
      SELECT
        t.*,
        CASE
          WHEN i.nis IS NOT NULL THEN 'inserted'
          ELSE 'duplicate'
        END AS status
      FROM to_insert t
      LEFT JOIN inserted i
      ON t.nis = i.nis 
      AND t.tanggal::date = i.tanggal 
      AND t.waktusholat = i.waktusholat;
    `;

    const { rows } = await query(sql, params);

    const inserted = rows.filter((r) => r.status === 'inserted');
    const duplicates = rows.filter((r) => r.status === 'duplicate');

    return NextResponse.json(
      {
        code: 200,
        status: 'success',
        message: `Berhasil menambahkan ${inserted.length} data, ${duplicates.length} duplikat diabaikan`,
        data: {
          inserted,
          duplicates,
        },
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
