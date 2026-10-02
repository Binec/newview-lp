import { useState } from "react";
import { INSURERS } from "../data";
import CallButton from "./CallButton";
import { Btn, Eyebrow, Reveal } from "./ui";

function LogoTile({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex h-[86px] w-[168px] shrink-0 items-center justify-center rounded-2xl border border-cloud bg-white px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_18px_36px_-24px_rgba(17,35,47,0.5)]">
      {failed ? (
        <span className="text-[15px] font-semibold tracking-tight text-ink">{name}</span>
      ) : (
        <img
          src={logo}
          alt={`${name} insurance logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="max-h-[52px] w-auto max-w-full object-contain"
        />
      )}
    </div>
  );
}

export default function Insurance() {
  return (
    <section id="insurance" className="relative overflow-hidden bg-mint py-20 lg:py-28">
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1280px] px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[40px]">
            We Accept Most <span className="text-brand">Insurance Policies</span>
          </h2>
          <p className="mt-5 text-[16.5px] leading-relaxed text-steel">
            <strong className="font-semibold text-ink">
              Insurance may cover 100% of the costs associated with treatment.
            </strong>{" "}
            We work with most major insurance providers for your convenience.
          </p>
        </Reveal>

        {/* Insurance provider logos */}
        <div className="mt-10">
          <div className="marquee-mask marquee-paused overflow-hidden">
            <div className="marquee-track flex w-max gap-4" style={{ animation: "var(--animate-marquee)" }}>
              {[...INSURERS, ...INSURERS].map((ins, i) => (
                <LogoTile key={`${ins.name}-${i}`} {...ins} />
              ))}
            </div>
          </div>
        </div>

        {/* notes */}
        <Reveal delay={60} className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-6 text-center shadow-[0_24px_50px_-40px_rgba(17,35,47,0.6)] sm:p-8">
            <p className="text-[15.5px] leading-relaxed text-ink">
              Don&rsquo;t see your insurance? Give us a call; we accept many plans not listed here,
              including employer-sponsored plans.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Btn href="#verify">Verify Insurance Now</Btn>
              <CallButton />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
