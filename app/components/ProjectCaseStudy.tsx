type CaseStudy = {
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h4>
      <div className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--accent-blue)" }}>▹</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="grid gap-5 p-5 md:gap-6 md:p-6">
      <Section title="Overview">{caseStudy.overview}</Section>
      <Section title="Problem">{caseStudy.problem}</Section>
      <Section title="My Role">{caseStudy.myRole}</Section>

      <Section title="Architecture">{caseStudy.architecture}</Section>

      <div>
        <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Tech Stack
        </h4>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {caseStudy.techStack.map((t) => (
            <span
              key={t}
              className="rounded px-2 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-secondary)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <Section title="Challenges">
        <List items={caseStudy.challenges} />
      </Section>

      <Section title="Solutions">
        <List items={caseStudy.solutions} />
      </Section>

      <Section title="Performance Improvements">
        <List items={caseStudy.performance} />
      </Section>

      <Section title="Deployment">{caseStudy.deployment}</Section>

      <Section title="Lessons Learned">
        <List items={caseStudy.lessonsLearned} />
      </Section>
    </div>
  );
}