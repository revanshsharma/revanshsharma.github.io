import React from "react";
import { chapters } from "../../data/chapters";
import { motion } from "framer-motion";

export const PortalSection = () => {
  return (
    <section className="relative min-h-[70vh] w-full py-32 flex flex-col items-center justify-center z-10 overflow-hidden bg-black">
      {/* Giant Portal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[120px] bg-gradient-to-r from-primary to-secondary pointer-events-none" />
      
      <div className="relative z-10 text-center space-y-16 max-w-4xl mx-auto px-6">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
          The Story Is Just <span className="primary-gradient">Beginning.</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {chapters.contact.socials.map((social, i) => (
            <motion.a 
              key={i} 
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-card rounded-full text-sm md:text-base font-mono uppercase tracking-[0.2em] text-white hover:border-primary/50 transition-colors"
            >
              {social.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
