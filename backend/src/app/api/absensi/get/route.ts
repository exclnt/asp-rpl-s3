import { query } from '@/lib/db';
import { isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const roleUser = await req.headers.get('x-user-role');
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;
    const offset = (page - 1) * limit;

    if (!(roleUser == 'tamir' || roleUser == 'admin')) {
      throw new Error('role tidak diizinkan');
    }

    const { rows } = await query(
      'SELECT * FROM m_absensi ORDER BY id_absensi LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    const totalResult = await query('SELECT COUNT(*) AS total FROM m_absensi');
    const total = Number(totalResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        code: 200,
        status: 'success',
        message: 'berhasil mengambil data absensi',
        data: {
          absensi: rows,
          page,
          limit,
          total,
          totalPages,
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
