import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Testimonial = {
  id: string
  name: string
  location?: string
  content: string
  rating: number
  featured?: boolean
  image?: string
  date?: Date
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  featured?: boolean
}

export function Testimonials({ testimonials = [], featured = false }: TestimonialsProps) {
  // If no testimonials were found from the database, show some fallback testimonials
  const displayTestimonials =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "1",
            name: "John Smith",
            location: "Richmond",
            content:
              "I needed to sell my house quickly after a divorce. WeBuyHouseCash made it easy and stress-free. I got a fair offer and closed in just 9 days!",
            rating: 5,
          },
          {
            id: "2",
            name: "Sarah Johnson",
            location: "St Kilda",
            content:
              "My inherited property needed major repairs I couldn't afford. These guys bought it as-is and handled everything. No repairs, no hassle.",
            rating: 5,
          },
          {
            id: "3",
            name: "Michael Brown",
            location: "Brunswick",
            content:
              "I was facing foreclosure and needed to sell fast. WeBuyHouseCash came through with a cash offer that helped me get out of a tough situation. So grateful!",
            rating: 4,
          },
        ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayTestimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center mb-4">
              {testimonial.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">{testimonial.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                {testimonial.location && <p className="text-sm text-muted-foreground">{testimonial.location}</p>}
              </div>
            </div>

            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>

            <p className="text-muted-foreground flex-grow">"{testimonial.content}"</p>

            {testimonial.date && (
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(testimonial.date).toLocaleDateString("en-AU", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

