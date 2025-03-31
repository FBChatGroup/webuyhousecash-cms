import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function runMigrations() {
  try {
    console.log("Running database migrations...")

    // Only run migrations in production environment
    if (process.env.NODE_ENV === "production") {
      await execAsync("npx prisma migrate deploy")
      console.log("Migrations completed successfully")
    } else {
      console.log("Skipping migrations in development environment")
    }

    return { success: true }
  } catch (error) {
    console.error("Error running migrations:", error)
    return { success: false, error }
  }
}

