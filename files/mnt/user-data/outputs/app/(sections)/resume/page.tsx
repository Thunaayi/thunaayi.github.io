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
          {/*
            Add the actual PDF to /public/resume.pdf before this link works.
            Keep the file and the text on this page in sync, don't let them
            drift into two different versions of your experience.
          */}
        </div>
      }
    >
      <div className="space-y-12 text-white/80">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Experience
          </h2>
          <div className="h-1 w-12 bg-(--metro-accent)" />

          <div className="space-y-3">
            <p className="font-semibold text-white/90">Full Stack Developer — BlackMode</p>
            <ul className="list-disc space-y-2 pl-5 text-white/70">
              <li>
                Solely designed and built ExamExpert, a full stack learning management system covering course structure, question banks, real-time timed exams, and flashcard review, using React, Redux, Node.js, Express, MongoDB, and Socket.IO.
              </li>
              <li>
                Implemented JWT based authentication and role based access control for students, teachers, and administrators.
              </li>
              <li>
                Set up continuous deployment through Coolify, so every push to main ships to production automatically, no manual deploy steps.
              </li>
              <li>
                Load tested the platform locally with k6. [ADD YOUR REAL NUMBERS HERE: concurrent virtual users tested, requests per second, average response time. Pull these from your actual k6 run, don&apos;t estimate.]
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <p className="font-semibold text-white/90">Freelance Full Stack Developer — Independent</p>
            <ul className="list-disc space-y-2 pl-5 text-white/70">
              <li>
                Built AceMrcem, a medical exam preparation platform for MRCEM candidates, for client Umair Ali, using React, TypeScript, Express, MongoDB, and Docker.
              </li>
              <li>
                Implemented rich media question banks, high fidelity timed exam simulations, and IP based activity logging for exam integrity.
              </li>
              <li>
                Integrated PayFast for client payment processing.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Skills
          </h2>
          <div className="h-1 w-12 bg-(--metro-accent)" />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-white/70 sm:grid-cols-3">
            <span>React / Redux</span>
            <span>Node.js / Express</span>
            <span>MongoDB</span>
            <span>Socket.IO</span>
            <span>TypeScript</span>
            <span>JWT / Google OAuth</span>
            <span>Docker</span>
            <span>CapRover / Coolify</span>
            <span>REST API design</span>
            <span>PayFast integration</span>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/90">
            Education
          </h2>
          <div className="h-1 w-12 bg-(--metro-accent)" />
          <p className="text-white/70">
            PSDC development bootcamp. High school diploma.
          </p>
        </section>
      </div>
    </SectionLayout>
  );
}
