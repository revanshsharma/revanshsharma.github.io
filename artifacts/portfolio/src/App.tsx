import React, { useCallback, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cookie } from "lucide-react";
import { Toaster, toast } from "sonner";
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

  const showSecretAchievement = useCallback(() => {
    toast.custom(
      () => (
        <div className="flex w-[240px] items-center justify-center rounded-lg bg-[#161616]/95 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <img src="./achievement.png" alt="achievement" className="block h-auto w-full object-contain" />
        </div>
      ),
      { duration: 4500, position: "top-right" }
    );
  }, []);

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
      <Toaster position="top-right" richColors={false} closeButton />

      <button
        type="button"
        aria-label="Secret achievement"
        title="Secret achievement"
        onClick={showSecretAchievement}
        className="group fixed bottom-4 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/20 opacity-20 backdrop-blur-md transition-all duration-300 hover:opacity-70 hover:text-[#f7d76b] focus:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#c0c1ff]/40"
      >
        <Cookie className="h-5 w-5" />
      </button>
      
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
