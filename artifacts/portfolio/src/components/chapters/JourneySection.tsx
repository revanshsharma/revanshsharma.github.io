import React from "react";
import { chapters } from "../../data/chapters";
export const JourneySection = () => {
  return (
    <section className="relative min-h-screen w-full py-24 px-6 md:px-24 z-10 bg-[#131313]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-6 mb-20">
          {/* Microsoft logo */}
          <svg width="36" height="36" viewBox="0 0 21 21" className="opacity-50 hover:opacity-100 transition-opacity" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
            <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
            <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
          </svg>
          {/* Google logo */}
          <svg width="36" height="36" viewBox="0 0 24 24" className="opacity-50 hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <h2 className="text-3xl md:text-5xl font-display font-bold ml-4">The Journey</h2>
        </div>
        
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          {chapters.journey.nodes.map((node, i) => (
            <div key={i} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-[#131313] border-2 border-primary group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(192,193,255,0)] group-hover:shadow-[0_0_15px_rgba(192,193,255,0.8)]" />
              
              <div className="glass-card p-6 rounded-lg hover:-translate-y-1 transition-transform border border-transparent group-hover:border-primary/30">
                <span className="text-xs md:text-sm text-primary font-mono tracking-wider mb-2 block">
                  {node.date}
                </span>
                <h3 className="text-lg md:text-xl font-sans font-medium text-gray-200">
                  {node.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
