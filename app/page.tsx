import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Proclaim from "@/components/Proclaim";
import Challenges from "@/components/Challenges";
import Business from "@/components/Business";
import Strengths from "@/components/Strengths";
import Works from "@/components/Works";
import News from "@/components/News";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Proclaim />
        <Challenges />
        <Business />
        <Strengths />
        <Works />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
