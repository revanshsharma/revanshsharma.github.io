import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientBlinds from "../GradientBlinds";

/* ── Shard definitions — spawned from button centre ── */
const SHARDS = [
  { dx: -1.0, dy: -1.2, rot: -40, w: 140, h: 22, delay: 0.00 },
  { dx:  1.1, dy: -1.4, rot:  30, w: 110, h: 18, delay: 0.02 },
  { dx: -0.6, dy:  1.3, rot:  20, w: 160, h: 20, delay: 0.04 },
  { dx:  0.9, dy:  1.1, rot: -25, w: 120, h: 24, delay: 0.01 },
  { dx: -0.2, dy: -1.6, rot: -10, w:  80, h: 16, delay: 0.03 },
  { dx:  0.4, dy: -1.5, rot:  45, w:  95, h: 18, delay: 0.02 },
  { dx: -1.4, dy:  0.2, rot: -55, w:  65, h: 14, delay: 0.05 },
  { dx:  1.5, dy:  0.3, rot:  60, w:  75, h: 16, delay: 0.03 },
  { dx: -0.8, dy:  1.8, rot:  18, w: 100, h: 14, delay: 0.04 },
  { dx:  0.7, dy:  1.9, rot: -32, w:  88, h: 16, delay: 0.02 },
  { dx:  0.0, dy: -1.9, rot:   8, w:  55, h: 12, delay: 0.05 },
  { dx: -1.2, dy: -0.5, rot: -70, w:  45, h: 12, delay: 0.06 },
  { dx:  1.3, dy: -0.4, rot:  70, w:  50, h: 14, delay: 0.01 },
  { dx: -0.4, dy:  2.0, rot: -15, w:  70, h: 10, delay: 0.07 },
];

/* Display heights for sprites (px) — sprites are pixel art, imageRendering: pixelated */
const WALK_H  = 128;
const WHIP_H  = 128;
/* Aspect ratios: SimonWalk 16×31, SimonStrongWhip 76×31 */
const WALK_W  = Math.round((16 / 31) * WALK_H);   // ≈ 66 px
const WHIP_W  = Math.round((76 / 31) * WHIP_H);   // ≈ 314 px — extends over button

type Stage = "idle" | "walking" | "whip" | "breaking" | "flash" | "done";

