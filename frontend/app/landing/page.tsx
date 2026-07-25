import { Metadata } from "next";
import About from "@/features/landing/components/About";
import Footer from "@/features/landing/components/Footer";
import Hero from "@/features/landing/components/Hero";
import Navbar from "@/features/landing/components/Navbar";
import CollectionSection from "@/features/landing/components/CollectionSection";

export const metadata: Metadata = {
  title: "منجّد Store | أطقم كنب وأثاث جاهز من أفضل المحلات",
  description:
    "تصفح واشترِ أحدث أطقم الكنب الجاهزة للتسليم الفوري من أفضل ورش ومعارض التنجيد المحلية بضغطة زر.",
  keywords: [
    "كنب جاهز",
    "تنجيد أثاث",
    "طقم كنب مودرن",
    "كنب زاوية",
    "معرض أثاث",
    "شراء كنب",
  ],
  openGraph: {
    title: "منجّد Store | أطقم كنب وأثاث جاهز من أفضل المحلات",
    description:
      "تصفح واشترِ أحدث أطقم الكنب الجاهزة للتسليم الفوري من أفضل ورش ومعارض التنجيد المحلية بضغطة زر.",
    url: "https://monajed.store",
    siteName: "منجّد Store",
    locale: "ar_JO",
    type: "website",
  }
};

export default function Page() {
  return (
    <main className="min-h-screen bg-main text-brand-dark">
      <Navbar />
      <Hero />
      <About />
      <CollectionSection/>
      <Footer />
    </main>
  );
}