'use client';
import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;
const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const line = (ax, ay, bx, by, n) =>
  Array.from({ length: n }, (_, i) => { const f = n === 1 ? 0 : i / (n - 1); return [ax + (bx - ax) * f, ay + (by - ay) * f]; });
const ring = (cx, cy, r, n, rot = 0) =>
  Array.from({ length: n }, (_, i) => [cx + r * Math.cos(rot + (i / n) * TAU), cy + r * Math.sin(rot + (i / n) * TAU)]);

// Each scene returns target points (or null = "not built yet"). Unplaced points float freely.
const SCENES = {
  hero: { link: 0.2, fn: () => [] },

  // Results: bars and a trend line that keep rising
  results: { link: 0.095, fn: (t, m, cx, cy) => {
    const g = ease((t % 7) / 4), base = cy + m * 0.4, s = m * 0.062, out = [];
    [3, 5, 6, 8, 10, 13].forEach((h, i) => {
      const x = cx + (i - 2.5) * m * 0.15;
      for (let k = 0; k < h; k++) out.push(k < h * g ? [x, base - k * s] : null);
    });
    const ax = cx - m * 0.45, ay = base + s * 0.6;
    out.push(...line(ax, ay, cx + m * 0.45, ay, 12), ...line(ax, ay, ax, base - m * 0.85, 12));
    line(cx - m * 0.38, base - m * 0.1, cx + m * 0.42, base - m * 0.85, 14).forEach((p, i) => out.push(i < 14 * g ? p : null));
    return out;
  } },

  // Experience: a staircase career path climbing to a goal
  experience: { link: 0.075, fn: (t, m, cx, cy) => {
    const g = ease((t % 8) / 5.5), sx = m * 0.13, sy = m * 0.1, n = 7;
    const x0 = cx - (n * sx) / 2, y0 = cy + (n * sy) / 2, path = [];
    for (let i = 0; i < n; i++) {
      path.push(...line(x0 + i * sx, y0 - i * sy, x0 + (i + 1) * sx, y0 - i * sy, 3).slice(0, 2));
      path.push(...line(x0 + (i + 1) * sx, y0 - i * sy, x0 + (i + 1) * sx, y0 - (i + 1) * sy, 3).slice(0, 2));
    }
    const out = path.map((p, i) => (i < path.length * g ? p : null));
    out.push(...ring(x0 + n * sx, y0 - n * sy - m * 0.07, m * 0.045, 8, t));
    return out;
  } },

  // What I do: a hub with rotating spokes and service nodes
  services: { link: 0.095, fn: (t, m, cx, cy) => {
    const out = ring(cx, cy, m * 0.07, 8, t * 0.4);
    for (let i = 0; i < 6; i++) {
      const a = t * 0.12 + (i / 6) * TAU, c = Math.cos(a), s = Math.sin(a);
      const nx = cx + c * m * 0.4, ny = cy + s * m * 0.4;
      out.push(...line(cx + c * m * 0.1, cy + s * m * 0.1, nx - c * m * 0.06, ny - s * m * 0.06, 4), ...ring(nx, ny, m * 0.06, 6, -t * 0.5));
    }
    return out;
  } },

  // Content and video: a spinning reel around a play button
  creative: { link: 0.095, fn: (t, m, cx, cy) => {
    const r = m * 0.38, p = 1 + Math.sin(t * 2) * 0.04, out = ring(cx, cy, r, 30, t * 0.25);
    const tri = [[cx - r * 0.28 * p, cy - r * 0.4 * p], [cx - r * 0.28 * p, cy + r * 0.4 * p], [cx + r * 0.44 * p, cy]];
    for (let i = 0; i < 3; i++) out.push(...line(...tri[i], ...tri[(i + 1) % 3], 7).slice(0, 6));
    out.push(...ring(cx, cy, r * 1.12, 14, -t * 0.4));
    return out;
  } },

  // Skills: a rotating globe of connected skills
  skills: { link: 0.19, fn: (t, m, cx, cy) => {
    const R = m * 0.4, n = 60, out = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, rad = Math.sqrt(1 - y * y), th = i * 2.399963 + t * 0.35;
      const sc = 1 / (1.6 - Math.sin(th) * rad * 0.4);
      out.push([cx + Math.cos(th) * rad * R * sc, cy + y * R * sc]);
    }
    return out;
  } },

  // Education (physics): an atom with orbiting electrons
  education: { link: 0.1, fn: (t, m, cx, cy) => {
    const out = ring(cx, cy, m * 0.035, 6, t);
    [0, 1, 2].forEach((k) => {
      const rot = (k * Math.PI) / 3 + Math.PI / 6, a = m * 0.42, b = m * 0.15;
      for (let i = 0; i < 22; i++) {
        const th = (i / 22) * TAU + t * (0.5 + k * 0.15), x = Math.cos(th) * a, y = Math.sin(th) * b;
        out.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]);
      }
    });
    return out;
  } },

  // Contact: a floating envelope sending out signals
  contact: { link: 0.095, fn: (t, m, cx, cy) => {
    const w = m * 0.62, h = m * 0.42, bob = Math.sin(t * 1.2) * m * 0.02, x0 = cx - w / 2, y0 = cy - h / 2 + bob;
    const c = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]], out = [];
    for (let i = 0; i < 4; i++) out.push(...line(...c[i], ...c[(i + 1) % 4], i % 2 ? 6 : 9).slice(0, -1));
    out.push(...line(x0, y0, cx, cy + bob, 6).slice(1), ...line(x0 + w, y0, cx, cy + bob, 6).slice(1, -1));
    for (let k = 0; k < 3; k++) out.push(...ring(cx, cy, m * (0.5 + ((t * 0.12 + k / 3) % 1) * 0.35), 16, k));
    return out;
  } },
};
const IDS = ['results', 'experience', 'services', 'creative', 'skills', 'education', 'contact'];

