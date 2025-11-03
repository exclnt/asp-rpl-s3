import { NextResponse } from 'next/server';
import { generateDataQrcode, isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { query } from '@/lib/db';

let errorData: IError = {
  code: 0,
  status: '',
  message: '',
  error: '',
};

export async function POST(req: Request) {
  try {
    const userRole = req.headers.get('x-user-role');

    const { roleAdd, nis, name, kelas, password } = await req.json();
    let data;

    if (userRole != 'admin') throw new Error('role bukan admin');

    if (roleAdd == 'admin') {
      const { rows } = await query(
        'insert into m_admin (username ,"password" ) values ($1,$2) RETURNING username',
        [name, password]
      );
      data = rows[0];
    } else if (roleAdd == 'tamir') {
      const { rows } = await query(
        'insert into m_tamir ( nis,nama ,"password" ) values ($1,$2,$3) RETURNING nama',
        [nis, name, password]
      );
      data = rows[0];
    } else {
      const qrcode = generateDataQrcode(nis, name, kelas);
      const { rows } = await query(
        'insert into m_siswi ( nis, nama , kelas, qr_code ) values ($1,$2,$3,$4) RETURNING nama',
        [nis, name, kelas, qrcode]
      );
      data = rows[0];
    }

    return NextResponse.json(
      {
        code: 200,
        status: 'succes',
        message: `berhasil menambah data ${roleAdd}`,
        data: {
          data,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (isIError(err)) {
      errorData = err;
    } else if (err instanceof Error) {
      errorData = {
        code: 403,
        status: 'fail',
        message: err.message,
        error: err.name,
      };
      return NextResponse.json(errorData, { status: 403 });
    }
    return NextResponse.json(errorData, { status: 500 });
  }
}
