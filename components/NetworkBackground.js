'use client';
import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;
const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const line = (ax, ay, bx, by, n) =>
  Array.from({ length: n }, (_, i) => { const f = n === 1 ? 0 : i / (n - 1); return [ax + (bx - ax) * f, ay + (by - ay) * f]; });
const ring = (cx, cy, r, n, rot = 0) =>
  Array.from({ length: n }, (_, i) => [cx + r * Math.cos(rot + (i / n) * TAU), cy + r * Math.sin(rot + (i / n) * TAU)]);

const arc = (cx, cy, r, a0, a1, n) =>
  Array.from({ length: n }, (_, i) => [cx + r * Math.cos(a0 + ((a1 - a0) * i) / (n - 1)), cy + r * Math.sin(a0 + ((a1 - a0) * i) / (n - 1))]);

// A line-art handshake (unit coordinates), turned into evenly spaced points
const HS_LINES = (() => {
  const L = [];
  L.push([[-0.4, -0.15], [-0.5, -0.15], [-0.5, 0.15], [-0.4, 0.15]]);                       // left cuff
  L.push([[0.4, -0.15], [0.5, -0.15], [0.5, 0.15], [0.4, 0.15]]);                           // right cuff
  L.push([[-0.4, -0.12], [-0.2, -0.16], [-0.05, -0.22], [0.08, -0.2], [0.2, -0.14], [0.4, -0.12]]); // forearms + thumb
  const bottom = [[-0.4, 0.12], [-0.22, 0.14]];
  [-0.165, -0.055, 0.055, 0.165].forEach((cx) => bottom.push(...arc(cx, 0.14, 0.055, Math.PI, 0, 7)));
  bottom.push([0.22, 0.14], [0.4, 0.12]);
  L.push(bottom);                                                                           // fingers
  L.push([[-0.22, -0.16], [-0.12, -0.02], [0, 0.04], [0.12, -0.02], [0.22, -0.14]]);        // clasp
  [-0.11, 0, 0.11].forEach((x) => L.push([[x, 0.05], [x, 0.14]]));                           // finger gaps
  return L;
})();
const HS_PTS = (() => {
  const d = 0.062, out = [];
  for (const pl of HS_LINES) {
    let carry = 0;
    for (let i = 1; i < pl.length; i++) {
      const [x0, y0] = pl[i - 1], [x1, y1] = pl[i], len = Math.hypot(x1 - x0, y1 - y0);
      for (let t = carry; t < len; t += d) out.push([x0 + ((x1 - x0) * t) / len, y0 + ((y1 - y0) * t) / len]);
      carry = (carry + Math.ceil((len - carry) / d) * d) - len;
    }
    out.push(pl[pl.length - 1]);
  }
  return out;
})();
const ORBITS = [{ a: 0.62, b: 0.2, r: 0.5 }, { a: 0.62, b: 0.2, r: -0.5 }];

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

  // What I do: a handshake inside an atom (deals closed, orbiting services) shown as an emblem beside the heading
  services: { link: (m, W) => (W < 760 ? 0.7 : 0.55) * 0.062 * m * 1.5, fade: (W) => (W < 760 ? 0.5 : 1),
    fn: (t, m, cx, cy, W, H) => {
      const sz = m * (W < 760 ? 0.7 : 0.55), px = W < 760 ? W * 0.5 : W * 0.76, py = H * (W < 760 ? 0.11 : 0.25);
      const g = ease(t / 2.4), bob = Math.sin(t * 1.4) * m * 0.01;
      const out = HS_PTS.map(([x, y], i) => (i < HS_PTS.length * g ? [px + x * sz, py + y * sz + bob] : null));
      ORBITS.forEach((o, k) => {
        for (let i = 0; i < 10; i++) {
          const th = (i / 10) * TAU + t * (0.7 + k * 0.2) * (k ? -1 : 1);
          const ex = Math.cos(th) * o.a * sz, ey = Math.sin(th) * o.b * sz;
          out.push([px + ex * Math.cos(o.r) - ey * Math.sin(o.r), py + bob + ey * Math.cos(o.r) + ex * Math.sin(o.r)]);
        }
      });
      return out;
    },
    decor: (x, t, m, cx, cy, W, H) => {
      const sz = m * (W < 760 ? 0.7 : 0.55), px = W < 760 ? W * 0.5 : W * 0.76, py = H * (W < 760 ? 0.11 : 0.25);
      x.save(); x.globalAlpha *= Math.min(1, t / 1.2); x.lineWidth = 1; x.strokeStyle = 'rgba(137,194,217,.45)';
      ORBITS.forEach((o) => { x.beginPath(); x.ellipse(px, py, o.a * sz, o.b * sz, o.r, 0, TAU); x.stroke(); });
      x.restore();
    } },

  // Content and video: a spinning reel around a play button
  creative: { link: 0.095, fn: (t, m, cx, cy) => {
    const r = m * 0.38, p = 1 + Math.sin(t * 2) * 0.04, out = ring(cx, cy, r, 30, t * 0.25);
    const tri = [[cx - r * 0.28 * p, cy - r * 0.4 * p], [cx - r * 0.28 * p, cy + r * 0.4 * p], [cx + r * 0.44 * p, cy]];
    for (let i = 0; i < 3; i++) out.push(...line(...tri[i], ...tri[(i + 1) % 3], 7).slice(0, 6));
    out.push(...ring(cx, cy, r * 1.12, 14, -t * 0.4));
    return out;
  } },

  // Skills: a light, rotating globe (kept faint so the text stays readable)
  skills: { link: 0.2, fade: 0.38, fn: (t, m, cx, cy) => {
    const R = m * 0.4, n = 46, out = [];
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

// ===== SPEED SETTINGS (change these two numbers) =====
const SPEED = 1.4;    // how fast the shapes animate (1 = normal, 2 = twice as fast)
const FOLLOW = 0.14;  // how quickly dots fly into each new shape (0.05 slow ... 0.3 very fast)

const BUCKETS = 12;
export default function NetworkBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W, H, dpr, raf, ps = [], scene = 'hero', enter = 0, link = 150, fadeNow = 1;
    const segs = Array.from({ length: BUCKETS }, () => []);

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = W < 700 ? 90 : 100;
      ps = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, on: false }));
    };
    const pick = () => {
      const mid = window.innerHeight * 0.35;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 6) return 'contact';
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
      const m = Math.min(W, H) * 0.88, cx = W < 760 ? W * 0.5 : W * 0.64, cy = H * 0.52, sc = SCENES[scene];
      const pts = still ? [] : sc.fn((ms / 1000 - enter) * SPEED, m, cx, cy, W, H);
      link += ((scene === 'hero' ? 150 : typeof sc.link === 'function' ? sc.link(m, W) : sc.link * m) - link) * 0.1;
      const L2 = link * link;
      const fTarget = scene === 'hero' ? 1 : typeof sc.fade === 'function' ? sc.fade(W) : sc.fade ?? 0.8;
      fadeNow += (fTarget - fadeNow) * 0.08;
      x.clearRect(0, 0, W, H);
      x.globalAlpha = fadeNow;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i], tg = pts[i];
        p.on = !!tg;
        if (tg) { p.x += (tg[0] - p.x) * FOLLOW; p.y += (tg[1] - p.y) * FOLLOW; }
        else if (!still) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }
      // collect sticks into alpha buckets, then draw each bucket in ONE stroke
      for (let b = 0; b < BUCKETS; b++) segs[b].length = 0;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j], dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
          if (d2 < L2) {
            const lvl = Math.min(5, Math.floor((1 - Math.sqrt(d2) / link) * 6));
            segs[(p.on && q.on ? 6 : 0) + lvl].push(p.x, p.y, q.x, q.y);
          }
        }
      }
      const freeA = scene === 'hero' ? 0.24 : 0.07;
      for (let b = 0; b < BUCKETS; b++) {
        const a = segs[b];
        if (!a.length) continue;
        const both = b >= 6, lvl = b % 6;
        x.strokeStyle = `rgba(169,214,229,${(both ? 0.85 : freeA) * ((lvl + 0.5) / 6)})`;
        x.lineWidth = both ? 1.6 : 1;
        x.beginPath();
        for (let k = 0; k < a.length; k += 4) { x.moveTo(a[k], a[k + 1]); x.lineTo(a[k + 2], a[k + 3]); }
        x.stroke();
      }
      if (sc.decor && !still) sc.decor(x, ms / 1000 * SPEED - enter * SPEED, m, cx, cy, W, H);
      // dots: three batched fills (glow, placed, free) instead of per-dot shadows
      x.fillStyle = 'rgba(137,194,217,.18)'; x.beginPath();
      for (const p of ps) if (p.on) { x.moveTo(p.x + 7, p.y); x.arc(p.x, p.y, 7, 0, TAU); }
      x.fill();
      x.fillStyle = '#c9e8f3'; x.beginPath();
      for (const p of ps) if (p.on) { x.moveTo(p.x + 3, p.y); x.arc(p.x, p.y, 3, 0, TAU); }
      x.fill();
      x.fillStyle = 'rgba(169,214,229,.4)'; x.beginPath();
      for (const p of ps) if (!p.on) { x.moveTo(p.x + 1.4, p.y); x.arc(p.x, p.y, 1.4, 0, TAU); }
      x.fill();
      if (!still) raf = requestAnimationFrame(draw);
    };

    size(); onScroll(); raf = requestAnimationFrame(draw);
    window.addEventListener('resize', size);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); window.removeEventListener('scroll', onScroll); };
  }, []);
  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
