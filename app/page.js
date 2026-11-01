import NetworkBackground from '../components/NetworkBackground';
import Photo from '../components/Photo';
import HeroWaves from '../components/HeroWaves';
import { stats, jobs, services, creative, skills, languages, education } from './data';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const WA = 'https://wa.me/8801875601397?text=' + encodeURIComponent('Hi Shohagh, I found your portfolio and would like to talk.');
const WaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
);

export default function Home() {
  return (
    <>
      <NetworkBackground />
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
            <h1>I close international deals and automate the work behind them.</h1>
            <p>
              Hi, I&rsquo;m Md. Shahedur Rahman, but everyone calls me Shohagh. I&rsquo;m a sales executive at
              Softvence Agency in Dhaka. I handle clients from around the world on Fiverr, from the first
              message to the signed order. I also build n8n AI automations and shoot and edit video content.
            </p>
            <div className="btns">
              <a className="btn p" href="#contact">Work with me</a>
              <a className="btn wa" href={WA} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp me</a>
              <a className="btn s" href={`${base}/resume.pdf`}>Download resume</a>
            </div>
          </div>
          <div className="photo-wrap"><Photo src={`${base}/photo.jpg`} alt="Portrait of Md. Shahedur Rahman" /></div>
        </div>
      </header>

      <main>
        <section id="results"><div className="wrap">
          <h2>Results so far</h2>
          <p className="sub">Numbers from my Fiverr sales dashboard, April to September 2026.</p>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.l}><b>{s.v}</b><span>{s.l}</span></div>
            ))}
          </div>
        </div></section>

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
          <a className="btn wa" href={WA} target="_blank" rel="noopener noreferrer"><WaIcon />WhatsApp</a>
          <a className="btn p" href="mailto:Shahedur6@gmail.com">Email me</a>
          <a className="btn s" href="https://www.linkedin.com/in/md-shahedur-rahman98/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn s" href="https://github.com/Shahedur-Rahman-Shohagh" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn s" href={`${base}/resume.pdf`}>Resume (PDF)</a>
          <p className="phone">WhatsApp and phone: <a href="tel:+8801875601397">+880 1875 601397</a> · Email: <a href="mailto:Shahedur6@gmail.com">Shahedur6@gmail.com</a></p>
        </div></section>
      </main>
      <a className="wa-float" href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WaIcon /><span>Chat on WhatsApp</span></a>
      <footer>© {new Date().getFullYear()} Md. Shahedur Rahman (Shohagh) · Dhaka, Bangladesh</footer>
    </>
  );
}
