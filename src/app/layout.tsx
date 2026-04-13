import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electricistas a Domicilio y Proyectos Industriales | Electric Home El Salvador",
  description: "Servicios eléctricos residenciales, comerciales e industriales en El Salvador. Electricistas certificados, mantenimiento preventivo y reparación de fugas. ¡Contáctenos!",
  keywords: ["electricista a domicilio", "electricistas el salvador", "electricista san salvador", "instalaciones electricas", "mantenimiento electrico", "fugas electricas", "energia industrial", "tableros electricos", "paneles solares el salvador"],
  authors: [{ name: "Electric Home" }],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    url: "https://electrichomesv.com/",
    title: "Electricistas a Domicilio y Proyectos Industriales | Electric Home El Salvador",
    description: "Servicios eléctricos residenciales, comerciales e industriales en El Salvador. Electricistas certificados, mantenimiento preventivo y detección de fugas.",
    images: [{ url: "https://electrichomesv.com/logo.png" }],
    siteName: "Electric Home El Salvador",
    locale: "es_SV",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electricistas a Domicilio y Proyectos | Electric Home El Salvador",
    description: "Especialistas en instalaciones y mantenimientos eléctricos de alto nivel. Cobertura en El Salvador.",
    images: ["https://electrichomesv.com/logo.png"],
  },
  alternates: {
    canonical: "https://electrichomesv.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-SV">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Electrician",
              "name": "Electric Home El Salvador",
              "image": "https://electrichomesv.com/logo.png",
              "url": "https://electrichomesv.com",
              "telephone": "+50373264129",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Salvador",
                "addressCountry": "SV"
              },
              "description": "Empresa especializada en instalaciones eléctricas industriales, residenciales y comerciales en El Salvador. Servicios a domicilio y emergencias.",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "17:00"
              },
              "priceRange": "$$",
              "sameAs": [
                "https://www.instagram.com/electrichome4756?igsh=NnBrNDd3dmp0cHg1",
                "https://www.tiktok.com/@electric_home2005?_r=1&_t=ZS-952lB9P7ZfY",
                "http://facebook.com/electrichomesv/"
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
