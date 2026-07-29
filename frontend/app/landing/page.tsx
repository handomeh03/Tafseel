import { Metadata } from "next";
import About from "@/features/landing/components/About";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Navbar from "@/features/landing/components/Navbar";
import CollectionSection from "@/features/landing/components/CollectionSection";

export const metadata: Metadata = {
  title: "تفصيل Store | أطقم كنب وأثاث جاهز من أفضل المحلات والورش",
  description:
    "تصفح واشترِ أحدث أطقم الكنب الجاهزة للتسليم الفوري والتفصيل المخصص من أفضل ورش ومعارض التنجيد المحلية بضغطة زر.",
  keywords: [
    "تفصيل كنب",
    "كنب جاهز",
    "تنجيد أثاث",
    "طقم كنب مودرن",
    "كنب زاوية",
    "معرض أثاث",
    "شراء كنب",
    "تفصيل Store",
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
    canonical: "https://tafseel.store",
  },
  openGraph: {
    title: "تفصيل Store | أطقم كنب وأثاث جاهز من أفضل المحلات والورش",
    description:
      "تصفح واشترِ أحدث أطقم الكنب الجاهزة للتسليم الفوري من أفضل ورش ومعارض التنجيد المحلية بضغطة زر.",
    url: "https://tafseel.store",
    siteName: "تفصيل Store",
    locale: "ar_JO",
    type: "website",
    images: [
      {
        url: "https://tafseel.store/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "تفصيل Store - منصة الأثاث والتنجيد المحلية",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تفصيل Store | أطقم كنب وأثاث جاهز من أفضل المحلات والورش",
    description:
      "تصفح واشترِ أحدث أطقم الكنب الجاهزة للتسليم الفوري من أفضل الورش والمعارض.",
    images: ["https://tafseel.store/og-image.jpg"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "تفصيل Store",
  alternateName: "Tafseel Store",
  url: "https://tafseel.store",
  description:
    "منصة متخصصة لعرض وتسوق أطقم الكنب والأثاث والتنجيد المحلي مباشرة من الورش والمعارض.",
  inLanguage: "ar",
};

export default function Page() {
  return (
    <>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <main className="min-h-screen bg-main text-brand-dark">
        <Navbar />
        <Hero />
        <About />
        <CollectionSection />
        <Footer />
      </main>
    </>
  );
}