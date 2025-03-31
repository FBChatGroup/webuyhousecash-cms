const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

// Get the database URL from environment variables
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error("DATABASE_URL environment variable is not set")
  process.exit(1)
}

// Create a new pool
const pool = new Pool({
  connectionString: databaseUrl,
})

async function initDb() {
  try {
    // Check if the database is accessible
    await pool.query("SELECT NOW()")
    console.log("Database connection successful")

    // Read the schema SQL file
    const schemaPath = path.join(__dirname, "schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    // Execute the schema SQL
    console.log("Creating database schema...")
    await pool.query(schemaSql)
    console.log("Database schema created successfully")

    // Check if we need to seed the database
    const { rows } = await pool.query("SELECT COUNT(*) FROM seo_settings")
    const count = Number.parseInt(rows[0].count)

    if (count === 0) {
      console.log("Seeding initial data...")

      // Seed SEO settings
      await pool.query(`
        INSERT INTO seo_settings (
          site_name, site_description, created_at, updated_at
        ) VALUES (
          'WeBuyHouseCash.com.au', 
          'We buy houses for cash in Melbourne, Australia. Get a fair cash offer for your home today.', 
          NOW(), 
          NOW()
        )
      `)

      // Seed business info
      await pool.query(`
        INSERT INTO business_info (
          business_name, legal_name, description, telephone, email, website, 
          street_address, city, state, postal_code, country, created_at, updated_at
        ) VALUES (
          'We Buy House Cash', 
          'We Buy House Cash Pty Ltd', 
          'We buy houses for cash in Melbourne, Australia. Get a fair cash offer for your home today.', 
          '+61 3 9123 4567', 
          'info@webuyhousecash.com.au', 
          'https://webuyhousecash.com.au', 
          '123 Main Street', 
          'Melbourne', 
          'VIC', 
          '3000', 
          'Australia', 
          NOW(), 
          NOW()
        )
      `)

      console.log("Initial data seeded successfully")
    } else {
      console.log("Database already contains data, skipping seed")
    }

    console.log("Database initialization completed successfully")
  } catch (error) {
    console.error("Error initializing database:", error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run the initialization
initDb()

