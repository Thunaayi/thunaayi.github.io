"use client";

import { useEffect, useRef, useState } from "react";
import skillsData from "@/data/skills.json";

function SkillTile({ name }: { name: string }) {
  return (
    <span
      className="inline-block rounded-[var(--card-radius)] px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
      style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-secondary)" }}
    >
      {name}
    </span>
  );
}

function CategoryGroup({ category, items }: { category: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="col-span-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--accent-blue)" }}>
        {category}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <SkillTile key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}

export function SkillCategory() {
  const categories = skillsData as Record<string, string[]>;
  const entries = Object.entries(categories);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {entries.map(([category, items]) => (
        <CategoryGroup key={category} category={category} items={items} />
      ))}
    </div>
  );
}