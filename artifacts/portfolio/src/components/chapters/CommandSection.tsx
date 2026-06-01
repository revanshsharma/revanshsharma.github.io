import React from "react";
import { chapters } from "../../data/chapters";

export const CommandSection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 px-6 md:px-24 z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="glass-card rounded-3xl p-8 md:p-16 border border-primary/20 relative overflow-hidden">
          {/* Holographic grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] -z-10" />
          
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-display text-white">Command Center</h2>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-sm tracking-widest text-red-400">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-sm font-mono text-primary uppercase tracking-widest mb-6">Current Focus</h3>
                <div className="flex flex-wrap gap-4">
                  {chapters.command.focus.map((item, i) => (
                    <div key={i} className="px-6 py-3 bg-black/40 border border-white/5 rounded text-gray-300 font-sans">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono text-primary uppercase tracking-widest mb-4">ZeroTheory Initiative</h3>
                <p className="text-xl text-gray-400 font-sans leading-relaxed border-l-2 border-primary/50 pl-6 py-2">
                  {chapters.command.zeroTheory}
                </p>
              </div>
            </div>

            <a
              href="https://www.youtube.com/watch?v=QDia3e12czc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open current goal video in new tab"
              className="bg-black/60 border border-white/5 p-8 rounded-xl flex flex-col justify-center items-center text-center relative overflow-hidden group hover:scale-[1.01] transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Current Goal</h3>
              <p className="text-2xl font-display text-white italic">
                "{chapters.command.goal}"
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
