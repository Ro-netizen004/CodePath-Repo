import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',      // or remote host
  database: 'demo_db',
  password: 'Rishaan.R1',
  port: 5432,             // default PostgreSQL port
});

export default pool;
