import { SectionLayout } from "@/app/components/SectionLayout";

export default function AboutPage() {
  return (
    <SectionLayout
      kicker="Profile"
      title="About"
      description="I build stuff for the web. Fast, functional, and sometimes pretty cool."
      tileKey="profile"
      aside={
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Currently</p>
            <p className="text-white/80">Full Stack & UI Dev</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Based in</p>
            <p className="text-white/80">Karachi, Pakistan</p>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        <div className="space-y-6 text-base leading-relaxed text-white/75">
          <p>
            Hi, I&apos;m Aimal. I build web apps that are fast, functional, and look good. No fluff, just clean code and solid user experiences.
          </p>
          <p>
            I taught myself the MERN stack and built ExamExpert, a full production learning platform, on my own at BlackMode. I run the auto deploy pipeline myself, handle the backend architecture myself, and I&apos;ve carried that same ownership into freelance client work like AceMrcem, a medical exam prep platform.
          </p>
          <p>
            No computer science degree. High school and a development bootcamp, then straight into building things people actually use. I&apos;d rather show you the working platform than talk about a diploma.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m probably checking out new tech, tweaking my setup, or building something just for fun.
          </p>
        </div>
      </div>
    </SectionLayout>
  );
}
