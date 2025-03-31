import prismadb from "@/lib/prismadb"
import { generateFAQSchema } from "@/lib/structured-data"
import StructuredData from "@/components/structured-data"
import { generatePageSchemas } from "@/lib/structured-data"

export default async function FAQPage() {
  // Get global SEO settings
  const seoSettings = (await prismadb.seoSettings.findFirst()) || {}

  // In a real app, these would come from your database
  const faqs = [
    {
      question: "How quickly can you buy my house?",
      answer: "We can typically close in as little as 7 days, depending on your situation and needs.",
    },
    {
      question: "Do I need to make repairs before selling?",
      answer: "No, we buy houses in any condition. You don't need to make any repairs or improvements.",
    },
    {
      question: "Are there any fees or commissions?",
      answer: "No, there are no fees or commissions. The offer we make is the amount you receive.",
    },
    {
      question: "How does the process work?",
      answer:
        "First, contact us with your property details. We'll make you a fair cash offer within 24 hours. If you accept, we can close on your timeline, often in as little as 7 days.",
    },
    {
      question: "What types of properties do you buy?",
      answer:
        "We buy all types of residential properties in Melbourne, including single-family homes, duplexes, townhouses, condos, and multi-family units.",
    },
  ]

  // Generate FAQ schema
  const faqSchema = generateFAQSchema(faqs)

  // Get page schemas
  const pageSchemas = await generatePageSchemas("faq", "/faq", "Frequently Asked Questions", seoSettings)

  // Combine all schemas
  const allSchemas = [...pageSchemas, faqSchema]

  return (
    <div className="container mx-auto py-8">
      <StructuredData data={allSchemas} nested={true} />
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

