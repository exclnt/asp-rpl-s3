import { IError } from '@/types/response.type';
import QRCode from 'qrcode';

export function isIError(err: unknown): err is IError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    'status' in err &&
    'error' in err &&
    'message' in err
  );
}

export function generateDataQrcode(nis: string, nama: string, kelas: string) {
  return JSON.stringify({
    nis: nis,
    nama: nama,
    kelas: kelas,
  });
}

// export async function generateQRCode(
//   nis: string,
//   nama: string,
//   kelas: string
// ): Promise<string> {
//   const data = generateDataQrcode(nis, nama, kelas);

//   try {
//     // Tunggu QR code dibuat (karena toDataURL() adalah async)
//     const qrData = await QRCode.toDataURL(data);

//     const jsonResult = JSON.stringify({
//       qrData,
//       createdAt: new Date().toISOString(),
//     });

//     return jsonResult; // hasil string JSON
//   } catch (error) {
//     console.error('Gagal generate QR:', error);
//     throw new Error('Gagal generate QR Code');
//   }
// }

export async function generateQrSvg(data: object): Promise<string> {
  try {
    const svg = await QRCode.toString(JSON.stringify(data), {
      type: 'svg',
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      margin: 2,
    });

    return svg;
  } catch (error) {
    console.error('Gagal generate QR Code SVG:', error);
    throw new Error('Gagal membuat QR Code');
  }
}
