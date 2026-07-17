const projects = [
  {
    id: "examexpert",
    title: "ExamExpert",
    tag: "backend-led",
    summary: "A full stack learning management system. Students take timed mock exams, review with interactive flashcards, and track performance across a hierarchical course structure.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Socket.IO"],
    status: "built solo at BlackMode",
    impact: "Deployed to production, owns the full deploy pipeline end to end.",
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
    summary: "A medical exam prep platform for MRCEM candidates. High fidelity timed simulations, thousands of questions with rich clinical media, and activity logging built for exam integrity.",
    tech: ["React", "TypeScript", "Express", "MongoDB", "Docker"],
    status: "freelance build for Umair Ali",
    impact: "Load tested to 80 concurrent virtual users: 190ms P95, 99.8% success across 10,764 requests. Estimated capacity: 200-400 real concurrent users.",
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

const sections = ["home", "projects", "skills", "resume", "contact"];
let activeSection = "home";
let activeProjectIndex = 0;
let expanded = false;

const statusHint = document.getElementById("statusHint");
const navItems = document.querySelectorAll(".nav-item");
const panels = document.querySelectorAll(".panel");

function setSection(name) {
  activeSection = name;
  panels.forEach((p) => (p.hidden = p.dataset.panel !== name));
  navItems.forEach((n) => n.classList.toggle("is-active", n.dataset.section === name));
  updateStatusHint();
  if (name === "projects") renderProjects();
}

function updateStatusHint() {
  const hints = {
    home: "1-5 or click sidebar: switch section",
    projects: "↑↓ or j/k: select project · enter: toggle full case study · 1-5: jump",
    skills: "1-5: jump to section",
    resume: "1-5: jump · click download to grab the PDF",
    contact: "1-5: jump · tab through the form fields to fill it out",
  };
  statusHint.textContent = hints[activeSection] || "";
}

navItems.forEach((btn) => {
  btn.addEventListener("click", () => setSection(btn.dataset.section));
});

function renderProjects() {
  const list = document.getElementById("projectList");
  const detail = document.getElementById("projectDetail");

  list.innerHTML = projects
    .map(
      (p, i) => `
      <button class="list-item ${i === activeProjectIndex ? "is-active" : ""}" data-index="${i}">
        ${p.title}
        <small>${p.tag}</small>
      </button>`
    )
    .join("");

  list.querySelectorAll(".list-item").forEach((el) => {
    el.addEventListener("click", () => {
      activeProjectIndex = Number(el.dataset.index);
      expanded = false;
      renderProjects();
    });
  });

  const p = projects[activeProjectIndex];
  detail.innerHTML = `
    <h3>${p.title}</h3>
    <p class="status-line"><span class="dot"></span> ${p.status}</p>
    <p class="summary">${p.summary}</p>
    <div class="tech-row">${p.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("")}</div>
    <p class="impact-line">${p.impact}</p>
    <button class="expand-btn" id="expandBtn">[ ${expanded ? "hide" : "show"} full case study ]</button>
    ${
      expanded
        ? `<div class="case-study">${p.details
            .map(
              (d) =>
                `<h4>${d.h}</h4><ul>${d.items.map((i) => `<li>${i}</li>`).join("")}</ul>`
            )
            .join("")}</div>`
        : ""
    }
  `;

  document.getElementById("expandBtn").addEventListener("click", () => {
    expanded = !expanded;
    renderProjects();
  });
}

// Keyboard navigation. Ignored while typing in a form field.
document.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (e.key >= "1" && e.key <= "5") {
    setSection(sections[Number(e.key) - 1]);
    return;
  }

  if (activeSection === "projects") {
    if (e.key === "j" || e.key === "ArrowDown") {
      activeProjectIndex = (activeProjectIndex + 1) % projects.length;
      expanded = false;
      renderProjects();
    } else if (e.key === "k" || e.key === "ArrowUp") {
      activeProjectIndex = (activeProjectIndex - 1 + projects.length) % projects.length;
      expanded = false;
      renderProjects();
    } else if (e.key === "Enter") {
      expanded = !expanded;
      renderProjects();
    }
  }
});

setSection("home");
