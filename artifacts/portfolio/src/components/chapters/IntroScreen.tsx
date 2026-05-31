import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<"idle" | "walking" | "whip" | "done">("idle");
  const [swingDone, setSwingDone] = useState(false);

  const handleStart = () => {
    setStage("walking");
    setTimeout(() => {
      setStage("whip");
      setTimeout(() => {
        setStage("done");
        onComplete();
      }, 1200);
    }, 2200);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(192,193,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(192,193,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c0c1ff]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4cd7f6]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Scanlines CRT effect */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
            }}
          />

          {/* Spider-Man swings across only on first load */}
          {!swingDone && stage === "idle" && (
            <motion.div
              className="absolute top-[22%] z-20 pointer-events-none"
              initial={{ x: "110vw" }}
              animate={{ x: "-110vw" }}
              transition={{ duration: 2.6, ease: "linear" }}
              onAnimationComplete={() => setSwingDone(true)}
            >
              <img
                src="/spiderswing.gif"
                alt="Spider-Man swinging"
                className="h-28 md:h-40 block"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
          )}

          {/* Main content — always visible */}
          {stage === "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center gap-8 relative z-20"
            >
              <div className="text-center space-y-3">
                <motion.div
                  className="text-xs font-mono tracking-[0.4em] uppercase"
                  style={{ color: "#4cd7f6", opacity: 0.7 }}
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  CLEARANCE GRANTED
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter" style={{ color: "#ffffff", fontFamily: "'Sora', sans-serif" }}>
                  REVΛNSH
                  <span style={{
                    background: "linear-gradient(135deg, #c0c1ff 0%, #4cd7f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}> SHARMA</span>
                </h1>

                <div className="text-sm font-mono tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  AI DEVELOPER • GAME CREATOR • COMMUNITY LEADER
                </div>
              </div>

              {/* Enter button */}
              <motion.button
                onClick={handleStart}
                className="relative px-10 py-4 font-mono text-sm tracking-[0.3em] uppercase overflow-hidden"
                style={{
                  border: "1px solid rgba(192,193,255,0.4)",
                  color: "#c0c1ff",
                  background: "transparent",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                whileHover={{ borderColor: "rgba(192,193,255,0.9)", boxShadow: "0 0 30px rgba(192,193,255,0.15)" }}
                transition={{ duration: 0.2 }}
              >
                ENTER HEADQUARTERS
                {/* Corner accents */}
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c0c1ff]" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c0c1ff]" />
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c0c1ff]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c0c1ff]" />
              </motion.button>

              {/* Pulsing ring */}
              <motion.div
                className="absolute rounded-full border border-[#c0c1ff]/10 pointer-events-none"
                style={{ width: 280, height: 280, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}

          {/* Simon walking in */}
          {stage === "walking" && (
            <div className="absolute inset-0 flex items-end justify-center pb-24">
              <motion.div
                initial={{ x: "-70vw" }}
                animate={{ x: "0vw" }}
                transition={{ duration: 2.2, ease: "linear" }}
              >
                <img
                  src="/SimonWalk.gif"
                  alt="Simon walking"
                  className="h-36 md:h-52 block"
                  style={{ imageRendering: "pixelated" }}
                />
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.4em] uppercase"
                style={{ color: "rgba(192,193,255,0.4)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                INITIALIZING...
              </motion.div>

              {/* Loading bar */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-56">
                <div className="h-px bg-white/10 w-full relative overflow-hidden">
                  <motion.div
                    className="h-full bg-[#c0c1ff]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 font-mono text-[10px] text-center tracking-[0.3em]" style={{ color: "rgba(192,193,255,0.35)" }}>
                  LOADING HEADQUARTERS
                </div>
              </div>
            </div>
          )}

          {/* Simon whip — flash entrance */}
          {stage === "whip" && (
            <div className="absolute inset-0 flex items-end justify-center pb-24">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ filter: "drop-shadow(0 0 40px rgba(192,193,255,0.5))" }}
              >
                <img
                  src="/SimonStrongWhip.gif"
                  alt="Simon whip"
                  className="h-36 md:h-52 block"
                  style={{ imageRendering: "pixelated" }}
                />
              </motion.div>

              {/* Screen flash */}
              <motion.div
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.06, 0] }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />

              {/* Loading bar — fully filled */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-56">
                <div className="h-px bg-[#c0c1ff]/60 w-full" />
                <div className="mt-2 font-mono text-[10px] text-center tracking-[0.3em]" style={{ color: "rgba(192,193,255,0.5)" }}>
                  READY
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
