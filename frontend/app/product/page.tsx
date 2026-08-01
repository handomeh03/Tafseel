import type { Metadata } from "next";
import PublicProduct from "@/features/Product/components/PublicProduct";


export const metadata: Metadata = {
  title: "معرض الأثاث والديكور | تفصيل Store",
  description:
    "استكشف التشكيلة الكاملة من أطقم الكنب المودرن، غرف النوم الماستر، طاولات الطعام، والديكورات الفاخرة المصممة خصيصاً لبيتك بأعلى معايير الجودة.",
  keywords: [
    "أثاث",
    "تفصيل كنب",
    "أطقم كنبات مودرن",
    "غرف نوم",
    "طاولات طعام",
    "ديكورات منازل",
    "تفصيل Store",
    "مفروشات الأردن",
  ],
  authors: [{ name: "تفصيل Store" }],
  creator: "تفصيل Store",
  publisher: "تفصيل Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://tafseel.store/product", // غيّر الدومين حسب دومين الموقع الخاص بك
  },
  openGraph: {
    title: "معرض الأثاث والديكور | تفصيل Store",
    description:
      "تصفح أفضل تصاميم الأثاث والديكورات من مختلف المتاجر والورش المعتمدة بكافة التفاصيل والأسعار.",
    url: "localhost:3000",
    siteName: "تفصيل Store",
    locale: "ar_JO",
    type: "website",
    images: [
      {
        url: "https://test/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "معرض الأثاث والديكور - تفصيل Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "معرض الأثاث والديكور | تفصيل Store",
    description:
      "استكشف التشكيلة الكاملة من الكنب وغرف النوم والطاولات بأعلى معايير الجودة.",
    images: ["https://test/og-products.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "معرض الأثاث والديكور - تفصيل Store",
  description:
    "استكشف التشكيلة الكاملة من أطقم الكنب المودرن، غرف النوم الماستر، وطاولات الطعام.",
  url: "https://tafseel.store/product",
  isPartOf: {
    "@type": "WebSite",
    name: "تفصيل Store",
    url: "https://tafseel.store",
  },
};

export default function CustomerProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PublicProduct />
    </>
  );
}