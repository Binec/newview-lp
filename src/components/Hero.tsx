import { BENEFITS, IMG, PHONE } from "../data";
import CallButton from "./CallButton";
import { Btn, Icon, Reveal, Stars } from "./ui";

const TRUST = [
  { icon: "award", label: "Joint Commission Accredited" },
  { icon: "sparkle", label: "5-Star Rated Program" },
  { icon: "calendar", label: "Same-Day Admissions" },
  { icon: "lock", label: "Free, Confidential Assessment" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-mint pt-[104px] lg:pt-[128px]">
      {/* Full-bleed hero image stays at full opacity with no white wash. */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={IMG.hero}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-bottom opacity-100"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-10 pb-14 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24">
          {/* ---------------- copy ---------------- */}
          <div>
            <Reveal delay={70}>
              <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[54px]">
                Outpatient Treatment Center
                <span className="mt-1 block font-display text-[38px] italic leading-[1.1] text-brand sm:text-[54px] lg:text-[62px]">
                  PHP &amp; IOP
                </span>
              </h1>
            </Reveal>

            <Reveal delay={130}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-steel">
                <strong className="font-semibold text-ink">PHP</strong> is structured daytime
                treatment without overnight stays.{" "}
                <strong className="font-semibold text-ink">IOP</strong> is flexible part-time
                therapy that fits around work and daily life.
              </p>
              <p className="mt-3 max-w-xl text-[17px] font-medium leading-relaxed text-ink">
                Keep your job, maintain your responsibilities, and get the comprehensive support you
                need.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-[14.5px] text-ink">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/12 text-brand">
                      <Icon name={b.icon} className="h-4 w-4" />
                    </span>
                    <span className="leading-snug">{b.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Btn href="#verify" size="lg" className="w-full sm:w-auto">
                  Verify Insurance Now
                </Btn>
                <CallButton className="w-full bg-white sm:w-auto">
                  Call {PHONE}
                </CallButton>
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-steel">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="h-4 w-4 text-brand" />
                  Benefits verified in 30 minutes
                </span>
                <span className="hidden h-3 w-px bg-fog sm:block" />
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="lock" className="h-4 w-4 text-brand" />
                  100% confidential
                </span>
              </p>
            </Reveal>
          </div>

          {/* spacer: lets the photo show through on the right */}
          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        {/* floating social-proof card over the photo */}
        <div className="relative z-10 max-w-sm pb-14 lg:absolute lg:bottom-24 lg:right-8 lg:w-[310px] lg:max-w-none lg:pb-0">
          <Reveal delay={200}>
            <div className="animate-float rounded-2xl bg-white/95 p-5 shadow-[0_28px_60px_-30px_rgba(17,35,47,0.55)] backdrop-blur">
              <div className="flex items-center gap-2">
                <Stars className="h-3.5 w-3.5 text-peach" />
                <span className="text-[12.5px] font-semibold text-ink">Real journeys, real results</span>
              </div>
              <p className="mt-2 text-[14px] leading-snug text-steel">
                &ldquo;The therapy has changed my life for the better.&rdquo;
              </p>
              <p className="mt-1.5 text-[11.5px] font-medium uppercase tracking-wider text-fog">
                Mike R. &middot; Alumni
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* trust bar */}
      <div className="relative border-t border-brand/10 bg-white/75 backdrop-blur">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-5 px-5 py-6 lg:grid-cols-4 lg:px-8">
          {TRUST.map((t, i) => (
            <Reveal key={t.label} delay={i * 70} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon name={t.icon} className="h-5 w-5" />
              </span>
              <span className="text-[13.5px] font-medium leading-snug text-ink">{t.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
