import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "../data";
import { Eyebrow, Icon, Reveal, SmartImg, cx } from "./ui";

const CAPTION =
  "A calm, home-like space in Los Angeles, purposefully designed to make it easier to focus on recovery.";

export default function Facility() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const lightboxTouchStartX = useRef<number | null>(null);
  const lightboxTouchStartY = useRef<number | null>(null);

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

  const nextLightbox = useCallback(() => {
    setOpen((o) => ((o ?? 0) + 1) % GALLERY.length);
  }, []);

  const prevLightbox = useCallback(() => {
    setOpen((o) => ((o ?? 0) - 1 + GALLERY.length) % GALLERY.length);
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

  // touch swipe handlers for lightbox popup
  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
    lightboxTouchStartY.current = e.touches[0].clientY;
  };

  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - lightboxTouchStartX.current;
    const deltaY = touchEndY - (lightboxTouchStartY.current ?? touchEndY);

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        nextLightbox();
      } else {
        prevLightbox();
      }
    }
    lightboxTouchStartX.current = null;
    lightboxTouchStartY.current = null;
  };

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
          <div className="hidden items-center gap-2 md:flex">
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
              className="no-scrollbar -mx-5 flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] lg:mx-0 lg:px-0"
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

            {/* mobile arrows + swipe hint */}
            <div className="mt-5 flex flex-col items-center gap-3 md:hidden">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous photo"
                  className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-ink transition-all duration-300 hover:border-brand hover:text-brand"
                >
                  <Icon name="chevronLeft" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Next photo"
                  className="grid h-11 w-11 place-items-center rounded-full border border-fog bg-white text-ink transition-all duration-300 hover:border-brand hover:text-brand"
                >
                  <Icon name="chevronRight" className="h-5 w-5" />
                </button>
              </div>
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

      {/* lightbox popup */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm touch-pan-y"
          role="dialog"
          aria-modal="true"
          aria-label={`Facility photo ${open + 1} of ${GALLERY.length}`}
          onClick={() => setOpen(null)}
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>

          {/* Desktop-only side arrow: Previous */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous photo"
            className="absolute left-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 md:grid"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>

          {/* Popup content */}
          <figure
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY[open]}
              alt={`Inside the NuView Treatment Center facility, photo ${open + 1}`}
              draggable={false}
              className="mx-auto max-h-[65vh] w-auto select-none rounded-2xl object-contain shadow-2xl sm:max-h-[74vh]"
            />

            <figcaption className="mt-4 flex w-full flex-col items-center gap-3 text-[13.5px] text-fog md:flex-row md:justify-between">
              <span className="max-w-xl text-center md:text-left">{CAPTION}</span>

              {/* Desktop counter */}
              <span className="hidden tabular-nums text-white/80 md:inline">
                {open + 1} / {GALLERY.length}
              </span>

              {/* Mobile-only controls: Arrows on bottom of text with counter */}
              <div className="flex flex-col items-center gap-2 pt-1 md:hidden">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    aria-label="Previous photo"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white active:bg-white/20"
                  >
                    <Icon name="chevronLeft" className="h-5 w-5" />
                  </button>
                  <span className="tabular-nums text-xs font-medium text-white/90">
                    {open + 1} / {GALLERY.length}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    aria-label="Next photo"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white active:bg-white/20"
                  >
                    <Icon name="chevronRight" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Desktop-only side arrow: Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next photo"
            className="absolute right-6 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 md:grid"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
