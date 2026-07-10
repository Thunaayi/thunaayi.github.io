"use client";

import { useState } from "react";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  tech: string[];
  keyAchievements: string[];
  metrics: string[];
  links: { demo: string; github: string; caseStudy: string };
  caseStudy: {
    overview: string;
    problem: string;
    myRole: string;
    architecture: string;
    techStack: string[];
    challenges: string[];
    solutions: string[];
    performance: string[];
    deployment: string;
    lessonsLearned: string[];
  };
};

const externalIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const chevronIcon = (open: boolean) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="col-span-full md:col-span-2 rounded-[var(--card-radius)] transition-all duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--bg-card)", border: "var(--border-subtle)" }}
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold leading-tight tracking-tight md:text-xl" style={{ color: "var(--text-primary)" }}>
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.1em]" style={{ color: "var(--accent-blue)" }}>
              {project.subtitle}
            </p>
          </div>
          <span className="rounded px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em]" style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-tertiary)" }}>
            {project.role}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {project.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded px-2 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-secondary)" }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold"
              style={{ backgroundColor: "rgba(0,120,212,0.12)", color: "var(--accent-blue)" }}
            >
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6" /></svg>
              {m}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent-blue)", color: "#fff" }}
          >
            {externalIcon}
            Live Demo
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-primary)" }}
          >
            {externalIcon}
            GitHub
          </a>
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-primary)" }}
          >
            {chevronIcon(expanded)}
            {expanded ? "Hide Case Study" : "Case Study"}
          </button>
        </div>
      </div>

      <div
        style={{
          maxHeight: expanded ? "3000px" : "0",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div style={{ borderTop: "var(--border-subtle)" }}>
          <ProjectCaseStudy caseStudy={project.caseStudy} />
        </div>
      </div>
    </div>
  );
}