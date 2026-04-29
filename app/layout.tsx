import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garage Door Guy Near Me | 24/7 Emergency Repair | Garage Experts Inc.",
  description: "Need a garage door guy near you? Our certified technicians fix stuck doors, broken openers, sensor issues & more. Fast dispatch in 30+ metro areas. Call (951)-981-9160 for 24/7 emergency garage door repair. Satisfaction guaranteed!",
  authors: [{ name: "Garage Experts Inc." }],
  openGraph: {
    title: "Garage Door Guy Near Me | 24/7 Emergency Repair",
    description: "Expert garage door repair technicians available now. We fix opener issues, stuck doors, sensor problems & more. Fast local dispatch.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Garage Experts Inc.",
    "description": "Professional garage door repair and maintenance services",
    "telephone": "(951)-981-9160",
    "serviceArea": {
      "@type": "Place",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Garage Door Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Garage Door Opener Repair" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Garage Door Track Repair" }
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Garage Door Sensor Repair" }
        }
      ]
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247"
    }
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900`} suppressHydrationWarning>
        
        {/* Next.js optimized script tag for structured data */}
        <Script
          id="schema-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
      </body>
    </html>
  );
}