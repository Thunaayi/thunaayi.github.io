import { MonogramAvatar } from "./MonogramAvatar";
import profile from "@/data/profile.json";

const linkIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const downloadIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export function HeroCard() {
  const { name, title, intro, location, availability, resumeUrl, social } = profile;

  return (
    <div
      className="col-span-full md:col-span-2 lg:col-span-2"
    >
      <div
        className="flex h-full flex-col rounded-[var(--card-radius)] p-5 md:p-6 transition-all duration-200"
        style={{ backgroundColor: "var(--bg-card)", border: "var(--border-subtle)" }}
      >
        <div className="flex items-start gap-4">
          <MonogramAvatar name={name} size="large" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl" style={{ color: "var(--text-primary)" }}>
              {name}
            </h1>
            <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--accent-blue)" }}>
              {title}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {intro}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--accent-green)" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "var(--accent-green)" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent-green)" }} />
            </span>
            <span>{availability}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <a
            href={social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-primary)" }}
          >
            {linkIcon}
            GitHub
          </a>
          <a
            href={social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent-purple)", color: "#fff" }}
          >
            {linkIcon}
            LinkedIn
          </a>
          <a
            href={`mailto:${social.email}`}
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-primary)" }}
          >
            {linkIcon}
            Email
          </a>
          <a
            href={resumeUrl}
            download
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--accent-blue)", color: "#fff" }}
          >
            {downloadIcon}
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}