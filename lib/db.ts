import { Pool } from "pg"
import { getEnv } from "./env"

// Create a connection pool
const pool = new Pool({
  connectionString: getEnv("DATABASE_URL"),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to become available
})

// Test the connection
pool.on("connect", () => {
  console.log("Connected to PostgreSQL database")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query", { text, error })
    throw error
  }
}

// Helper function to get a single row
export async function getRow(text: string, params?: any[]) {
  const res = await query(text, params)
  return res.rows[0]
}

// Helper function to get multiple rows
export async function getRows(text: string, params?: any[]) {
  const res = await query(text, params)
  return res.rows
}

// Helper function to insert a row and return it
export async function insertRow(table: string, data: Record<string, any>) {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ")
  const columns = keys.join(", ")

  const text = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`
  const res = await query(text, values)
  return res.rows[0]
}

// Helper function to update a row and return it
export async function updateRow(table: string, id: string, data: Record<string, any>) {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ")

  const text = `UPDATE ${table} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`
  const res = await query(text, [...values, id])
  return res.rows[0]
}

// Helper function to delete a row
export async function deleteRow(table: string, id: string) {
  const text = `DELETE FROM ${table} WHERE id = $1 RETURNING *`
  const res = await query(text, [id])
  return res.rows[0]
}

// Close the pool when the application is shutting down
process.on("SIGINT", () => {
  pool.end()
  console.log("Pool has ended")
  process.exit(0)
})

export default {
  query,
  getRow,
  getRows,
  insertRow,
  updateRow,
  deleteRow,
  pool,
}

