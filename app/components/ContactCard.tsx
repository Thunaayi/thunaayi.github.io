import profile from "@/data/profile.json";

export function ContactCard() {
  const { social } = profile;

  const links = [
    { href: `mailto:${social.email}`, label: "Email", icon: "✉" },
    { href: social.github, label: "GitHub", icon: "◉" },
    { href: social.linkedin, label: "LinkedIn", icon: "▣" },
  ];

  return (
    <div
      className="col-span-full flex flex-col items-center gap-4 rounded-[var(--card-radius)] p-6 text-center md:p-8"
      style={{ backgroundColor: "var(--bg-card)", border: "var(--border-subtle)" }}
    >
      <h2 className="text-lg font-bold tracking-tight md:text-xl" style={{ color: "var(--text-primary)" }}>
        Let&apos;s build something together
      </h2>
      <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        I&apos;m currently open to full-time opportunities. If you have a project, a team to build, or just want to connect, reach out.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[var(--card-radius)] px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "var(--bg-tile)", color: "var(--text-primary)" }}
          >
            <span>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--accent-green)" }}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: "var(--accent-green)" }} />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent-green)" }} />
        </span>
        Available for opportunities
      </div>
    </div>
  );
}