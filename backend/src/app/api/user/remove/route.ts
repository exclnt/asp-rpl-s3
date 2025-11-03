import { query } from '@/lib/db';
import { isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    let tmp;
    const { searchParams } = new URL(req.url);
    const nis = await searchParams.get('nis');
    const stack = await searchParams.get('stack');
    const username = await searchParams.get('username');

    if (stack == 'admin' && username) {
      const { rows } = await query(
        'DELETE FROM m_admin WHERE username = $1 RETURNING *',
        [username]
      );
      tmp = rows[0];
    } else if (stack == 'tamir' && nis) {
      const { rows } = await query(
        'DELETE FROM m_tamir WHERE nis = $1 RETURNING *',
        [nis]
      );
      tmp = rows[0];
    } else if (stack == 'siswi' && nis) {
      const { rows } = await query(
        'DELETE FROM m_siswi WHERE nis = $1 RETURNING *',
        [nis]
      );
      tmp = rows[0];
    } else {
      throw new Error('nis atau userbame tidak ditemukan');
    }
    console.log(tmp);
    return NextResponse.json(
      {
        code: 200,
        status: 'succes',
        message: 'baehasil meghapus user ',
        data: {
          tmp,
        },
      },
      { status: 200 }
    );
  } catch (err) {
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
