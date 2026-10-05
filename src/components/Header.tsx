import { useEffect, useState } from "react";
import CallButton from "./CallButton";
import { cx, Icon } from "./ui";

export const NAV = [
  { id: "levels", label: "Levels of Care" },
  { id: "insurance", label: "Insurance" },
  { id: "why", label: "Why NuView" },
  { id: "facility", label: "Facility" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

const LOGO_SRC =
  "https://raw.githubusercontent.com/Binec/newview-lp/main/src/assets/logoNiuviu.png";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <a href="#top" className="group inline-flex items-center" aria-label="NuView Treatment Center — home">
      <img
        src={LOGO_SRC}
        alt="NuView Treatment Center"
        className={cx(
          "h-9 w-auto max-w-[168px] object-contain object-left transition-opacity duration-300 sm:h-10 sm:max-w-[196px]",
          tone === "light" && "brightness-0 invert",
        )}
      />
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/95 shadow-[0_4px_30px_-16px_rgba(17,35,47,0.35)] backdrop-blur-md" : "bg-white/80 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-5 lg:px-8">
          <Logo />

          <div className="flex items-center gap-2">
            <CallButton className="hidden sm:inline-flex" />
            <a
              href="#verify"
              className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_10px_26px_-14px_rgba(26,131,121,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink md:inline-flex"
            >
              Verify Insurance
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <CallButton compact className="sm:hidden" />
            <a
              href="#verify"
              className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-ink md:hidden"
              aria-label="Verify insurance"
            >
              <Icon name="arrowRight" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div
          className="h-0.5 w-full origin-left bg-brand/90 transition-transform duration-150"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden="true"
        />
      </header>
    </>
  );
}