import { useRef, useState } from "react";
import { LEVELS } from "../data";
import CallButton from "./CallButton";
import { Eyebrow, Icon, Reveal, SmartImg, cx } from "./ui";

function ListIcon() {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      aria-hidden="true"
      className="mt-1 h-3.5 w-2.5 shrink-0"
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

export default function Levels() {
  const [tab, setTab] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const level = LEVELS[tab];

  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = (tab + (e.key === "ArrowRight" ? 1 : LEVELS.length - 1)) % LEVELS.length;
      setTab(next);
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <section id="levels" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Levels of care</Eyebrow>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[40px]">
            Choose The Right Level Of Support For Your Needs
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-relaxed text-steel">
            Every level of care is available in person in Los Angeles or virtually, with afternoon and
            evening programming so treatment works around your life.
          </p>
        </Reveal>

        {/* -------- tabs -------- */}
        <Reveal delay={220} className="mt-10">
          <div
            role="tablist"
            aria-label="Levels of care"
            onKeyDown={onTabKey}
            className="mx-auto flex max-w-2xl gap-2 rounded-2xl bg-cloud p-2"
          >
            {LEVELS.map((l, i) => (
              <button
                key={l.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`tab-${l.id}`}
                aria-selected={i === tab}
                aria-controls={`panel-${l.id}`}
                tabIndex={i === tab ? 0 : -1}
                onClick={() => setTab(i)}
                className={cx(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-[14.5px] font-semibold transition-all duration-300",
                  i === tab
                    ? "bg-white text-ink shadow-[0_10px_24px_-16px_rgba(17,35,47,0.6)]"
                    : "text-steel hover:text-ink",
                )}
              >
                <Icon name={l.icon} className={cx("h-4 w-4", i === tab ? "text-brand" : "text-fog")} />
                {l.short}
              </button>
            ))}
          </div>
        </Reveal>

        {/* -------- panel -------- */}
        <Reveal delay={360} from="fade">
        <div
          role="tabpanel"
          id={`panel-${level.id}`}
          aria-labelledby={`tab-${level.id}`}
          className="mt-8 overflow-hidden rounded-[28px] border border-cloud bg-white shadow-[0_30px_70px_-50px_rgba(17,35,47,0.6)]"
        >
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <SmartImg
              key={level.id}
              src={level.image}
              alt={`${level.title} at NuView Treatment Center`}
              className="h-56 w-full sm:h-72 lg:h-auto lg:min-h-[420px]"
            />
            <div key={`${level.id}-c`} className="p-6 sm:p-9 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
                <Icon name={level.icon} className="h-3.5 w-3.5" />
                {level.tagline}
              </span>
              <h3 className="mt-4 text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
                {level.title}
              </h3>
              <p className="mt-3.5 text-[16px] leading-relaxed text-steel">{level.body}</p>

              <ul className="mt-6 space-y-3">
                {level.details.map((d) => (
                  <li key={d.label} className="flex items-start gap-3">
                    <ListIcon />
                    <p className="text-[14px] leading-relaxed text-steel">
                      <span className="font-medium text-ink">{d.label}:</span>{" "}
                      {d.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </Reveal>

        {/* -------- banner -------- */}
        <Reveal delay={280} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-5 rounded-[26px] bg-mint px-6 py-4.5 sm:flex-row sm:px-8 sm:py-5">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-sm">
                <Icon name="clipboard" className="h-5 w-5" />
              </span>
              <p className="text-[14.5px] leading-relaxed text-ink sm:text-[15.5px]">
                <strong className="font-semibold text-ink">Not sure which level fits?</strong> Our team will assess you at no cost and recommend the right program.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#verify"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(26,131,121,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink hover:shadow-[0_14px_30px_-10px_rgba(17,35,47,0.7)]"
              >
                <Icon name="shield" className="h-4 w-4 shrink-0" />
                <span>Verify Insurance Now</span>
              </a>
              <CallButton className="bg-white" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
