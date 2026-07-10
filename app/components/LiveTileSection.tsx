"use client";

import { useEffect, useState } from "react";
import learningData from "@/data/learning.json";

type LearningItem = {
  label: string;
  description: string;
};

export function LiveTileSection() {
  const items = learningData as LearningItem[];
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        setAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  const item = items[current];

  return (
    <div
      className="col-span-full flex flex-wrap items-center justify-center gap-3 rounded-[var(--card-radius)] p-4 md:gap-4 md:p-5"
      style={{ backgroundColor: "var(--bg-card)", border: "var(--border-subtle)" }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--text-tertiary)" }}>
        Currently focusing on
      </span>
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(-6px)" : "translateY(0)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <span
          className="inline-block rounded-[var(--card-radius)] px-3 py-1.5 text-sm font-semibold"
          style={{ backgroundColor: "var(--accent-rose)", color: "#fff" }}
        >
          {item?.label}
        </span>
      </div>
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(-6px)" : "translateY(0)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          transitionDelay: "0.05s",
        }}
      >
        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {item?.description}
        </span>
      </div>
    </div>
  );
}