import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Proclaim from "@/components/Proclaim";
import Company from "@/components/Company";
import Business from "@/components/Business";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Proclaim />
        <Company />
        <Business />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
