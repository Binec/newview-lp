import { useEffect, useState } from "react";
import { ADDRESS } from "../data";
import CallButton from "./CallButton";
import { NAV, Logo } from "./Header";
import { Icon, cx } from "./ui";

export function StickyCTA() {
  return (
    <CallButton className="fixed bottom-5 right-5 z-40 bg-white lg:hidden">
      Call Now
    </CallButton>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cx(
        "fixed bottom-8 right-5 z-40 hidden h-12 w-12 place-items-center rounded-full border border-brand/25 bg-white text-brand shadow-[0_18px_40px_-20px_rgba(17,35,47,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-white lg:grid",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Icon name="arrowUp" className="h-5 w-5" />
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-fog lg:pb-16">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed">
              A premier outpatient treatment center in Los Angeles offering flexible PHP, IOP and
              virtual care built around your life.
            </p>
            <CallButton className="mt-6 bg-white" />
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-mint">
              On this page
            </h3>
            <ul className="mt-5 space-y-3 text-[14.5px]">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-mint">
              Visit us
            </h3>
            <ul className="mt-5 space-y-4 text-[14.5px]">
              <li className="flex gap-3">
                <Icon name="mapPin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-mint" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-mint" />
                <span>Admissions line open 7 days a week</span>
              </li>
              <li className="flex gap-3">
                <Icon name="laptop" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-mint" />
                <span>In-person &amp; virtual appointments</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/12 pt-8">
          <p className="text-[12.5px] leading-relaxed text-fog/80">
            Please note: we do not accept Medicaid, Medicare, or Kaiser. Insurance may cover 100% of
            the costs associated with treatment. If you are experiencing a medical emergency or are in
            immediate danger, call 911 or go to your nearest emergency room.
          </p>
          <p className="mt-5 text-[12.5px] text-fog/70">
            &copy; {new Date().getFullYear()} NuView Treatment Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
