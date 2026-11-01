'use client';
import { useEffect, useRef } from 'react';

// Each ribbon is a bundle of thin lines. Phase shifts across the bundle
// make the ribbon twist and pinch, which reads as a swirling wave.
const RIBBONS = [
  { y: 0.6,  amp: 0.12, k: 1.5, speed: 0.45,  twist: 1.6, spread: 0.2,  lines: 28, rgb: '169,214,229', a: 0.55 },
  { y: 0.52, amp: 0.1,  k: 2.2, speed: -0.35, twist: 2.1, spread: 0.16, lines: 24, rgb: '137,194,217', a: 0.45 },
  { y: 0.68, amp: 0.09, k: 2.9, speed: 0.6,   twist: 1.2, spread: 0.14, lines: 22, rgb: '97,165,194',  a: 0.5 },
  { y: 0.58, amp: 0.15, k: 1.1, speed: -0.25, twist: 2.6, spread: 0.24, lines: 20, rgb: '42,111,151',  a: 0.6 },
];

export default function HeroWaves() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, dpr = 1, raf = 0, mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.parentElement.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
      const step = Math.max(6, Math.round(W / 140));
      for (const r of RIBBONS) {
        const base = H * (r.y + (my - 0.5) * 0.06);
        for (let j = 0; j < r.lines; j++) {
          const f = j / (r.lines - 1);
          ctx.beginPath();
          for (let x = 0; x <= W + step; x += step) {
            const u = (x / W) * Math.PI * 2;
            const phase = t * r.speed + f * r.twist + (mx - 0.5) * 1.2;
            const y =
              base +
              H * r.amp * Math.sin(u * r.k + phase) +
              H * r.spread * (f - 0.5) * Math.cos(u * (r.k * 0.6) - t * r.speed * 0.7 + 1.3);
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          const edge = 1 - Math.abs(f - 0.5) * 2;
          ctx.strokeStyle = `rgba(${r.rgb},${(0.05 + 0.3 * edge) * r.a})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (ms) => { draw(ms / 1000); raf = requestAnimationFrame(loop); };
    const onMove = (e) => {
      const r = c.parentElement.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height;
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (still) draw(2); });
    ro.observe(c.parentElement);
    if (still) draw(2);
    else {
      raf = requestAnimationFrame(loop);
      window.addEventListener('pointermove', onMove);
    }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, []);

  return <canvas className="waves" ref={ref} aria-hidden="true" />;
}
