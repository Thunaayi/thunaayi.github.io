"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { msg: "Resolving hash target...", duration: 200 },
  { msg: "Mounting interface...", duration: 250 },
  { msg: "Binding input handlers...", duration: 200 },
  { msg: "Starting session...", duration: 300 },
  { msg: "Reached target Portfolio Online", final: true },
];

type Props = {
  onBootComplete: (target: string | null) => void;
};

export function BootScreen({ onBootComplete }: Props) {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem("boot-completed");
    if (alreadyBooted) {
      const hash = window.location.hash.replace("#", "") || null;
      onBootComplete(hash);
      setHidden(true);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    function showNext(i: number) {
      if (cancelled) return;
      setVisibleSteps(i + 1);
      const step = STEPS[i];
      if (step.final) {
        sessionStorage.setItem("boot-completed", "true");
        timer = setTimeout(() => {
          if (cancelled) return;
          setDone(true);
          timer = setTimeout(() => {
            if (cancelled) return;
            const hash = window.location.hash.replace("#", "") || null;
            onBootComplete(hash);
            setHidden(true);
          }, 400);
        }, 500);
      } else {
        timer = setTimeout(() => showNext(i + 1), step.duration);
      }
    }

    showNext(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [onBootComplete]);

  if (hidden) return null;

  return (
    <div className={`boot-overlay${done ? " boot-overlay--hidden" : ""}`}>
      <div className="boot-box">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`boot-line${i < visibleSteps ? " boot-line--visible" : ""}`}
          >
            <span className={`boot-status ${step.final ? "boot-status--ok" : "boot-status--ok"}`}>
              [  {i < visibleSteps ? "OK" : "  "}  ]
            </span>
            <span className={`boot-message${step.final ? " boot-message--highlight" : ""}`}>
              {step.msg}
            </span>
            {i === visibleSteps - 1 && !step.final && (
              <span className="boot-cursor" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
