import NetworkBackground from '../components/NetworkBackground';
import Reveal from '../components/Reveal';
import NetworkBackground from '../components/NetworkBackground';
import Photo from '../components/Photo';
import HeroWaves from '../components/HeroWaves';
import GlowEffects from '../components/GlowEffects';
import { WaIcon, MailIcon, InIcon, GhIcon, YtIcon, DocIcon } from '../components/Icons';
import { stats, jobs, services, creative, skills, languages, education } from './data';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const WA = 'https://wa.me/8801875601397?text=' + encodeURIComponent('Hi Shohagh, I found your portfolio and would like to talk.');

export default function Home() {
  return (
    <>
      <NetworkBackground />
      <GlowEffects />
      <header className="top">
        <HeroWaves />
        <div className="wrap navwrap">
        <nav aria-label="Main">
          <a href="#results">Results</a>
          <a href="#experience">Experience</a>
          <a href="#services">What I do</a>
          <a href="#creative">Content</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        </div>
        <div className="wrap hero">
          <div>
            <h1>I close international deals and <em>automate</em> the work behind them.</h1>
            <p>
              Hi, I&rsquo;m Md. Shahedur Rahman, but everyone calls me Shohagh. I&rsquo;m a sales executive at
              Softvence Agency in Dhaka. I handle clients from around the world on Fiverr, from the first
              message to the signed order. I also build n8n AI automations and shoot and edit video content.
            </p>
            <div className="btns">
              <a className="btn p big" href="#contact">Work with me</a>
              <a className="btn wa big" href={WA} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp me</a>
            </div>
            <div className="btns2"><a href={`${base}/resume.pdf`}>Download resume</a><a href={`${base}/resume-creative.pdf`}>Creative CV</a>
            </div>
          </div>
          <div className="photo-wrap">
            <Photo src={`${base}/hero-portrait.webp`} alt="Portrait of Md. Shahedur Rahman" />
            <div className="chip c1"><b>100%</b> Fiverr response rate</div>
            <div className="chip c2"><b>$30K+</b> project value handled</div>
          </div>
        </div>
      </header>


<section id="results">
  <div className="wrap">
    <Reveal direction="up">
      <h2>Results so far</h2>
      <p className="sub">
        Numbers from my Fiverr sales dashboard,
        April to September 2026.
      </p>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.l}>
            <b>{s.v}</b>
            <span>{s.l}</span>
          </div>
        ))}
      </div>
    </Reveal>
  </div>
</section>

        <section id="experience"><div className="wrap">
          <h2>Experience</h2>
          <p className="sub">Sales, marketing, content and customer work, newest first.</p>
          <div className="tl">
            {jobs.map((j) => (
              <div className="job" key={j.t}>
                <h3>{j.t}</h3><div className="meta">{j.m}</div><p>{j.d}</p>
              </div>
            ))}
          </div>
        </div></section>

        <section id="services"><div className="wrap">
          <h2>What I do for clients</h2>
          <p className="sub">The projects I sell and manage cover web, mobile and automation.</p>
          <div className="grid">
            {services.map((s) => (
              <div className="card" key={s.t}>
                <h3>{s.t}</h3>
                {s.d && <p>{s.d}</p>}
                {s.list && <ul>{s.list.map((i) => <li key={i}>{i}</li>)}</ul>}
              </div>
            ))}
          </div>
        </div></section>

        <section id="creative"><div className="wrap">
          <h2>Content and video</h2>
          <p className="sub">Before sales I was already behind a camera and a script.</p>
          <div className="grid">
            {creative.map((c) => (
              <div className="card" key={c.t}><h3>{c.t}</h3><p>{c.d}</p></div>
            ))}
          </div>
          <p className="sub" style={{ marginTop: 24 }}>
            See the creative version of my resume: <a href={`${base}/resume-creative.pdf`}>resume-creative.pdf</a>
          </p>
        </div></section>

        <section id="skills"><div className="wrap">
          <h2>Skills</h2>
          <p className="sub">Tools and strengths I use every day.</p>
          <div className="tags">{skills.map((s) => <span key={s}>{s}</span>)}</div>
          <h3 style={{ margin: '36px 0 12px', fontSize: 18 }}>Certification</h3>
          <div className="card">
            <h3>OPSWAT Cybersecurity Fundamentals Associate (OCFA)</h3>
            <p>OPSWAT Academy, issued October 2026.</p>
          </div>
          <h3 style={{ margin: '36px 0 12px', fontSize: 18 }}>Languages</h3>
          <div className="tags">{languages.map((l) => <span key={l}>{l}</span>)}</div>
        </div></section>

        <section id="education"><div className="wrap">
          <h2>Education</h2>
          <p className="sub">&nbsp;</p>
          <div className="grid">
            {education.map((e) => (
              <div className="card" key={e.t}><h3>{e.t}</h3><p>{e.d}<br />{e.y}</p></div>
            ))}
            <div className="card"><h3>Clubs</h3><p>Organization Secretary, Govt. Bangla College Science Club (2022 to 2023). Member of the Recitation Club and the Bangladesh Science Fiction Society.</p></div>
            <div className="card"><h3>Outside work</h3><p>Guitar, singing, photography, cinematography, travel, movies and reading.</p></div>
          </div>
        </div></section>

        <section id="contact" className="contact"><div className="wrap">
          <h2>Let&rsquo;s talk</h2>
          <p className="sub">Have a project or a role in mind? Send me a message.</p>
          <a className="btn brand b-wa" href={WA} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp</a>
          <a className="btn brand b-mail" href="mailto:Shahedur6@gmail.com"><MailIcon />Email me</a>
          <a className="btn brand b-in" href="https://www.linkedin.com/in/md-shahedur-rahman98/" target="_blank" rel="noopener noreferrer"><InIcon />LinkedIn</a>
          <a className="btn brand b-gh" href="https://github.com/Shahedur-Rahman-Shohagh" target="_blank" rel="noopener noreferrer"><GhIcon />GitHub</a>
          <a className="btn brand b-yt" href="https://www.youtube.com/@shahedurrahman4909" target="_blank" rel="noopener noreferrer"><YtIcon />YouTube</a>
          <a className="btn brand b-cv" href={`${base}/resume.pdf`}><DocIcon />Resume (PDF)</a>
          <p className="phone">WhatsApp and phone: <a href="tel:+8801875601397">+880 1875 601397</a> · Email: <a href="mailto:Shahedur6@gmail.com">Shahedur6@gmail.com</a></p>
        </div></section>
      </main>
      <a className="wa-float" href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WaIcon /><span>Chat on WhatsApp</span></a>
      <footer>© {new Date().getFullYear()} Md. Shahedur Rahman (Shohagh) · Dhaka, Bangladesh</footer>
    </>
  );
}
