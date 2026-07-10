"use client";

import { useEffect, useRef, useState } from "react";
import timelineData from "@/data/timeline.json";

type Milestone = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

function TimelineNode({ milestone, index, isLast }: { milestone: Milestone; index: number; isLast: boolean }) {
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex gap-4 pb-6 last:pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--card-radius)] text-xs font-bold"
          style={{ backgroundColor: "var(--accent-blue)", color: "#fff" }}
        >
          {milestone.year.slice(-2)}
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1" style={{ backgroundColor: "rgba(232,234,237,0.12)" }} />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-2">
        <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {milestone.title}
        </h4>
        <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--text-tertiary)" }}>
          {milestone.subtitle}
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {milestone.description}
        </p>
      </div>
    </div>
  );
}

export function Timeline() {
  const milestones = timelineData as Milestone[];

  return (
    <div className="py-1">
      {milestones.map((milestone, index) => (
        <TimelineNode
          key={milestone.year + milestone.title}
          milestone={milestone}
          index={index}
          isLast={index === milestones.length - 1}
        />
      ))}
    </div>
  );
}