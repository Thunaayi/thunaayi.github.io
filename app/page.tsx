"use client";

import { useCallback, useEffect, useState } from "react";
import { BootScreen } from "@/app/boot-screen";

const SECTIONS = ["home", "projects", "skills", "resume", "contact"] as const;
type Section = (typeof SECTIONS)[number];

type Project = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  tech: string[];
  status: string;
  impact: string;
  details: { h: string; items: string[] }[];
  stats?: { label: string; value: string; pct: number }[];
};

const PROJECTS: Project[] = [
  {
    id: "examexpert",
    title: "ExamExpert",
    tag: "backend-led",
    summary:
      "A full stack learning management system. Students take timed mock exams, review with interactive flashcards, and track performance across a hierarchical course structure.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Socket.IO"],
    status: "built at BlackMode",
    impact:
      "In production. Owns the full deploy pipeline, no manual steps.",
    details: [
      {
        h: "what it does",
        items: [
          "Course content organized as Courses → Subjects → Books → Chapters → Topics",
          "Question bank with multiple question types and per-question statistics",
          "Real-time test sessions over Socket.IO, tracking response time and progress live",
          "Flashcard system for spaced revision",
          "Role based access for students, teachers, and administrators",
        ],
      },
      {
        h: "infrastructure",
        items: [
          "Auto-deploy on push to main via Coolify",
          "Rate limiting and request sanitization on all public endpoints",
        ],
      },
    ],
  },
  {
    id: "acemrcem",
    title: "AceMrcem",
    tag: "full-stack",
    summary:
      "A medical exam prep platform for MRCEM candidates. High fidelity timed simulations, thousands of questions with rich clinical media, and activity logging built for exam integrity.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Docker"],
    status: "built at BlackMode",
    impact:
      "Load tested to 80 concurrent virtual users: 190ms P95, 99.8% success across 10,764 requests. Estimated capacity: 200-400 real concurrent users.",
    stats: [
      { label: "P95 response", value: "190ms", pct: 95 },
      { label: "success rate", value: "99.8%", pct: 100 },
      { label: "requests", value: "10,764", pct: 80 },
    ],
    details: [
      {
        h: "what it does",
        items: [
          "Timed exam simulations built to mirror the real MRCEM exam experience",
          "Dynamic question bank with explanations, hints, and rich medical imagery",
          "Performance analytics with per-question time breakdowns and historical tracking",
          "IP based activity logging for exam integrity monitoring",
        ],
      },
      {
        h: "load testing",
        items: [
          "Found and fixed a false-positive DDoS rule that was rate-limiting normal traffic under load",
          "15-point security test suite: 15 of 15 checks passed",
        ],
      },
    ],
  },
];

const HINTS: Record<Section, string> = {
  home: "1-5 or click sidebar: switch section",
  projects:
    "↑↓ or j/k: select project · enter: toggle full case study · 1-5: jump",
  skills: "1-5: jump to section",
  resume: "1-5: jump · click download to grab the PDF",
  contact: "1-5: jump · tab through the form fields to fill it out",
};

const SECTION_NAMES: Record<Section, string> = {
  home: "home",
  projects: "projects",
  skills: "skills",
  resume: "resume",
  contact: "contact",
};

function parseHash(): Section {
  const hash = window.location.hash.replace("#", "") as Section;
  if (SECTIONS.includes(hash)) return hash;
  return "home";
}

