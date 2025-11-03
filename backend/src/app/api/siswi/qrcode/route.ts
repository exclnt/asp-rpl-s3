import { query } from '@/lib/db';
import { generateQrSvg, isIError } from '@/lib/utils';
import { IError } from '@/types/response.type';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nis = searchParams.get('nis');

    if (!nis) {
      throw new Error('nis parameter tidak ditemukan');
    }

    const { rows } = await query(
      'select qr_code from m_siswi where m_siswi.nis=$1',
      [nis]
    );

    const siswi = JSON.parse(rows[0].qr_code);
    const svg = await generateQrSvg({
      nis: siswi.nis,
      nama: siswi.nama,
      kelas: siswi.kelas,
    });

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
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
