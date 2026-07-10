"use client";

import { useEffect, useRef, useState } from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
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
      className="col-span-full mb-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      {eyebrow && (
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: "var(--accent-blue)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      {description && (
        <p className="mt-1 max-w-[60ch] text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      )}
    </div>
  );
}