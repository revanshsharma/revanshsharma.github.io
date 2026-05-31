import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransparentGif } from "../TransparentGif";

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

/* Display heights for sprites (px) */
const WALK_H = 128;
const WHIP_H = 128;
/* Aspect: SimonWalk 16×31, SimonStrongWhip 76×31 */
const WALK_W = Math.round((16 / 31) * WALK_H);   // ≈ 66 px
const WHIP_W = Math.round((76 / 31) * WHIP_H);   // ≈ 313 px

type Stage = "idle" | "walking" | "whip" | "breaking" | "flash" | "done";

export const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState<Stage>("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  /* Measured button rect — set on click */
  const rectRef = useRef<DOMRect | null>(null);
  /* Simon's left-edge pixel position during walk/whip */
  const [simonLeft, setSimonLeft] = useState(-WALK_W - 40);
  /* Shard origin in viewport coords */
  const [shardOrigin, setShardOrigin] = useState({ x: 0, y: 0 });
  /* Shard travel distance (scales with viewport) */
  const dist = typeof window !== "undefined" ? Math.max(window.innerWidth, window.innerHeight) * 0.35 : 280;

  const handleEnter = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    rectRef.current = rect;

    /* Simon stops so his right edge is 8 px left of button */
    const targetLeft = rect.left - WALK_W - 8;
    setSimonLeft(targetLeft);

    /* Shard origin = button center */
    setShardOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    setStage("walking");

    /* Simon reaches button after 2.0 s */
    setTimeout(() => {
      setStage("whip");

      /* Whip impact at 750 ms — shatter the button */
      setTimeout(() => {
        setStage("breaking");

        /* Flash after shards start flying */
        setTimeout(() => {
          setStage("flash");
          setTimeout(() => {
            setStage("done");
            onComplete();
          }, 380);
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
      {/* ── Grid background ── */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(192,193,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(192,193,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* ── Ambient glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c0c1ff]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#4cd7f6]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* ── CRT scanlines ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.5) 2px,rgba(0,0,0,0.5) 4px)" }}
      />

      {/* ══════════════════════════════════════════
          IDLE — title + button, spider swings past
         ══════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === "idle" && (
          <motion.div
            key="idle"
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
          >
            {/* Spider-Man swings past */}
            <motion.div
              className="absolute top-[18%] pointer-events-none"
              initial={{ x: "110vw" }}
              animate={{ x: "-110vw" }}
              transition={{ duration: 2.8, ease: "linear" }}
            >
              <TransparentGif src="/spiderswing.gif" height={140} />
            </motion.div>

            {/* Text block */}
            <motion.div
              className="text-center space-y-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.p
                className="text-xs font-mono tracking-[0.45em] uppercase"
                style={{ color: "#4cd7f6" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                CLEARANCE GRANTED
              </motion.p>

              <h1
                className="text-5xl md:text-7xl font-bold tracking-tighter"
                style={{ fontFamily: "'Sora', sans-serif", color: "#fff" }}
              >
                REVΛNSH{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#c0c1ff 0%,#4cd7f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  SHARMA
                </span>
              </h1>

              <p className="text-sm font-mono tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.32)" }}>
                AI DEVELOPER&nbsp;•&nbsp;GAME CREATOR&nbsp;•&nbsp;COMMUNITY LEADER
              </p>
            </motion.div>

            {/* The button */}
            <motion.button
              ref={buttonRef}
              onClick={handleEnter}
              className="relative px-12 py-4 font-mono text-sm tracking-[0.35em] uppercase"
              style={{
                border: "1px solid rgba(192,193,255,0.38)",
                color: "#c0c1ff",
                background: "transparent",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ borderColor: "rgba(192,193,255,0.9)", boxShadow: "0 0 28px rgba(192,193,255,0.18)" }}
            >
              ENTER HEADQUARTERS
              {/* Corner accents */}
              {(["tl","tr","bl","br"] as const).map((c) => (
                <span
                  key={c}
                  className="absolute w-2 h-2"
                  style={{
                    top:    c.startsWith("t") ? 0 : "auto",
                    bottom: c.startsWith("b") ? 0 : "auto",
                    left:   c.endsWith("l")   ? 0 : "auto",
                    right:  c.endsWith("r")   ? 0 : "auto",
                    borderTop:    c.startsWith("t") ? "1px solid #c0c1ff" : undefined,
                    borderBottom: c.startsWith("b") ? "1px solid #c0c1ff" : undefined,
                    borderLeft:   c.endsWith("l")   ? "1px solid #c0c1ff" : undefined,
                    borderRight:  c.endsWith("r")   ? "1px solid #c0c1ff" : undefined,
                  }}
                />
              ))}
            </motion.button>

            {/* Pulsing ring hint */}
            <motion.div
              className="absolute rounded-full border border-[#c0c1ff]/10 pointer-events-none"
              style={{ width: 300, height: 300 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          WALKING — Simon walks toward the button
         ══════════════════════════════════════════ */}
      <AnimatePresence>
        {(stage === "walking" || stage === "whip") && (
          <motion.div
            key="action"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Ghost button — stays at measured position */}
            {rectRef.current && (stage === "walking" || stage === "whip") && (
              <motion.div
                className="absolute font-mono text-sm tracking-[0.35em] uppercase px-12 py-4"
                style={{
                  left: rectRef.current.left,
                  top:  rectRef.current.top,
                  width: rectRef.current.width,
                  height: rectRef.current.height,
                  border: "1px solid rgba(192,193,255,0.38)",
                  color: "#c0c1ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  boxSizing: "border-box",
                }}
                animate={
                  stage === "whip"
                    ? {
                        x: [0, -3, 4, -2, 3, 0],
                        filter: ["brightness(1)", "brightness(1.6)", "brightness(1)"],
                      }
                    : {}
                }
                transition={{ duration: 0.55, delay: 0.5 }}
              >
                ENTER HEADQUARTERS
                {(["tl","tr","bl","br"] as const).map((c) => (
                  <span
                    key={c}
                    className="absolute w-2 h-2"
                    style={{
                      top:    c.startsWith("t") ? 0 : "auto",
                      bottom: c.startsWith("b") ? 0 : "auto",
                      left:   c.endsWith("l")   ? 0 : "auto",
                      right:  c.endsWith("r")   ? 0 : "auto",
                      borderTop:    c.startsWith("t") ? "1px solid #c0c1ff" : undefined,
                      borderBottom: c.startsWith("b") ? "1px solid #c0c1ff" : undefined,
                      borderLeft:   c.endsWith("l")   ? "1px solid #c0c1ff" : undefined,
                      borderRight:  c.endsWith("r")   ? "1px solid #c0c1ff" : undefined,
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Simon sprite — walk then whip */}
            {rectRef.current && (
              <motion.div
                className="absolute"
                style={{
                  top: rectRef.current.top + rectRef.current.height / 2,
                  translateY: "-50%",
                }}
                initial={{ left: -WALK_W - 60 }}
                animate={{ left: simonLeft }}
                transition={
                  stage === "walking"
                    ? { duration: 2.0, ease: "linear" }
                    : { duration: 0 }
                }
              >
                <AnimatePresence mode="wait">
                  {stage === "walking" && (
                    <motion.div key="walk" exit={{ opacity: 0 }} transition={{ duration: 0.05 }}>
                      <TransparentGif src="/SimonWalk.gif" height={WALK_H} />
                    </motion.div>
                  )}
                  {stage === "whip" && (
                    <motion.div
                      key="whip"
                      initial={{ opacity: 1 }}
                      style={{ filter: "drop-shadow(0 0 18px rgba(192,193,255,0.55))" }}
                    >
                      <TransparentGif src="/SimonStrongWhip.gif" height={WHIP_H} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Progress bar */}
            {stage === "walking" && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56">
                <div className="h-px bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#c0c1ff]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.0, ease: "linear" }}
                  />
                </div>
                <p className="mt-2 text-center font-mono text-[10px] tracking-[0.32em]" style={{ color: "rgba(192,193,255,0.35)" }}>
                  BREACHING FIREWALL
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          BREAKING — shards fly from button centre
         ══════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === "breaking" && (
          <motion.div
            key="breaking"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* White impact flash */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            />

            {/* Shards */}
            {SHARDS.map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-[1px]"
                style={{
                  left: shardOrigin.x - s.w / 2,
                  top:  shardOrigin.y - s.h / 2,
                  width:  s.w,
                  height: s.h,
                  background: "linear-gradient(135deg,rgba(192,193,255,0.75),rgba(76,215,246,0.5))",
                  border: "1px solid rgba(192,193,255,0.9)",
                  boxShadow: "0 0 14px rgba(192,193,255,0.6)",
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: s.dx * dist,
                  y: s.dy * dist,
                  rotate: s.rot * 5,
                  opacity: 0,
                  scale: 0.2,
                }}
                transition={{ duration: 0.75, delay: s.delay, ease: [0.1, 0, 0.8, 1] }}
              />
            ))}

            {/* Expanding rings */}
            {[0, 0.08, 0.18].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: shardOrigin.x,
                  top:  shardOrigin.y,
                  border: i === 0 ? "2px solid rgba(192,193,255,0.9)" : "1px solid rgba(76,215,246,0.6)",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ width: 0, height: 0, opacity: 1 }}
                animate={{ width: 700, height: 700, opacity: 0 }}
                transition={{ duration: 0.65, delay, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
