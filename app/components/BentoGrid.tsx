"use client";

import { HeroCard } from "./HeroCard";
import { ProjectCard } from "./ProjectCard";
import { SkillCategory } from "./SkillCategory";
import { Timeline } from "./Timeline";
import { AchievementTile } from "./CountUp";
import { LiveTileSection } from "./LiveTileSection";
import { ContactCard } from "./ContactCard";
import { SectionHeader } from "./SectionHeader";
import projectsData from "@/data/projects.json";
import achievementsData from "@/data/achievements.json";

export function BentoGrid() {
  const projects = projectsData as Array<{
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
  }>;

  const achievements = achievementsData as Array<{ value: string; label: string; accent: string }>;

  return (
    <div className="bento-grid">
      <HeroCard />

      <SectionHeader
        eyebrow="Projects"
        title="Featured Work"
        description="Production applications I've designed, built, and deployed end-to-end."
      />

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <SectionHeader
        eyebrow="Expertise"
        title="Skills & Technologies"
        description="Technologies I use to build production systems."
      />

      <div className="col-span-full">
        <SkillCategory />
      </div>

      <SectionHeader
        eyebrow="Experience"
        title="Timeline"
        description="My journey from first line of code to production applications."
      />

      <div className="col-span-full md:col-span-3 lg:col-span-4">
        <div
          className="rounded-[var(--card-radius)] p-5 md:p-6"
          style={{ backgroundColor: "var(--bg-card)", border: "var(--border-subtle)" }}
        >
          <Timeline />
        </div>
      </div>

      <SectionHeader
        eyebrow="Metrics"
        title="Engineering Achievements"
        description="Measurable impact across projects and systems."
      />

      <div className="col-span-full grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {achievements.map((a) => (
          <AchievementTile key={a.label} value={a.value} label={a.label} accent={a.accent} />
        ))}
      </div>

      <SectionHeader
        eyebrow="Learning"
        title="Currently Exploring"
        description="Technologies and concepts I'm actively studying."
      />

      <LiveTileSection />

      <ContactCard />
    </div>
  );
}