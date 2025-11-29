import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function testSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.log('❌ Environment variable tidak ditemukan!');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', url);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', key);
    return;
  }

  const supabase = createClient(url, key);

  console.log('🔍 Menguji koneksi Supabase...');

  const { data, error } = await supabase.from('tbl_petugas').select('*');

  if (error) {
    console.log('❌ Error saat koneksi atau query:');
    console.log(error);
  } else {
    console.log('✅ Berhasil terhubung ke Supabase!');
    console.log('📦 Data yang diterima:');
    console.log(data);
  }
}

testSupabase();
