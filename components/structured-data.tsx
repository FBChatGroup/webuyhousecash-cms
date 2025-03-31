import Script from "next/script"
import { jsonLdScriptProps, type StructuredDataBase, generateNestedStructuredData } from "@/lib/structured-data"

interface StructuredDataProps {
  data: StructuredDataBase | StructuredDataBase[]
  nested?: boolean
}

export default function StructuredData({ data, nested = true }: StructuredDataProps) {
  // If nested is true and data is an array, nest the schemas
  const processedData = nested && Array.isArray(data) ? generateNestedStructuredData(data) : data

  return <Script id="structured-data" {...jsonLdScriptProps(processedData)} />
}

