import { SectionLayout } from "@/app/components/SectionLayout";

export default function ResumePage() {
  return (
    <SectionLayout
      kicker="Resume"
      title="Resume"
      description="Full stack developer, MERN stack, based in Karachi, Pakistan."
      tileKey="testimonials"
      aside={
        <div className="space-y-4 text-sm">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full bg-(--metro-accent) px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-90"
          >
            Download PDF
          </a>
        </div>
      }
    >
      <div className="space-y-12 text-white/80">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Experience
          </h2>
          <div className="h-1 w-12 rounded-full bg-(--metro-accent)" />

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
            <p className="font-semibold text-white/90">Full Stack Developer — BlackMode</p>
            <ul className="space-y-3 text-white/70">
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Solely designed and built ExamExpert, a full stack learning management system covering course structure, question banks, real-time timed exams, and flashcard review, using React, Redux, Node.js, Express, MongoDB, and Socket.IO.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Implemented JWT based authentication and role based access control for students, teachers, and administrators.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Set up continuous deployment through Coolify, so every push to main ships to production automatically, no manual deploy steps.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Load tested the platform locally with k6. [ADD YOUR REAL NUMBERS HERE: concurrent virtual users tested, requests per second, average response time. Pull these from your actual k6 run, don&apos;t estimate.]
              </li>
            </ul>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
            <p className="font-semibold text-white/90">Freelance Full Stack Developer — Independent</p>
            <ul className="space-y-3 text-white/70">
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Built AceMrcem, a medical exam preparation platform for MRCEM candidates, for client Umair Ali, using React, TypeScript, Express, MongoDB, and Docker.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Implemented rich media question banks, high fidelity timed exam simulations, and IP based activity logging for exam integrity.
              </li>
              <li className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/60">
                Integrated PayFast for client payment processing.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Skills
          </h2>
          <div className="h-1 w-12 rounded-full bg-(--metro-accent)" />
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-white/70 sm:grid-cols-3">
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">React / Redux</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">Node.js / Express</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">MongoDB</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">Socket.IO</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">TypeScript</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">JWT / Google OAuth</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">Docker</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">CapRover / Coolify</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">REST API design</span>
              <span className="flex items-center gap-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-(--metro-accent)/40">PayFast integration</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Education
          </h2>
          <div className="h-1 w-12 rounded-full bg-(--metro-accent)" />
          <p className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-4 text-white/70 backdrop-blur-sm">
            PSDC development bootcamp. High school diploma.
          </p>
        </section>
      </div>
    </SectionLayout>
  );
}
