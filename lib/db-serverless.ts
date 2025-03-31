import { Pool, type PoolClient } from "pg"

// For serverless environments, we need to handle connections differently
// This approach creates a new connection for each request but ensures
// connections are properly closed

// Create a function to get a new client
export async function getClient(): Promise<PoolClient> {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set")
  }

  // Configure SSL based on environment
  const ssl = process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false

  const pool = new Pool({
    connectionString,
    ssl,
    max: 1, // Use a single connection
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

  const client = await pool.connect()

  // Monkey patch the release method to also end the pool
  const originalRelease = client.release
  client.release = () => {
    originalRelease.call(client)
    pool.end()
    return Promise.resolve()
  }

  return client
}

// Helper function to execute a single query and release the client
export async function queryOnce<T>(text: string, params: any[] = []): Promise<T[]> {
  const client = await getClient()

  try {
    const result = await client.query(text, params)
    return result.rows as T[]
  } finally {
    client.release()
  }
}

// Helper function for transactions in serverless environments
export async function withTransactionServerless<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getClient()

  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

