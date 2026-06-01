import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "./components/CustomCursor";
import { IntroScreen } from "./components/chapters/IntroScreen";
import { HeroSection } from "./components/chapters/HeroSection";
import { AboutSection } from "./components/chapters/AboutSection";
import { AISection } from "./components/chapters/AISection";
import { JourneySection } from "./components/chapters/JourneySection";
import { GameSection } from "./components/chapters/GameSection";
import { CommandSection } from "./components/chapters/CommandSection";
import { ContactSection } from "./components/chapters/ContactSection";
import { PortalSection } from "./components/chapters/PortalSection";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground font-sans dark selection:bg-primary/30 selection:text-white">
      <CustomCursor />
      
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

      {introDone && (
        <main className="relative w-full">
          <HeroSection />
          <AboutSection />
          <AISection />
          <JourneySection />
          <GameSection />
          <CommandSection />
          <ContactSection />
          <PortalSection />
        </main>
      )}
    </div>
  );
}

export default App;
