# Portfolio

Live: https://thunaayi.github.io/

A terminal-UI style personal site, modeled on real tools like htop and
lazygit rather than a generic dark-mode template.

## What's inside

- Single-page app, five panels (home, projects, skills, resume, contact),
  navigable by mouse or keyboard (`1`-`5` to jump, `j`/`k` to move through
  lists, `Enter` to expand).
- Gruvbox color palette, JetBrains Mono throughout, no gradients, no rounded
  corners.
- Boot sequence overlay on first visit per session; resolves the real URL
  hash so deep links land on the right panel.
- Contact form wired to Formspree.

## Tech

- Next.js, static export (`out/`), deployed on GitHub Pages
- Plain CSS (`app/globals.css`), no Tailwind, no component framework
- No animation library; the only motion is a CSS pulse and a scroll reveal

## Main Projects

### ExamExpert
Full-stack LMS. Backend and full-stack integration built from the ground up
on an existing frontend, 38 MongoDB models, 340 API endpoints. Load tested
to 500 concurrent users at 88ms P95.

### AceMrcem
Medical exam prep platform for MRCEM candidates. Backend built from scratch,
31 models, 180 endpoints. Load tested to 80 concurrent users at 190ms P95,
99.8% success.
