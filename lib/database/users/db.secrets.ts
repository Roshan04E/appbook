import { Pool } from "pg"

const pool = new Pool({
  user: 'postgres',
  password: 'mnbv',
  host: 'localhost',
  port: 5432,
  database: 'secrets'
})

export async function dbSecretsClient() {
  return pool
}