export default function Page() {
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleBootComplete = useCallback((target: string | null) => {
    const section = target && SECTIONS.includes(target as Section) ? (target as Section) : null;
    if (section) {
      setActiveSection(section);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const hash = window.location.hash.replace("#", "");
    const section = SECTIONS.includes(hash as Section) ? (hash as Section) : null;
    if (section) {
      setActiveSection(section);
    }
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    history.replaceState(null, "", `#${SECTION_NAMES[activeSection]}`);
  }, [activeSection, ready]);

  useEffect(() => {
    if (!ready) return;

    function handleHashChange() {
      const hash = window.location.hash.replace("#", "") as Section;
      if (SECTIONS.includes(hash)) {
        setActiveSection(hash);
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    function handleKeyDown(e: KeyboardEvent) {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const num = Number(e.key);
      if (num >= 1 && num <= 5) {
        setActiveSection(SECTIONS[num - 1]);
        setExpanded(false);
        e.preventDefault();
        return;
      }

      if (activeSection === "projects") {
        if (e.key === "j" || e.key === "ArrowDown") {
          setActiveProjectIndex((i) => (i + 1) % PROJECTS.length);
          setExpanded(false);
          e.preventDefault();
        } else if (e.key === "k" || e.key === "ArrowUp") {
          setActiveProjectIndex(
            (i) => (i - 1 + PROJECTS.length) % PROJECTS.length,
          );
          setExpanded(false);
          e.preventDefault();
        } else if (e.key === "Enter") {
          setExpanded((x) => !x);
          e.preventDefault();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ready, activeSection]);

  function setSection(s: Section) {
    setActiveSection(s);
    setExpanded(false);
  }

  function renderProjectList() {
    return PROJECTS.map((p, i) => (
      <button
        key={p.id}
          tabIndex={-1}
          className={`list-item${i === activeProjectIndex ? " is-active" : ""}`}
          onClick={() => {
            setActiveProjectIndex(i);
            setExpanded(false);
          }}
        >
          <span className="list-item__label">
          <span className="list-item__text">{p.title}</span>
        </span>
        <small>{p.tag}</small>
      </button>
    ));
  }

  function renderProjectDetail() {
    const p = PROJECTS[activeProjectIndex];
    return (
      <>
        <h3>{p.title}</h3>
        <p className="status-line">
          <span className="dot" /> {p.status}
        </p>
        <p className="summary">{p.summary}</p>
        <div className="tech-row">
          {p.tech.map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
        </div>
        {p.stats ? (
          <div className="stat-block">
            {p.stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span className="stat-bar">
                  <span className="stat-bar__fill" style={{ width: `${s.pct}%` }} />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="stat-none">load testing: not yet run</p>
        )}
        <p className="impact-line">{p.impact}</p>
        <button
          className="expand-btn"
          onClick={() => setExpanded((x) => !x)}
        >
          [ {expanded ? "hide" : "show"} full case study ]
        </button>
        {expanded && (
          <div className="case-study">
            {p.details.map((d) => (
              <div key={d.h}>
                <h4>{d.h}</h4>
                <ul>
                  {d.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <BootScreen onBootComplete={handleBootComplete} />

      <div id="app" style={ready ? {} : { visibility: 'hidden' }}>
        <header className="topbar">
          <span className="topbar__user">aimal@portfolio</span>
          <span className="topbar__status">
            <span className="dot" /> open to opportunities
          </span>
          <a className="topbar__resume" href="/resume.pdf" download>
            [ download resume ]
          </a>
        </header>

        <div className="frame">
          <nav className="sidebar" aria-label="Sections">
            <div className="pane-title">[ menu ]</div>
            {(SECTIONS as unknown as Section[]).map((s, i) => (
              <button
                key={s}
                tabIndex={-1}
                className={`nav-item${activeSection === s ? " is-active" : ""}`}
                onClick={() => setSection(s)}
              >
                <span className="nav-item__label">
                  <span className="nav-item__key">{i + 1}</span>
                  <span className="nav-item__text">{SECTION_NAMES[s]}</span>
                </span>
              </button>
            ))}
          </nav>

          <main className="content">
              {/* HOME */}
              <section
                className="panel"
                hidden={activeSection !== "home"}
              >
                <div className="pane-title">[ 1:home ]</div>
                <div className="neofetch">
                  <pre className="neofetch__mark" aria-hidden="true">
                    {`┌────────┐
│   AA   │
└────────┘`}
                  </pre>
                  <dl className="neofetch__stats">
                    <div>
                      <dt>name</dt>
                      <dd>Aimal Asim</dd>
                    </div>
                    <div>
                      <dt>role</dt>
                      <dd>Full Stack Developer</dd>
                    </div>
                    <div>
                      <dt>stack</dt>
                      <dd>Node.js · Express · MongoDB · React</dd>
                    </div>
                    <div>
                      <dt>host</dt>
                      <dd>BlackMode + freelance</dd>
                    </div>
                    <div>
                      <dt>locale</dt>
                      <dd>Karachi, Pakistan</dd>
                    </div>
                    <div>
                      <dt>focus</dt>
                      <dd>backend, real-time systems</dd>
                    </div>
                    <div>
                      <dt>uptime</dt>
                      <dd>1+ years shipping production code</dd>
                    </div>
                  </dl>
                </div>
                <p className="home__pitch">
                  I build learning platforms and real-time systems. No computer
                  science degree, high school then a development bootcamp, then
                  straight into building things people actually use.
                </p>
                <dl className="home__highlights">
                  <div>
                    <dt>2</dt>
                    <dd>production platforms shipped</dd>
                  </div>
                  <div>
                    <dt>180+</dt>
                    <dd>API endpoints</dd>
                  </div>
                  <div>
                    <dt>99.8%</dt>
                    <dd>success rate under load</dd>
                  </div>
                </dl>
                <div className="home__cta-row">
                  <a
                    tabIndex={-1}
                    className="home__cta"
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); setSection("projects"); }}
                  >
                    [ view projects → ]
                  </a>
                  <a tabIndex={-1} className="home__cta" href="/resume.pdf" download>
                    [ download resume → ]
                  </a>
                </div>
              </section>

              {/* PROJECTS */}
              <section
                className="panel"
                hidden={activeSection !== "projects"}
              >
                <div className="pane-title">[ 2:projects ]</div>
                <div className="split">
                  <div
                    className="list"
                    role="listbox"
                    aria-label="Projects"
                  >
                    {renderProjectList()}
                  </div>
                  <div className="detail">{renderProjectDetail()}</div>
                </div>
              </section>

              {/* SKILLS */}
              <section
                className="panel"
                hidden={activeSection !== "skills"}
              >
                <div className="pane-title">[ 3:skills ]</div>
                <div className="skills-grid">
                  <div className="skills-col">
                    <div className="skills-col__label">frontend</div>
                    <ul>
                      <li>React &amp; TypeScript</li>
                      <li>Redux &amp; state mgmt</li>
                      <li>Tailwind CSS</li>
                      <li>Framer Motion</li>
                      <li>Responsive design</li>
                    </ul>
                  </div>
                  <div className="skills-col">
                    <div className="skills-col__label">backend</div>
                    <ul>
                      <li>Node.js &amp; Express</li>
                      <li>MongoDB &amp; Mongoose</li>
                      <li>Socket.IO &amp; real-time</li>
                      <li>REST API design</li>
                      <li>JWT authentication</li>
                    </ul>
                  </div>
                  <div className="skills-col">
                    <div className="skills-col__label">
                      infra &amp; tools
                    </div>
                    <ul>
                      <li>Docker</li>
                      <li>Git &amp; version control</li>
                      <li>CapRover / Coolify</li>
                      <li>Security hardening</li>
                      <li>Performance testing</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* RESUME */}
              <section
                className="panel"
                hidden={activeSection !== "resume"}
              >
                <div className="pane-title">[ 4:resume ]</div>
                <a className="btn" href="/resume.pdf" download>
                  [ download PDF ]
                </a>
                <p className="resume__note">
                  Add the real file at <code>resume.pdf</code> in the
                  public/ folder before this link works.
                </p>

                <div className="resume__block">
                  <div className="skills-col__label">
                    Full Stack Developer — BlackMode
                  </div>
                  <ul className="resume__list">
                    <li>
                      Solely designed and built ExamExpert, a full stack LMS
                      covering course structure, question banks, real-time timed
                      exams, and flashcard review
                    </li>
                    <li>
                      Implemented JWT based authentication and role based access
                      control for students, teachers, and administrators
                    </li>
                    <li>
                      Set up continuous deployment through Coolify, every push
                      to main ships to production automatically
                    </li>
                    <li>
                      Load tested the platform locally with k6.{" "}
                      <span className="placeholder">
                        [ADD YOUR REAL NUMBERS: concurrent users, requests per
                        second, average response time]
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="resume__block">
                  <div className="skills-col__label">
                    Freelance Full Stack Developer
                  </div>
                  <ul className="resume__list">
                    <li>
                      Built AceMrcem, a medical exam prep platform, for client
                      Umair Ali
                    </li>
                    <li>
                      Load tested the production build: 80 concurrent virtual
                      users, 190ms P95 response time, 99.8% success rate across
                      10,764 requests
                    </li>
                    <li>
                      Estimated production capacity of 200 to 400 real
                      concurrent users on current infrastructure
                    </li>
                    <li>
                      Integrated PayFast for client payment processing
                    </li>
                  </ul>
                </div>

                <div className="resume__block">
                  <div className="skills-col__label">Education</div>
                  <p>
                    PSDC development bootcamp. High school diploma.
                  </p>
                </div>
              </section>

              {/* CONTACT */}
              <section
                className="panel"
                hidden={activeSection !== "contact"}
              >
                <div className="pane-title">[ 5:contact ]</div>
                <p className="contact__intro">
                  Open for full time roles, freelance work, and interesting
                  problems.
                </p>
                <form
                  className="tform"
                  action="https://formspree.io/f/xpqjzdqz"
                  method="POST"
                >
                  <label>
                    <span>name</span>
                    <input type="text" name="name" required />
                  </label>
                  <label>
                    <span>email</span>
                    <input type="email" name="email" required />
                  </label>
                  <label>
                    <span>message</span>
                    <textarea name="message" rows={4} required />
                  </label>
                  <button type="submit" className="btn">
                    [ send message ]
                  </button>
                </form>
                <div className="contact__links">
                  <a href="mailto:aimalasim92@gmail.com">email</a>
                  <a
                    href="https://github.com/thunaayi"
                    target="_blank"
                    rel="noopener"
                  >
                    github
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aimalasim/"
                    target="_blank"
                    rel="noopener"
                  >
                    linkedin
                  </a>
                </div>
              </section>
            </main>
          </div>

          <footer className="statusbar" id="statusbar">
            <span id="statusHint">{HINTS[activeSection]}</span>
          </footer>
        </div>
    </>
  );
}
