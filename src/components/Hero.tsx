import { BENEFITS, IMG, PHONE } from "../data";
import CallButton from "./CallButton";
import { Btn, Icon, Reveal, Stars } from "./ui";

function ListIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      aria-hidden="true"
      className="h-3.5 w-2.5 shrink-0"
    >
      <path
        d="M9.99997 6.99999C9.99997 6.58098 9.84104 6.15975 9.52097 5.83998L4.93627 1.25945C4.29613 0.619897 3.25867 0.619897 2.61853 1.25945C1.97839 1.899 1.97839 2.93552 2.61853 3.57508L4.84135 5.79587C6.04216 6.99779 4.84135 8.20412 4.84135 8.20412L2.61853 10.4249C1.97839 11.0645 1.97839 12.101 2.61853 12.7405C3.25867 13.3801 4.29613 13.3801 4.93627 12.7405L9.52097 8.16001C9.84104 7.84024 10.0022 7.41901 9.99997 6.99999Z"
        fill="#1C837A"
      />
      <path
        d="M1.60476 8.54839C2.49104 8.54839 3.20951 7.83057 3.20951 6.94509C3.20951 6.05962 2.49104 5.3418 1.60476 5.3418C0.718474 5.3418 0 6.05962 0 6.94509C0 7.83057 0.718474 8.54839 1.60476 8.54839Z"
        fill="#1C837A"
      />
    </svg>
  );
}

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
            <Reveal>
              <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[46px] lg:text-[54px]">
                Outpatient Treatment Center
                <span className="mt-1 block font-display text-[38px] italic leading-[1.1] text-brand sm:text-[54px] lg:text-[62px]">
                  PHP &amp; IOP
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
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

            <Reveal delay={420}>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {BENEFITS.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-[14.5px] text-ink">
                    <ListIcon />
                    <span className="leading-snug">{b.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={640}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Btn href="#verify" size="lg" className="w-full sm:w-auto">
                  <Icon name="shield" className="h-4 w-4" />
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
          <Reveal delay={500} from="right">
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
            <Reveal key={t.label} delay={i * 140} className="flex items-center gap-3">
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
