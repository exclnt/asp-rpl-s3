import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { IError } from '@/types/response.type';
import { isIError } from '@/lib/utils';
import { SignJWT } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || 'rahasia-sayang';
const secret = new TextEncoder().encode(SECRET_KEY);

let errorData: IError = {
  code: 0,
  status: '',
  message: '',
  error: '',
};

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const adminResult = await query(
      'SELECT id_admin, username FROM m_admin WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];

      const token = await new SignJWT({
        id: admin.id_admin,
        username: admin.username,
        role: 'admin',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      return NextResponse.json({
        code: 200,
        status: 'success',
        message: 'Login admin berhasil ',
        data: {
          token,
          role: 'admin',
          name: admin.username,
        },
      });
    }

    const tamirResult = await query(
      'SELECT id_tamir, nama FROM m_tamir WHERE nama = $1 AND password = $2',
      [username, password]
    );

    if (tamirResult.rows.length > 0) {
      const tamir = tamirResult.rows[0];

      const token = await new SignJWT({
        id: tamir.id_tamir,
        name: username,
        role: 'tamir',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      return NextResponse.json({
        code: 200,
        status: 'success',
        message: 'Login tamir berhasil ',
        data: {
          token,
          role: 'tamir',
          name: username,
        },
      });
    }

    return NextResponse.json(
      {
        code: 401,
        status: 'fail',
        message: 'Username atau password salah ',
      },
      { status: 401 }
    );
  } catch (err) {
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
