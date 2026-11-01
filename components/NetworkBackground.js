'use client';
import { useEffect, useRef } from 'react';

export default function NetworkBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const x = c.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, pts = [], raf;
    const size = () => {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      const n = Math.min(70, Math.floor((W * H) / 22000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      }));
    };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
        x.fillStyle = 'rgba(56,217,255,.7)';
        x.beginPath(); x.arc(p.x, p.y, 1.6, 0, 6.3); x.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 150) {
            x.strokeStyle = `rgba(47,123,255,${0.22 * (1 - d / 150)})`;
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke();
          }
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    size(); draw();
    window.addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);
  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
