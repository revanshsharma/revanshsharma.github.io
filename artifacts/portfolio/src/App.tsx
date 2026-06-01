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
import LogoLoop from "./components/LogoLoop";
import { chapters } from "./data/chapters";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [introDone, setIntroDone] = useState(false);
  const socialLoopLogos = [
    {
      href: chapters.contact.socials[0].url,
      title: "GitHub",
      ariaLabel: "GitHub profile",
      node: (
        <span className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/10">
          <Github className="h-4 w-4" />
          <span>GitHub</span>
        </span>
      ),
    },
    {
      href: chapters.contact.socials[1].url,
      title: "LinkedIn",
      ariaLabel: "LinkedIn profile",
      node: (
        <span className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/10">
          <Linkedin className="h-4 w-4" />
          <span>LinkedIn</span>
        </span>
      ),
    },
    {
      href: chapters.contact.socials[2].url,
      title: "Email",
      ariaLabel: "Send an email",
      node: (
        <span className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/10">
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </span>
      ),
    },
    {
      href: "#",
      title: "Resume",
      ariaLabel: "Open resume",
      node: (
        <span className="flex items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.68rem] font-mono uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-primary/10">
          <FileText className="h-4 w-4" />
          <span>Resume</span>
        </span>
      ),
    },
  ];

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
        <>
        <main className="relative w-full pb-28 md:pb-32">
          <HeroSection />
          <AboutSection />
          <AISection />
          <JourneySection />
          <GameSection />
          <CommandSection />
          <ContactSection />
          <PortalSection />
        </main>
        <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-4">
          <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-[rgba(13,13,13,0.84)] shadow-[0_-12px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <LogoLoop
              logos={socialLoopLogos}
              speed={60}
              direction="left"
              logoHeight={18}
              gap={28}
              hoverSpeed={24}
              fadeOut
              fadeOutColor="#0d0d0d"
              scaleOnHover
              ariaLabel="Social links"
              className="px-4 py-3"
            />
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default App;
