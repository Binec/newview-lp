import { useState } from "react";
import { FAQS, PHONE } from "../data";
import CallButton from "./CallButton";
import { Eyebrow, Icon, Reveal, cx } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-mint py-20 lg:py-28">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[40px]">
            Everything people ask <span className="text-brand">before they call</span>
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-brand/12 overflow-hidden rounded-3xl border border-brand/15 bg-white">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 90}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cx(
                      "flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-200 hover:bg-mint/50 sm:px-7",
                      isOpen && "bg-mint/60",
                    )}
                  >
                    <span
                      className={cx(
                        "text-[16.5px] font-medium leading-snug transition-colors",
                        isOpen ? "text-brand" : "text-ink",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cx(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-fog text-steel",
                      )}
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-6 sm:px-7"
                >
                  <p className="max-w-3xl text-[15.5px] leading-relaxed text-steel">{f.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={240} className="mt-9 text-center">
          <p className="text-[15.5px] text-steel">Still have a question? We&rsquo;re happy to answer it.</p>
          <CallButton className="mt-4 bg-white">
            Call {PHONE}
          </CallButton>
        </Reveal>
      </div>
    </section>
  );
}