const CornerAccents = () => (
  <>
    {(["tl","tr","bl","br"] as const).map((c) => (
      <span key={c} className="absolute w-2 h-2" style={{
        top:    c.startsWith("t") ? 0 : "auto",
        bottom: c.startsWith("b") ? 0 : "auto",
        left:   c.endsWith("l")   ? 0 : "auto",
        right:  c.endsWith("r")   ? 0 : "auto",
        borderTop:    c.startsWith("t") ? "1px solid #c0c1ff" : undefined,
        borderBottom: c.startsWith("b") ? "1px solid #c0c1ff" : undefined,
        borderLeft:   c.endsWith("l")   ? "1px solid #c0c1ff" : undefined,
        borderRight:  c.endsWith("r")   ? "1px solid #c0c1ff" : undefined,
      }} />
    ))}
  </>
);

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage]         = useState<Stage>("idle");
  const buttonRef                  = useRef<HTMLButtonElement>(null);
  const rectRef                    = useRef<DOMRect | null>(null);
  const [simonLeft, setSimonLeft]  = useState(-WALK_W - 40);
  const [shardOrigin, setShardOrigin] = useState({ x: 0, y: 0 });
  const dist = typeof window !== "undefined"
    ? Math.max(window.innerWidth, window.innerHeight) * 0.38
    : 300;

  const handleEnter = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    rectRef.current = rect;
    setSimonLeft(rect.left - WALK_W - 8);
    setShardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setStage("walking");

    setTimeout(() => {
      setStage("whip");
      setTimeout(() => {
        setStage("breaking");
        setTimeout(() => {
          setStage("flash");
          setTimeout(() => { setStage("done"); onComplete(); }, 380);
        }, 550);
      }, 750);
    }, 2000);
  }, [onComplete]);

  if (stage === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#0a0a0f]"
      animate={stage === "flash" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.38, ease: "easeIn" }}
    >
      {/* GradientBlinds background */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientBlinds
          gradientColors={['#0a0a0f', '#0c0a28', '#14103a', '#1e1060', '#c0c1ff', '#4cd7f6', '#0d2030', '#0a0a0f']}
          angle={25}
          noise={0.06}
          blindCount={10}
          blindMinWidth={80}
          spotlightRadius={0.65}
          spotlightSoftness={0.8}
          spotlightOpacity={0.55}
          mouseDampening={0.25}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />
      </div>
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(192,193,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(192,193,255,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
      />
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.6) 2px,rgba(0,0,0,0.6) 4px)" }}
      />

      {/* ════════════════════════════
          IDLE — title + button
         ════════════════════════════ */}
      <AnimatePresence>
        {stage === "idle" && (
          <motion.div
            key="idle"
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.35 } }}
          >
            {/* Spider-Man swings past */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ top: "16%" }}
              initial={{ x: "-30vw" }}
              animate={{ x: "120vw" }}
              transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/spiderwebswing.gif"
                alt=""
                style={{ height: 180, imageRendering: "auto", display: "block" }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              className="text-center"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.p
                className="font-mono uppercase tracking-[0.45em] text-xs"
                style={{ color: "#4cd7f6" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                CLEARANCE GRANTED
              </motion.p>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>
                REVΛNSH{" "}
                <span style={{ background: "linear-gradient(135deg,#c0c1ff 0%,#4cd7f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  SHARMA
                </span>
              </h1>
              <p className="font-mono tracking-[0.28em] text-sm" style={{ color: "rgba(255,255,255,0.32)" }}>
                AI DEVELOPER&nbsp;•&nbsp;GAME CREATOR&nbsp;•&nbsp;COMMUNITY LEADER
              </p>
            </motion.div>

            {/* Enter button */}
            <motion.button
              ref={buttonRef}
              onClick={handleEnter}
              className="relative font-mono uppercase"
              style={{
                padding: "16px 48px",
                fontSize: "0.8rem",
                letterSpacing: "0.35em",
                border: "1px solid rgba(192,193,255,0.38)",
                color: "#c0c1ff",
                background: "transparent",
                fontFamily: "'JetBrains Mono', monospace",
                cursor: "pointer",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ borderColor: "rgba(192,193,255,0.9)", boxShadow: "0 0 28px rgba(192,193,255,0.18)" }}
            >
              ENTER HEADQUARTERS
              <CornerAccents />
            </motion.button>

            {/* Hint pulse ring */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ width: 300, height: 300, border: "1px solid rgba(192,193,255,0.08)" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════
          ACTION — walk → whip
         ════════════════════════════ */}
      <AnimatePresence>
        {(stage === "walking" || stage === "whip") && rectRef.current && (
          <motion.div
            key="action"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Ghost button at its exact measured position */}
            <motion.div
              className="absolute font-mono uppercase"
              style={{
                left:   rectRef.current.left,
                top:    rectRef.current.top,
                width:  rectRef.current.width,
                height: rectRef.current.height,
                border: "1px solid rgba(192,193,255,0.38)",
                color: "#c0c1ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                letterSpacing: "0.35em",
                fontFamily: "'JetBrains Mono', monospace",
                boxSizing: "border-box",
              }}
              animate={stage === "whip" ? {
                x: [0, -4, 5, -3, 4, -2, 0],
                filter: ["brightness(1)", "brightness(2)", "brightness(1.5)", "brightness(1)"],
              } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              ENTER HEADQUARTERS
              <CornerAccents />
            </motion.div>

            {/* ── WALK sprite — animates from off-screen to simonLeft ── */}
            {stage === "walking" && (
              <motion.div
                className="absolute"
                style={{
                  top: rectRef.current.top + rectRef.current.height / 2,
                  transform: "translateY(-50%)",
                }}
                initial={{ left: -WALK_W - 60 }}
                animate={{ left: simonLeft }}
                transition={{ duration: 2.0, ease: "linear" }}
              >
                <img
                  src="/SimonWalk.gif"
                  alt="Simon walking"
                  style={{ height: WALK_H, width: WALK_W, imageRendering: "pixelated", display: "block" }}
                />
              </motion.div>
            )}

            {/* ── WHIP sprite — snaps to simonLeft, extends over button ── */}
            {stage === "whip" && (
              <motion.div
                className="absolute"
                style={{
                  top: rectRef.current.top + rectRef.current.height / 2,
                  left: simonLeft,
                  transform: "translateY(-50%)",
                  filter: "drop-shadow(0 0 20px rgba(192,193,255,0.6))",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
              >
                <img
                  src="/SimonStrongWhip.gif"
                  alt="Simon whipping"
                  style={{ height: WHIP_H, width: WHIP_W, imageRendering: "pixelated", display: "block" }}
                />
              </motion.div>
            )}

            {/* Progress bar during walk */}
            {stage === "walking" && (
              <div className="absolute" style={{ bottom: 48, left: "50%", transform: "translateX(-50%)", width: 220 }}>
                <div style={{ height: 1, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <motion.div
                    style={{ height: "100%", background: "#c0c1ff" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.0, ease: "linear" }}
                  />
                </div>
                <p className="font-mono text-center" style={{ marginTop: 8, fontSize: "0.6rem", letterSpacing: "0.32em", color: "rgba(192,193,255,0.35)", textTransform: "uppercase" }}>
                  Breaching Firewall
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════
          BREAKING — shards + rings
         ════════════════════════════ */}
      <AnimatePresence>
        {stage === "breaking" && (
          <motion.div key="breaking" className="absolute inset-0 pointer-events-none">
            {/* Impact flash */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Shards */}
            {SHARDS.map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-[1px]"
                style={{
                  left: shardOrigin.x - s.w / 2,
                  top:  shardOrigin.y - s.h / 2,
                  width: s.w, height: s.h,
                  background: "linear-gradient(135deg,rgba(192,193,255,0.8),rgba(76,215,246,0.5))",
                  border: "1px solid rgba(192,193,255,0.9)",
                  boxShadow: "0 0 14px rgba(192,193,255,0.6)",
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                animate={{ x: s.dx * dist, y: s.dy * dist, rotate: s.rot * 5, opacity: 0, scale: 0.15 }}
                transition={{ duration: 0.75, delay: s.delay, ease: [0.1, 0, 0.8, 1] }}
              />
            ))}

            {/* Expanding shock rings */}
            {[0, 0.08, 0.18].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: shardOrigin.x, top: shardOrigin.y,
                  border: i === 0 ? "2px solid rgba(192,193,255,0.9)" : "1px solid rgba(76,215,246,0.5)",
                  translateX: "-50%", translateY: "-50%",
                }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: 720, height: 720, opacity: 0 }}
                transition={{ duration: 0.65, delay, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
