import React from "react";
import { chapters } from "../../data/chapters";

export const GameSection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 flex items-center justify-center z-10 bg-black overflow-hidden">
      {/* Cinematic background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      
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
