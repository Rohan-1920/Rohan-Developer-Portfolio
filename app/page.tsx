import { Hero } from "@/components/Hero";
import { Credibility } from "@/components/Credibility";
import { NavBar } from "@/components/Overlay";
import { About } from "@/components/About";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Experience } from "@/components/Experience";
import { Study } from "@/components/Study";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { TechnicalStack } from "@/components/TechnicalStack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { OperationalStatus } from "@/components/OperationalStatus";

export default function Home() {
  return (
    <>
      {/* Fixed navigation */}
      <NavBar />

      {/* 1 — Authority-led hero */}
      <Hero />

      {/* 2 — Technical domains and verified profile link */}
      <Credibility />

      {/* 3 — About Me (bio + stats) */}
      <About />

      {/* 4 — Active build signal */}
      <CurrentlyBuilding />

      {/* 5 — Project Case Studies */}
      <Projects />

      {/* 6 — Technical index */}
      <TechnicalStack />

      {/* 7 — Experience */}
      <Experience />

      {/* 8 — Study */}
      <Study />

      {/* 9 — Services */}
      <Services />

      {/* 10 — Contact */}
      <Contact />

      <OperationalStatus />
      <Footer />
    </>
  );
}