export default function NetworkBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, raf, ps = [], scene = 'hero', enter = 0, link = 150;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = W < 700 ? 90 : 100;
      ps = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, on: false }));
    };
    const pick = () => {
      const mid = window.innerHeight * 0.35;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 6;
      if (atEnd) return 'contact';
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) return id;
      }
      return 'hero';
    };
    const onScroll = () => { const k = pick(); if (k !== scene) { scene = k; enter = performance.now() / 1000; } };

    const draw = (ms) => {
      const t = ms / 1000, m = Math.min(W, H) * 0.88;
      const cx = W < 760 ? W * 0.5 : W * 0.64, cy = H * 0.52, sc = SCENES[scene];
      const pts = still ? [] : sc.fn(t - enter, m, cx, cy);
      link += ((scene === 'hero' ? 150 : sc.link * m) - link) * 0.06;
      x.clearRect(0, 0, W, H);
      ps.forEach((p, i) => {
        const tg = pts[i];
        p.on = !!tg;
        if (tg) { p.x += (tg[0] - p.x) * 0.08; p.y += (tg[1] - p.y) * 0.08; }
        else if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      });
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < link) {
            const both = p.on && q.on, a = both ? 0.85 : scene === 'hero' ? 0.24 : 0.07;
            x.strokeStyle = `rgba(169,214,229,${a * (1 - d / link)})`;
            x.lineWidth = both ? 1.6 : 1;
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke();
          }
        }
      }
      ps.forEach((p) => {
        x.fillStyle = p.on ? '#c9e8f3' : 'rgba(169,214,229,.4)';
        x.shadowColor = p.on ? 'rgba(137,194,217,.9)' : 'transparent'; x.shadowBlur = p.on ? 8 : 0;
        x.beginPath(); x.arc(p.x, p.y, p.on ? 3 : 1.4, 0, TAU); x.fill();
        x.shadowBlur = 0;
      });
      if (!still) raf = requestAnimationFrame(draw);
    };

    size(); onScroll(); raf = requestAnimationFrame(draw);
    window.addEventListener('resize', size);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
