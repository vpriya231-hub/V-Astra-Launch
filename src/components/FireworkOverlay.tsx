import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FireworkOverlayProps {
  isDarkMode: boolean;
}

export default function FireworkOverlay({ isDarkMode }: FireworkOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LOOP = 4.0; // seconds

    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2.5);

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    window.addEventListener("resize", resize);
    resize();

    function mulberry32(seed: number) {
      return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const COLOR_SETS = [
      ["#ffd27a", "#ffe9b0", "#ff9d5c"], // gold
      ["#6ab8ff", "#b6ddff", "#4a7dff"], // blue
      ["#c58bff", "#e6cbff", "#a35bff"], // purple
      ["#ffd27a", "#c58bff", "#6ab8ff"], // mixed
    ];

    interface Particle {
      angle: number;
      speed: number;
      color: string;
      size: number;
      flicker: number;
      drag: number;
    }

    interface Shell {
      launchT: number;
      ascendDur: number;
      x0: number;
      xDrift: number;
      apexY: number;
      colors: number;
      count: number;
      power: number;
      kind: string;
      particles: Particle[];
      burstT: number;
    }

    function buildShells(): Shell[] {
      const shellsList: Shell[] = [];
      const rand = mulberry32(2024);

      const defs = [
        { launchT: 0.00, ascendDur: 0.62, x0: 0.30, xDrift: 0.02,  apexY: 0.30, colors: 0, count: 70, power: 1.00, kind: "peony" },
        { launchT: 0.48, ascendDur: 0.55, x0: 0.68, xDrift: -0.03, apexY: 0.24, colors: 1, count: 58, power: 0.92, kind: "peony" },
        { launchT: 0.95, ascendDur: 0.68, x0: 0.50, xDrift: 0.015, apexY: 0.18, colors: 2, count: 80, power: 1.10, kind: "chrys" },
        { launchT: 1.55, ascendDur: 0.52, x0: 0.22, xDrift: 0.04,  apexY: 0.32, colors: 3, count: 54, power: 0.85, kind: "peony" },
        { launchT: 2.00, ascendDur: 0.58, x0: 0.76, xDrift: -0.02, apexY: 0.26, colors: 0, count: 62, power: 0.95, kind: "peony" },
        { launchT: 2.48, ascendDur: 0.65, x0: 0.50, xDrift: 0.0,   apexY: 0.16, colors: 2, count: 86, power: 1.18, kind: "chrys" },
        { launchT: 3.00, ascendDur: 0.50, x0: 0.30, xDrift: 0.03,  apexY: 0.34, colors: 1, count: 56, power: 0.9,  kind: "peony" },
        { launchT: 3.42, ascendDur: 0.50, x0: 0.70, xDrift: -0.025,apexY: 0.28, colors: 3, count: 60, power: 1.0,  kind: "peony" },
      ];

      for (const d of defs) {
        const particles: Particle[] = [];
        for (let i = 0; i < d.count; i++) {
          const base = (i / d.count) * Math.PI * 2;
          const angle = base + (rand() - 0.5) * 0.16;
          const speed = (0.55 + rand() * 0.5) * d.power;
          const colorSet = COLOR_SETS[d.colors];
          particles.push({
            angle,
            speed,
            color: colorSet[Math.floor(rand() * colorSet.length)],
            size: 1.8 + rand() * 2.0,
            flicker: rand() * Math.PI * 2,
            drag: 0.90 + rand() * 0.05,
          });
        }
        shellsList.push({
          ...d,
          particles,
          burstT: d.launchT + d.ascendDur,
        });
      }
      return shellsList;
    }

    const shells = buildShells();
    const GROUND_Y = 1.05; // launches from just below the visible frame
    const GRAVITY = 0.55;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }
    function easeOutQuad(t: number) {
      return 1 - (1 - t) * (1 - t);
    }

    function drawAscent(shell: Shell, tNow: number) {
      let life = tNow - shell.launchT;
      if (life < 0) life += LOOP;
      if (life > shell.ascendDur) return null;

      const t = life / shell.ascendDur;
      const easedT = easeOutQuad(t);

      const x = (shell.x0 + shell.xDrift * t) * W;
      const y = (GROUND_Y - (GROUND_Y - shell.apexY) * easedT) * H;

      const trailLen = 7;
      for (let k = 0; k < trailLen; k++) {
        const tk = Math.max(0, t - k * 0.018);
        const ek = easeOutQuad(tk);
        const ty = (GROUND_Y - (GROUND_Y - shell.apexY) * ek) * H;
        const tx = (shell.x0 + shell.xDrift * tk) * W;
        const alpha = (1 - k / trailLen) * 0.55 * Math.min(1, t * 12);
        if (alpha <= 0.02) continue;
        ctx.beginPath();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#ffe3b0";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#ffd27a";
        ctx.arc(tx, ty, 1.6 - k * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.globalAlpha = Math.min(1, t * 15) * (1 - Math.max(0, t - 0.92) / 0.08);
      ctx.fillStyle = "#fff6df";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#ffd27a";
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
      return { x, y };
    }

    function drawBurst(shell: Shell, tNow: number) {
      let life = tNow - shell.burstT;
      if (life < 0) life += LOOP;
      const FADE = 1.3;
      if (life > FADE) return;

      const fadeT = life / FADE;
      const alphaEnvelope =
        life < 0.05 ? life / 0.05 : Math.max(0, 1 - easeOutCubic(fadeT));

      const ox = (shell.x0 + shell.xDrift) * W;
      const oy = shell.apexY * H;
      const scale = Math.min(W, H) * 0.62;

      if (life < 0.12) {
        const flashA = (1 - life / 0.12) * 0.5;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, scale * 0.22);
        g.addColorStop(0, `rgba(255,255,255,${flashA})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      for (const p of shell.particles) {
        const t = life;
        const expandDur = 0.85;
        const travelT = Math.min(t, expandDur) / expandDur;
        const eased = 1 - Math.pow(1 - travelT, 2.2);
        const dist = p.speed * eased * scale * 0.62;
        const dx = Math.cos(p.angle) * dist;
        const dy = Math.sin(p.angle) * dist + GRAVITY * t * t * scale * 0.055;

        const x = ox + dx;
        const y = oy + dy;

        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;

        const twinkle = 0.78 + 0.22 * Math.sin(tNow * 10 + p.flicker);
        const a = alphaEnvelope * twinkle;
        if (a <= 0.01) continue;

        const r = p.size * (0.7 + 0.3 * (1 - fadeT));

        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 9;
        ctx.shadowColor = p.color;
        ctx.arc(x, y, Math.max(0.4, r), 0, Math.PI * 2);
        ctx.fill();

        if (fadeT < 0.45) {
          ctx.globalAlpha = a * 0.35;
          ctx.beginPath();
          ctx.arc(x - dx * 0.06, y - dy * 0.06, Math.max(0.3, r * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    function drawEmbers(tNow: number) {
      const n = 10;
      for (let i = 0; i < n; i++) {
        const seed = i * 97.13;
        const speed = 0.06 + (i % 5) * 0.008;
        const phase = (tNow * speed + seed) % 1;
        const x = ((Math.sin(seed * 3.1) + 1) / 2) * W;
        const y = H * 0.15 + phase * H * 0.7;
        const alpha = Math.sin(phase * Math.PI) * 0.22;
        if (alpha <= 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#dfe6ff";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#dfe6ff";
        ctx.beginPath();
        ctx.arc(x, y, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    let animationFrameId: number;

    function render(timestamp: number) {
      const tLoop = (timestamp / 1000) % LOOP;

      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createRadialGradient(
        W * 0.5,
        H * 0.35,
        0,
        W * 0.5,
        H * 0.35,
        Math.max(W, H) * 0.8
      );
      grad.addColorStop(0, "rgba(20,18,30,0.25)");
      grad.addColorStop(1, "rgba(3,3,6,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      drawEmbers(tLoop);

      for (const s of shells) {
        drawAscent(s, tLoop);
        drawBurst(s, tLoop);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3800); // Fades out perfectly between 3 and 4 seconds

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fadeTimer);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          className="fixed inset-0 z-50 overflow-hidden select-none"
          id="celebration-overlay"
          style={{
            background: `
              radial-gradient(120% 90% at 50% 18%, rgba(50,40,70,0.20), transparent 60%),
              radial-gradient(140% 100% at 50% 100%, rgba(15,25,45,0.35), transparent 55%),
              linear-gradient(180deg, #05050a 0%, #08080f 45%, #030305 100%)
            `,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(60% 30% at 50% 0%, rgba(180,200,255,0.08), transparent 70%),
                radial-gradient(80% 40% at 50% 100%, rgba(255,255,255,0.03), transparent 70%)
              `,
            }}
          />

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-[480px] h-full max-h-[85vh] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full block"
                id="fw"
              />

              <div className="absolute inset-x-0 bottom-[12%] text-center z-10 pointer-events-none px-4">
                <span
                  className="inline-block font-bold tracking-tight text-[#fff8ec]"
                  style={{
                    fontSize: "clamp(24px, 7vw, 36px)",
                    textShadow: `
                      0 0 6px rgba(255,235,190,0.55),
                      0 0 22px rgba(255,210,140,0.55),
                      0 0 46px rgba(180,150,255,0.35)
                    `,
                    animation: "textPulse 4s ease-in-out infinite",
                  }}
                >
                  100+ Downloads!
                </span>
                
                <span
                  className="block mt-2.5 font-semibold text-[11px] sm:text-xs tracking-[0.28em] uppercase text-slate-300/80"
                  style={{
                    animation: "subFade 4s ease-in-out infinite",
                  }}
                >
                  Thank you for celebrating with us
                </span>
              </div>

            </div>

          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes textPulse {
              0%   { opacity: 0;   transform: translateY(10px) scale(0.96); }
              10%  { opacity: 1;   transform: translateY(0px) scale(1); }
              45%  { opacity: 1;   transform: translateY(0px) scale(1.015); }
              88%  { opacity: 1;   transform: translateY(0px) scale(1); }
              100% { opacity: 0;   transform: translateY(10px) scale(0.96); }
            }
            @keyframes subFade {
              0%   { opacity: 0; }
              14%  { opacity: 0.85; }
              86%  { opacity: 0.85; }
              100% { opacity: 0; }
            }
          ` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
