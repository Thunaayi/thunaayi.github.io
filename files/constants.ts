import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

import { useMemo } from "react";

import type { MetroTheme, TileKey } from "./theme";
import { useTheme } from "@/app/components/ThemeProvider";

export type TileSize = "medium" | "wide" | "large" | "hero";

export type MetroIconName =
  | "case-study"
  | "profile"
  | "experience"
  | "stack"
  | "testimonials"
  | "contact"
  | "github"
  | "linkedin"
  | "sandbox"
  | "case-study-pastel"
  | "profile-pastel"
  | "experience-pastel"
  | "stack-pastel"
  | "testimonials-pastel"
  | "contact-pastel"
  | "github-pastel"
  | "linkedin-pastel"
  | "sandbox-pastel"
  | "case-study-neon"
  | "profile-neon"
  | "experience-neon"
  | "stack-neon"
  | "testimonials-neon"
  | "contact-neon"
  | "github-neon"
  | "linkedin-neon"
  | "sandbox-neon"
  | "case-study-solar"
  | "profile-solar"
  | "experience-solar"
  | "stack-solar"
  | "testimonials-solar"
  | "contact-solar"
  | "github-solar"
  | "linkedin-solar"
  | "sandbox-solar"
  | "case-study-glass"
  | "profile-glass"
  | "experience-glass"
  | "stack-glass"
  | "testimonials-glass"
  | "contact-glass"
  | "github-glass"
  | "linkedin-glass"
  | "sandbox-glass"
  | "case-study-orchid"
  | "profile-orchid"
  | "experience-orchid"
  | "stack-orchid"
  | "testimonials-orchid"
  | "contact-orchid"
  | "github-orchid"
  | "linkedin-orchid"
  | "sandbox-orchid"
  | "case-study-retro"
  | "profile-retro"
  | "experience-retro"
  | "stack-retro"
  | "testimonials-retro"
  | "contact-retro"
  | "github-retro"
  | "linkedin-retro"
  | "sandbox-retro"
  | "instagram-retro"
  | "case-study-metro"
  | "profile-metro"
  | "experience-metro"
  | "stack-metro"
  | "testimonials-metro"
  | "contact-metro"
  | "github-metro"
  | "linkedin-metro"
  | "sandbox-metro"
  | "instagram-metro"
  | "instagram"
  | "instagram-pastel"
  | "instagram-neon"
  | "instagram-solar"
  | "instagram-glass"
  | "instagram-orchid"
  | "video"
  | "video-pastel"
  | "video-neon"
  | "video-solar"
  | "video-glass"
  | "video-orchid"
  | "video-retro"
  | "video-metro";

export type TileDefinition = {
  key: TileKey;
  title: string;
  description?: string;
  size: TileSize;
  href?: string;
  order?: number;
};

export type TileData = TileDefinition & {
  color: string;
  contrast: "light" | "dark";
  icon: MetroIconName;
};

export function resolveTile(theme: MetroTheme, definition: TileDefinition): TileData {
  const key = definition.key;
  return {
    ...definition,
    color: theme.tilePalette[key],
    contrast: theme.tileContrasts[key],
    icon: theme.tileIcons[key],
  };
}

export function resolveTiles(theme: MetroTheme, definitions: TileDefinition[]): TileData[] {
  return definitions.map((definition) => resolveTile(theme, definition));
}

export function useTiles(): TileData[] {
  const { theme } = useTheme();
  return useMemo(() => resolveTiles(theme, HOME_TILES), [theme]);
}

// Down from 10 tiles to 8. Instagram and video editing are gone from the
// main grid since they compete with "full stack developer" as your headline.
// Testimonials is gone since we don't have a real, attributable quote yet.
export const HOME_TILES: TileDefinition[] = [
  {
    key: "lms",
    title: "Projects",
    description: "Case studies & code",
    size: "large",
    href: "/projects",
    order: 1,
  },
  {
    key: "profile",
    title: "Profile",
    description: "Intro & mission",
    size: "medium",
    href: "/about",
    order: 2,
  },
  {
    key: "stack",
    title: "Tech Stack",
    description: "Tools of choice",
    size: "medium",
    href: "/skills",
    order: 3,
  },
  {
    // Reusing the "testimonials" key on purpose. It already has a color and
    // icon defined across all seven theme variants in theme.ts, so this
    // renders correctly today. Swap in a real "resume" key later if you
    // want a dedicated document icon, that's a theme.ts change, not urgent.
    key: "testimonials",
    title: "Resume",
    description: "Download PDF",
    size: "medium",
    href: "/resume",
    order: 4,
  },
  {
    key: "contact",
    title: "Contact",
    description: "Let’s collaborate",
    size: "medium",
    href: "/contact",
    order: 5,
  },
  {
    key: "github",
    title: "GitHub",
    description: "Latest repos",
    size: "medium",
    href: "https://github.com/thunaayi",
    order: 6,
  },
  {
    key: "linkedin",
    title: "LinkedIn",
    description: "Professional work",
    size: "medium",
    href: "https://www.linkedin.com/in/aimalasim/",
    order: 7,
  },
  {
    key: "sandbox",
    title: "Sandbox",
    description: "Experiments",
    size: "medium",
    href: "/projects#sandbox",
    order: 8,
  },
];

export const tileSizeClasses: Record<TileSize, string> = {
  medium: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
  hero: "col-span-2 md:col-span-4 row-span-2",
};

export const titleClasses: Record<TileSize, string> = {
  medium: "text-[7px] font-semibold uppercase tracking-[0.5em]",
  wide: "text-[7px] font-semibold uppercase tracking-[0.5em]",
  large: "text-[7px] font-semibold uppercase tracking-[0.5em]",
  hero: "text-[10px] font-semibold uppercase tracking-[0.5em]",
};

export const descriptionClasses: Record<TileSize, string> = {
  medium: "text-[7px] font-medium uppercase tracking-[0.35em]",
  wide: "text-[7px] font-medium uppercase tracking-[0.35em]",
  large: "text-[7px] font-medium uppercase tracking-[0.35em]",
  hero: "text-[8px] font-medium uppercase tracking-[0.35em]",
};

// Heads up: this PROJECTS export still points at data/projects.json, a
// second, unused copy of your project data with the old placeholder text.
// The real projects page imports from data/projects.ts directly instead.
// Worth checking if anything else in the app actually reads PROJECTS from
// here, and deleting projects.json if nothing does. Two sources of truth
// for the same content is how stale placeholder text sneaks back in later.
export const PROJECTS = projects;
export const SKILLS = skills;
