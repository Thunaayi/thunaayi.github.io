"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  label: string;
  accent: "blue" | "teal" | "green" | "amber" | "purple";
};

const accentClasses: Record<string, string> = {
  blue: "text-[var(--accent-blue)]",
  teal: "text-[var(--accent-teal)]",
  green: "text-[var(--accent-green)]",
  amber: "text-[var(--accent-amber)]",
  purple: "text-[var(--accent-purple)]",
};

export function CountUp({ value, accent }: { value: string; accent: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const numeric = parseInt(value.replace(/\D/g, ""), 10);
          if (isNaN(numeric)) {
            setDisplayed(value);
            return;
          }

          let start = 0;
          const duration = 1200;
          const steps = 30;
          const increment = Math.ceil(numeric / steps);
          const interval = setInterval(() => {
            start += increment;
            if (start >= numeric) {
              setDisplayed(value);
              clearInterval(interval);
            } else {
              setDisplayed(`${start}${value.includes("+") ? "+" : ""}`);
            }
          }, duration / steps);

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref} className={accentClasses[accent] || ""}>{displayed}</span>;
}

type AchievementTileProps = {
  value: string;
  label: string;
  accent: string;
};

export function AchievementTile({ value, label, accent }: AchievementTileProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[var(--card-radius)] border px-4 py-5 text-center transition-all duration-200 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--bg-tile)", borderColor: "rgba(232,234,237,0.08)" }}
    >
      <span className="text-3xl font-bold leading-none tracking-tight md:text-4xl">
        <CountUp value={value} accent={accent} />
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.12em]" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
    </div>
  );
}