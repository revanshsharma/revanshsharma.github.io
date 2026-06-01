import React, { useEffect, useRef } from "react";
import { chapters } from "../../data/chapters";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "../BorderGlow";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(textRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(cardsRef.current?.children || [], 
        { y: 50, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full py-24 px-6 md:px-24 flex items-center z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div ref={textRef} className="space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">
            Building the <span className="primary-gradient">Future</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-xl">
            {chapters.about.bio}
          </p>
          
          <div className="flex flex-wrap gap-3 pt-4">
            {chapters.about.skills.map((skill, i) => (
              <span key={i} className="px-5 py-2 glass-card rounded-md text-xs md:text-sm font-mono text-[#c0c1ff] border-[#c0c1ff]/20">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          <div className="absolute -inset-10 bg-primary/5 blur-[100px] -z-10 rounded-full" />
          
          {chapters.about.stats.map((stat, i) => (
            <BorderGlow
              key={i}
              edgeSensitivity={24}
              glowColor="191 90 63"
              backgroundColor="#121212"
              borderRadius={28}
              glowRadius={44}
              glowIntensity={0.9}
              coneSpread={22}
              colors={['#6ee7ff', '#c0c1ff', '#8b5cf6']}
              className={`transition-transform duration-300 hover:-translate-y-2 ${i === 2 ? 'sm:col-span-2' : ''}`}
            >
              <div className={`p-8 flex flex-col justify-center items-start ${i === 2 ? 'items-center text-center' : ''}`}>
                <span className="text-5xl md:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-secondary font-mono tracking-widest uppercase">
                  {stat.label}
                </span>
              </div>
            </BorderGlow>
          ))}
        </div>
        
      </div>
    </section>
  );
};
