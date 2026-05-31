import React, { useState } from "react";
import { chapters } from "../../data/chapters";

export const ContactSection = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-24 z-10">
      <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Initialize Connection</h2>
          <div className="flex justify-center gap-4 text-sm font-mono text-muted-foreground">
            <span>{chapters.contact.email}</span>
            <span>•</span>
            <span>{chapters.contact.location}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Identifier</label>
              <input 
                type="text" 
                required
                placeholder="John Doe"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Comm Link</label>
              <input 
                type="email" 
                required
                placeholder="john@example.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-sans"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Payload</label>
            <textarea 
              required
              rows={4}
              placeholder="Your message..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors font-sans resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={status !== "idle"}
            className="w-full py-4 bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 rounded-lg text-white font-mono uppercase tracking-widest transition-all relative overflow-hidden"
          >
            {status === "idle" && "Transmit Message"}
            {status === "sending" && "Transmitting..."}
            {status === "sent" && "Transmission Successful"}
          </button>
        </form>
      </div>
    </section>
  );
};
