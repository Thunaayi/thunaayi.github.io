import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";

export default function ContactPage() {
  return (
    <SectionLayout
      kicker="Reach out"
      title="Contact"
      description="Let’s talk about what you’re building and how I can help. Async notes or live working sessions both welcome."
      tileKey="contact"
      aside={
        <div className="space-y-2 text-sm text-white/70">
          <p>Prefer async? Drop a note and I’ll reply within two business days.</p>
          <p className="text-white/50">Open for collaborations, audits, and guest talks.</p>
        </div>
      }
    >
      <div className="route-card route-card--contact">
        <form
          action="https://formspree.io/f/xpqjzdqz"
          method="POST"
          className="route-form"
        >
          <div className="route-form__grid">
            <label className="route-form__field">
              <span>Name</span>
              <input name="name" type="text" placeholder="Ada Lovelace" required />
            </label>
            <label className="route-form__field">
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label className="route-form__field">
            <span>What should we explore?</span>
            <textarea name="message" rows={4} placeholder="Tell me about your product, team, or goals." required />
          </label>
          <div className="route-form__footer">
            <button type="submit" className="route-card__cta route-card__cta--button group">
              <span>Send message</span>
              <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <Link href="mailto:aimalasim92@gmail.com" className="route-card__link">
              Prefer email? aimalasim92@gmail.com
            </Link>
          </div>
        </form>
      </div>
    </SectionLayout>
  );
}
