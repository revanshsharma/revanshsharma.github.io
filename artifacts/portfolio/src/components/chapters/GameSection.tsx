import React from "react";
import { chapters } from "../../data/chapters";

export const GameSection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 flex items-center justify-center z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.65)_55%,_rgba(0,0,0,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
        <div className="absolute inset-0 scale-[1.35] blur-2xl brightness-[0.42] saturate-[0.8] contrast-[1.05]">
          <iframe
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src="https://www.youtube.com/embed/5Z1pmpuxKxc?start=11290&end=11738&autoplay=1&mute=1&controls=0&loop=1&playlist=5Z1pmpuxKxc&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3"
            title="CTRL REFLΞX gameplay background"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black/45" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 uppercase drop-shadow-[0_0_30px_rgba(255,0,0,0.3)]">
          {chapters.game.title}
        </h2>
        
        <p className="text-lg md:text-2xl text-gray-400 font-sans max-w-3xl mx-auto mb-12 leading-relaxed">
          {chapters.game.description}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {chapters.game.tags.map((tag, i) => (
            <span key={i} className="px-6 py-2 bg-white/5 border border-white/10 rounded-none text-xs md:text-sm font-mono text-gray-300 tracking-[0.2em]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
