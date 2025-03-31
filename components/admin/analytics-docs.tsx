import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function AnalyticsDocs() {
  return (
    <div className="space-y-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Analytics Configuration</AlertTitle>
        <AlertDescription>
          All analytics services are optional. The website will function normally without them.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ga">
          <AccordionTrigger>How to get a Google Analytics ID</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Sign in to your{" "}
                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics account
                </a>
              </li>
              <li>Create a new property or select an existing one</li>
              <li>Go to Admin &gt; Property Settings</li>
              <li>
                Your Google Analytics ID (GA ID) will be displayed at the top as "Tracking ID" (UA-XXXXXXXX-X) for
                Universal Analytics or "Measurement ID" (G-XXXXXXXXXX) for Google Analytics 4
              </li>
              <li>Copy this ID and paste it in the field above</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gtm">
          <AccordionTrigger>How to get a Google Tag Manager ID</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Sign in to your{" "}
                <a
                  href="https://tagmanager.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Tag Manager account
                </a>
              </li>
              <li>Create a new container or select an existing one</li>
              <li>Your GTM ID will be displayed at the top of the page (GTM-XXXXXXX)</li>
              <li>Copy this ID and paste it in the field above</li>
            </ol>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fb">
          <AccordionTrigger>How to get a Facebook Pixel ID</AccordionTrigger>
          <AccordionContent>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>
                Sign in to your{" "}
                <a
                  href="https://business.facebook.com/events_manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Facebook Business Manager account
                </a>
              </li>
              <li>Go to Events Manager &gt; Pixels</li>
              <li>Create a new pixel or select an existing one</li>
              <li>Your Pixel ID will be displayed in the pixel settings</li>
              <li>Copy this ID and paste it in the field above</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

