import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://electrichomesv.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Electric Home | Electricistas en El Salvador — Residencial, Comercial e Industrial",
    template: "%s | Electric Home El Salvador",
  },

  description:
    "Empresa líder en servicios eléctricos en El Salvador. Electricistas certificados para instalaciones residenciales, comerciales e industriales, mantenimiento preventivo, corrección de fugas eléctricas y emergencias 24/7 en San Salvador.",

  keywords: [
    "electricista El Salvador",
    "electricista a domicilio San Salvador",
    "electricista certificado El Salvador",
    "instalaciones eléctricas residenciales",
    "mantenimiento eléctrico industrial",
    "electricista emergencias San Salvador",
    "fuga eléctrica El Salvador",
    "tableros eléctricos El Salvador",
    "electricista industrial El Salvador",
    "electricista comercial San Salvador",
    "instalación eléctrica El Salvador",
    "mantenimiento preventivo eléctrico",
    "electric home el salvador",
  ],

  authors: [{ name: "Electric Home El Salvador", url: BASE_URL }],
  creator: "Electric Home El Salvador",
  publisher: "Electric Home El Salvador",
  category: "Electrical Services",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Electric Home El Salvador",
    locale: "es_SV",
    title: "Electric Home | Electricistas Certificados en El Salvador",
    description:
      "Soluciones eléctricas de alta fidelidad para industrias, comercios y hogares en El Salvador. Visita técnica, mantenimiento preventivo y atención de emergencias.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Electric Home El Salvador — Ingeniería Eléctrica de Alta Fidelidad",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@electrichomesv",
    creator: "@electrichomesv",
    title: "Electric Home | Electricistas en El Salvador",
    description:
      "Servicios eléctricos residenciales, comerciales e industriales. Atención de emergencias 24/7 en San Salvador, El Salvador.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Electric Home El Salvador",
      },
    ],
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-SV": BASE_URL,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? undefined,
  },

  other: {
    "geo.region": "SV-SS",
    "geo.placename": "San Salvador, El Salvador",
    "geo.position": "13.6894;-89.1872",
    "ICBM": "13.6894, -89.1872",
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Electrician", "LocalBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "Electric Home El Salvador",
  alternateName: "Electric Home",
  description:
    "Empresa especializada en instalaciones eléctricas industriales, residenciales y comerciales en El Salvador. Servicios a domicilio, mantenimiento preventivo y atención de emergencias.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 200,
    height: 200,
  },
  image: `${BASE_URL}/opengraph-image`,
  telephone: "+50377207711",
  email: "info@electrichomesv.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Salvador",
    addressRegion: "San Salvador",
    addressCountry: "SV",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.6894,
    longitude: -89.1872,
  },
  areaServed: [
    { "@type": "City", name: "San Salvador" },
    { "@type": "State", name: "La Libertad" },
    { "@type": "Country", name: "El Salvador" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 13.6894,
      longitude: -89.1872,
    },
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Eléctricos",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mantenimiento Eléctrico Preventivo",
          description: "Inspección y mantenimiento periódico de instalaciones eléctricas residenciales, comerciales e industriales.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nuevas Instalaciones Eléctricas",
          description: "Diseño e instalación de sistemas eléctricos desde cero para proyectos nuevos o remodelaciones.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Corrección de Fugas Eléctricas",
          description: "Diagnóstico y corrección de fugas eléctricas para garantizar la seguridad de su hogar o empresa.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mantenimiento Correctivo de Emergencia",
          description: "Servicio de atención de urgencias y emergencias eléctricas con respuesta inmediata.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Motores y Maquinaria Industrial",
          description: "Instalación, mantenimiento y reparación de motores eléctricos y maquinaria industrial.",
        },
      },
    ],
  },
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Bank Transfer, Cuotas Tasa Cero",
  currenciesAccepted: "USD",
  sameAs: [
    "https://www.instagram.com/electrichome4756",
    "https://www.tiktok.com/@electric_home2005",
    "https://www.facebook.com/electrichomesv/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Electric Home El Salvador",
  url: BASE_URL,
  description: "Servicios eléctricos residenciales, comerciales e industriales en El Salvador.",
  inLanguage: "es-SV",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-SV">
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#050505" />
        <meta name="msapplication-TileColor" content="#FF6321" />

        {/* Structured Data: Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Structured Data: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
