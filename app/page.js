import NetworkBackground from '../components/NetworkBackground';
import Photo from '../components/Photo';
import { stats, jobs, services, creative, skills, languages, education } from './data';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Home() {
  return (
    <>
      <NetworkBackground />
      <header>
        <nav aria-label="Main">
          <a href="#results">Results</a>
          <a href="#experience">Experience</a>
          <a href="#services">What I do</a>
          <a href="#creative">Content</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
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
              <a className="btn s" href={`${base}/resume.pdf`}>Download resume</a>
            </div>
          </div>
          <Photo src={`${base}/photo.jpg`} alt="Portrait of Md. Shahedur Rahman" />
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
          <a className="btn p" href="mailto:Shahedur6@gmail.com">Email me</a>
          <a className="btn s" href="https://www.linkedin.com/in/md-shahedur-rahman98/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn s" href="https://github.com/Shahedur-Rahman-Shohagh" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn s" href={`${base}/resume.pdf`}>Resume (PDF)</a>
        </div></section>
      </main>
      <footer>© {new Date().getFullYear()} Md. Shahedur Rahman (Shohagh) · Dhaka, Bangladesh</footer>
    </>
  );
}
