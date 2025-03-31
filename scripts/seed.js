const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

// Generate a CUID-like ID
function generateId() {
  return "c" + crypto.randomBytes(8).toString("hex")
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set")
    process.exit(1)
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })

  try {
    console.log("Connecting to database...")

    // Read and execute schema SQL
    const schemaPath = path.join(__dirname, "schema.sql")
    const schemaSql = fs.readFileSync(schemaPath, "utf8")

    console.log("Creating database schema...")
    await pool.query(schemaSql)

    console.log("Database schema created successfully")

    // Check if we need to seed initial data
    const seoResult = await pool.query('SELECT COUNT(*) FROM "SeoSettings"')
    if (Number.parseInt(seoResult.rows[0].count) === 0) {
      console.log("Seeding initial data...")

      // Seed SEO settings
      const seoId = generateId()
      await pool.query(
        `INSERT INTO "SeoSettings" (
          "id", "siteName", "siteDescription"
        ) VALUES ($1, $2, $3)`,
        [seoId, "WeBuyHouseCash Melbourne", "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle."],
      )

      // Seed business info
      const businessId = generateId()
      const openingHours = JSON.stringify([
        { day: "Monday", opens: "09:00", closes: "17:00", isClosed: false },
        { day: "Tuesday", opens: "09:00", closes: "17:00", isClosed: false },
        { day: "Wednesday", opens: "09:00", closes: "17:00", isClosed: false },
        { day: "Thursday", opens: "09:00", closes: "17:00", isClosed: false },
        { day: "Friday", opens: "09:00", closes: "17:00", isClosed: false },
        { day: "Saturday", opens: "10:00", closes: "15:00", isClosed: false },
        { day: "Sunday", opens: "10:00", closes: "15:00", isClosed: true },
      ])

      await pool.query(
        `INSERT INTO "BusinessInfo" (
          "id", "businessName", "description", "openingHours"
        ) VALUES ($1, $2, $3, $4)`,
        [
          businessId,
          "WeBuyHouseCash Melbourne",
          "Sell your Melbourne house fast for cash. No fees, no repairs, no hassle.",
          openingHours,
        ],
      )

      // Seed FAQs
      const faqs = [
        {
          id: generateId(),
          question: "How quickly can you buy my house?",
          answer: "We can typically close in as little as 7 days, depending on your situation and needs.",
          order: 1,
        },
        {
          id: generateId(),
          question: "Do I need to make repairs before selling?",
          answer: "No, we buy houses in any condition. You don't need to make any repairs or improvements.",
          order: 2,
        },
        {
          id: generateId(),
          question: "Are there any fees or commissions?",
          answer: "No, there are no fees or commissions. The offer we make is the amount you receive.",
          order: 3,
        },
      ]

      for (const faq of faqs) {
        await pool.query(
          `INSERT INTO "Faq" ("id", "question", "answer", "order")
           VALUES ($1, $2, $3, $4)`,
          [faq.id, faq.question, faq.answer, faq.order],
        )
      }

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

// Run the main function
main()

