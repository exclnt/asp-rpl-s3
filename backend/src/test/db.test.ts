import { checkConnection } from '@/lib/db';

checkConnection().then((ok) => {
  if (ok) console.log('PostgreSQL connection OK!');
  else console.log('Connection failed!');
  process.exit(0);
});
