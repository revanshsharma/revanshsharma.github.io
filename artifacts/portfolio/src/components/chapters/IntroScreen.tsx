import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SHARDS = [
  { x: -320, y: -180, rot: -35, w: 160, h: 28, delay: 0 },
  { x: 300, y: -200, rot: 28, w: 130, h: 22, delay: 0.03 },
  { x: -260, y: 140, rot: 18, w: 180, h: 20, delay: 0.06 },
  { x: 280, y: 160, rot: -22, w: 140, h: 24, delay: 0.02 },
  { x: -80, y: -220, rot: -12, w: 90, h: 18, delay: 0.05 },
  { x: 120, y: -190, rot: 40, w: 110, h: 20, delay: 0.01 },
  { x: -360, y: 20, rot: -50, w: 70, h: 16, delay: 0.08 },
  { x: 360, y: 30, rot: 55, w: 85, h: 18, delay: 0.04 },
  { x: -140, y: 200, rot: 15, w: 120, h: 14, delay: 0.07 },
  { x: 160, y: 210, rot: -30, w: 100, h: 16, delay: 0.03 },
  { x: 0, y: -250, rot: 8, w: 60, h: 12, delay: 0.06 },
  { x: -200, y: -60, rot: -65, w: 50, h: 14, delay: 0.09 },
];

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<"idle" | "walking" | "whip" | "breaking" | "flash" | "done">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    setStage("walking");

    // Simon walks for 2.2s, then whips
    setTimeout(() => {
      setStage("whip");

      // At the moment of impact, shatter the button
      setTimeout(() => {
        setStage("breaking");

        // Flash and open site
        setTimeout(() => {
          setStage("flash");
          setTimeout(() => {
            setStage("done");
            onComplete();
          }, 400);
        }, 600);
      }, 700); // whip impact timing
    }, 2200);
  };

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(192,193,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(192,193,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c0c1ff]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4cd7f6]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
            }}
          />

          {/* Spider-Man swings across on load */}
          {stage === "idle" && (
            <motion.div
              className="absolute top-[20%] z-20 pointer-events-none"
              initial={{ x: "110vw" }}
              animate={{ x: "-110vw" }}
              transition={{ duration: 2.6, ease: "linear" }}
            >
              <img
                src="/spiderswing.gif"
                alt=""
                className="h-28 md:h-36 block"
                style={{ imageRendering: "pixelated" }}
              />
            </motion.div>
          )}

          {/* Main content — visible in idle */}
          <AnimatePresence>
            {stage === "idle" && (
              <motion.div
                key="idle-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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

                  <h1
                    className="text-4xl md:text-6xl font-bold tracking-tighter"
                    style={{ color: "#ffffff", fontFamily: "'Sora', sans-serif" }}
                  >
                    REVΛNSH
                    <span
                      style={{
                        background: "linear-gradient(135deg, #c0c1ff 0%, #4cd7f6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {" "}SHARMA
                    </span>
                  </h1>

                  <div
                    className="text-sm font-mono tracking-[0.25em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    AI DEVELOPER • GAME CREATOR • COMMUNITY LEADER
                  </div>
                </div>

                {/* THE BUTTON */}
                <motion.button
                  ref={buttonRef}
                  onClick={handleEnter}
                  className="relative px-10 py-4 font-mono text-sm tracking-[0.3em] uppercase overflow-hidden"
                  style={{
                    border: "1px solid rgba(192,193,255,0.4)",
                    color: "#c0c1ff",
                    background: "transparent",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                  whileHover={{
                    borderColor: "rgba(192,193,255,0.9)",
                    boxShadow: "0 0 30px rgba(192,193,255,0.2)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  ENTER HEADQUARTERS
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
          </AnimatePresence>

          {/* ── WALKING STAGE ── Simon approaches from left */}
          {(stage === "walking" || stage === "whip") && (
            <div className="absolute inset-0 flex items-end justify-center pb-20">
              {/* Simon's sprite */}
              <AnimatePresence mode="wait">
                {stage === "walking" && (
                  <motion.div
                    key="walk"
                    initial={{ x: "-60vw" }}
                    animate={{ x: "-80px" }}
                    transition={{ duration: 2.2, ease: "linear" }}
                  >
                    <img
                      src="/SimonWalk.gif"
                      alt=""
                      className="h-40 md:h-56 block"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>
                )}
                {stage === "whip" && (
                  <motion.div
                    key="whip"
                    initial={{ opacity: 1, x: "-80px" }}
                    animate={{ opacity: 1, x: "-80px" }}
                    style={{ filter: "drop-shadow(0 0 30px rgba(192,193,255,0.6))" }}
                  >
                    <img
                      src="/SimonStrongWhip.gif"
                      alt=""
                      className="h-40 md:h-56 block"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button stays visible during walk so Simon has a target */}
              {stage === "walking" && (
                <div
                  className="absolute bottom-28 font-mono text-sm tracking-[0.3em] uppercase px-10 py-4"
                  style={{
                    border: "1px solid rgba(192,193,255,0.4)",
                    color: "#c0c1ff",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  ENTER HEADQUARTERS
                </div>
              )}

              {/* Loading bar */}
              {stage === "walking" && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56">
                  <div className="h-px bg-white/10 w-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#c0c1ff]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.2, ease: "linear" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── BREAKING STAGE ── Shards fly outward */}
          {(stage === "breaking" || stage === "flash") && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {SHARDS.map((shard, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    width: shard.w,
                    height: shard.h,
                    background: "linear-gradient(135deg, rgba(192,193,255,0.6), rgba(76,215,246,0.4))",
                    border: "1px solid rgba(192,193,255,0.8)",
                    boxShadow: "0 0 12px rgba(192,193,255,0.5)",
                  }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: shard.x,
                    y: shard.y,
                    rotate: shard.rot * 4,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: shard.delay,
                    ease: [0.2, 0, 0.8, 1],
                  }}
                />
              ))}

              {/* Impact ring */}
              <motion.div
                className="absolute rounded-full border-2 border-[#c0c1ff]"
                initial={{ width: 80, height: 80, opacity: 1 }}
                animate={{ width: 600, height: 600, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.div
                className="absolute rounded-full border border-[#4cd7f6]"
                initial={{ width: 40, height: 40, opacity: 0.8 }}
                animate={{ width: 400, height: 400, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              />
            </div>
          )}

          {/* White flash on impact */}
          {(stage === "whip" || stage === "breaking" || stage === "flash") && (
            <AnimatePresence>
              {stage === "breaking" && (
                <motion.div
                  key="flash"
                  className="absolute inset-0 bg-white pointer-events-none z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.35 }}
                />
              )}
              {stage === "flash" && (
                <motion.div
                  key="final-flash"
                  className="absolute inset-0 bg-[#0a0a0f] pointer-events-none z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
