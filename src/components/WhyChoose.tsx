import { FEATURES, IMG } from "../data";
import { Btn, Eyebrow, Icon, Reveal, SmartImg } from "./ui";

const HIGHLIGHTS = [
  { value: "Free", label: "Confidential assessment" },
  { value: "Same-day", label: "Admissions available" },
  { value: "30 min", label: "Insurance verification" },
];

export default function WhyChoose() {
  return (
    <section id="why" className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-brand/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sky/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* image column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal from="left">
              <div className="relative mx-auto max-w-[420px]">
                <div className="absolute -inset-3 rounded-[32px] border border-white/12" aria-hidden="true" />
                <SmartImg
                  src={IMG.why}
                  alt="A NuView clinician leading a virtual therapy session on a laptop"
                  className="aspect-[3/4] w-full rounded-[26px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
                />
                <div className="absolute -bottom-6 -right-3 w-[190px] rounded-2xl bg-white p-4 text-ink shadow-[0_28px_60px_-30px_rgba(0,0,0,0.7)] sm:-right-6">
                  <Icon name="laptop" className="h-5 w-5 text-brand" />
                  <p className="mt-2 text-[13.5px] font-semibold leading-snug">
                    In-person &amp; virtual options
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-steel">
                    Afternoon and evening programming
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* content column */}
          <div>
            <Reveal from="right">
              <Eyebrow tone="light">Why NuView</Eyebrow>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[40px]">
                Why Choose <span className="font-display italic text-mint">NuView?</span>
              </h2>
              <p className="mt-4 max-w-xl text-[16.5px] leading-relaxed text-fog">
                Real Results, Real Support &mdash; whole-person care that treats the root causes, not
                just the symptoms, and keeps your life running while you heal.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={120 + i * 140}
                  className={i === 0 ? "sm:col-span-2" : ""}
                >
                  <article className="group h-full rounded-3xl border border-white/12 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:bg-white/8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-[0_14px_30px_-16px_rgba(26,131,121,1)] transition-transform duration-300 group-hover:scale-110">
                      <Icon name={f.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-[17.5px] font-semibold leading-snug">{f.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-fog">{f.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={320} className="mt-8">
              <div className="grid gap-4 rounded-3xl border border-white/12 bg-white/5 p-6 sm:grid-cols-3">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.label} className="text-center sm:text-left">
                    <p className="font-display text-[28px] italic leading-none text-lime">{h.value}</p>
                    <p className="mt-2 text-[13px] leading-snug text-fog">{h.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <Btn href="#verify" variant="white" size="lg">
                  Start with a free assessment
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
