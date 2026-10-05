import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "../data";
import { Eyebrow, Icon, Reveal, SmartImg, cx } from "./ui";

const CAPTION =
  "A calm, home-like space in Los Angeles, purposefully designed to make it easier to focus on recovery.";

export default function Facility() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const goTo = useCallback((i: number) => {
    const clamped = (i + GALLERY.length) % GALLERY.length;
    setIndex(clamped);
    const track = trackRef.current;
    if (track) {
      const child = track.children[clamped] as HTMLElement | undefined;
      if (child) {
        track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const kids = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        kids.forEach((k, i) => {
          const d = Math.abs(k.offsetLeft + k.clientWidth / 2 - center);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setIndex(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // lightbox keyboard + scroll lock
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => ((o ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setOpen((o) => ((o ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section id="facility" className="relative bg-cloud py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Take a look inside</Eyebrow>
            <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[40px]">
              Explore <span className="text-brand">Our Facility</span>
            </h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-steel">
              {CAPTION} Select any photo to view it larger.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={260} from="fade" className="mt-9">
          <div className="relative">
            <div
              ref={trackRef}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 lg:mx-0 lg:px-0"
              role="group"
              aria-label="Facility photo gallery"
            >
              {GALLERY.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open facility photo ${i + 1} of ${GALLERY.length}`}
                  className={cx(
                    "group relative shrink-0 snap-start overflow-hidden rounded-3xl transition-all duration-300",
                    i === 0
                      ? "h-[240px] w-[78%] sm:h-[330px] sm:w-[58%] lg:h-[400px] lg:w-[46%]"
                      : "h-[240px] w-[78%] sm:h-[330px] sm:w-[36%] lg:h-[400px] lg:w-[27%]",
                  )}
                >
                  <SmartImg
                    src={src}
                    alt={`Inside the NuView Treatment Center facility, photo ${i + 1}`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View larger
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>

            {/* dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  aria-current={i === index}
                  className={cx(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-7 bg-brand" : "w-2 bg-fog hover:bg-brand/50",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Facility photo ${open + 1} of ${GALLERY.length}`}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => ((o ?? 0) - 1 + GALLERY.length) % GALLERY.length);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 sm:left-6"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>

          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[open]}
              alt={`Inside the NuView Treatment Center facility, photo ${open + 1}`}
              className="mx-auto max-h-[76vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13.5px] text-fog">
              <span className="max-w-xl">{CAPTION}</span>
              <span className="tabular-nums text-white/80">
                {open + 1} / {GALLERY.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => ((o ?? 0) + 1) % GALLERY.length);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 sm:right-6"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
