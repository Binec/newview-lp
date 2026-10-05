import { useEffect, useMemo, useRef, useState } from "react";
import { REVIEWS } from "../data";
import { Btn, Eyebrow, Icon, Reveal, Stars, cx } from "./ui";

const INTERVAL_MS = 5000;
const DESKTOP_MQ = "(min-width: 1024px)";

function chunk<T>(arr: T[], size: number) {
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages;
}

function ReviewCard({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-cloud bg-white p-7">
      <div className="flex items-center justify-between">
        <Stars className="h-4 w-4 text-peach" />
        <span className="select-none font-display text-[42px] leading-none text-mint" aria-hidden="true">
          &rdquo;
        </span>
      </div>
      <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink">{r.quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-cloud pt-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/12 text-[15px] font-semibold text-brand">
          {r.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <span>
          <span className="block text-[15px] font-semibold text-ink">{r.name}</span>
          <span className="block text-[12.5px] text-steel">{r.date}</span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
          <Icon name="check" className="h-3 w-3" />
          Alumni
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(1);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const apply = () => {
      setPerView(mq.matches ? 3 : 1);
      setPage(0);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pages = useMemo(() => chunk(REVIEWS, perView), [perView]);
  const pageCount = pages.length;
  const canSlide = pageCount > 1;

  useEffect(() => {
    if (!canSlide) return;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [page, pageCount, canSlide]);

  const goTo = (i: number) => {
    if (!canSlide) return;
    setPage(((i % pageCount) + pageCount) % pageCount);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(page + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <section id="reviews" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Client stories</Eyebrow>
            <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[40px]">
              Real Journeys, <span className="text-brand">Real Results</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-cloud bg-mint/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <Stars className="h-4 w-4 text-peach" />
                <span className="text-[15px] font-semibold text-ink">5-Star</span>
              </div>
              <p className="mt-1 text-[12.5px] text-steel">Verified client reviews</p>
            </div>
            {canSlide && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(page - 1)}
                  aria-label="Previous reviews"
                  className="grid h-11 w-11 place-items-center rounded-full border border-fog text-ink"
                >
                  <Icon name="chevronLeft" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(page + 1)}
                  aria-label="Next reviews"
                  className="grid h-11 w-11 place-items-center rounded-full border border-fog text-ink"
                >
                  <Icon name="chevronRight" className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={240} from="fade" className="mt-10">
          <div
            className="relative overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, pi) => (
                <div
                  key={group.map((r) => r.name).join("-")}
                  className={cx(
                    "grid w-full shrink-0 gap-5",
                    perView === 3 ? "grid-cols-3" : "grid-cols-1",
                  )}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Reviews ${pi + 1} of ${pageCount}`}
                  aria-hidden={pi !== page}
                >
                  {group.map((r) => (
                    <ReviewCard key={r.name} r={r} />
                  ))}
                </div>
              ))}
            </div>

            {canSlide && (
              <div className="mt-6 flex items-center justify-center gap-2.5">
                {pages.map((group, i) => (
                  <button
                    key={group.map((r) => r.name).join("-")}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to reviews ${i + 1}`}
                    aria-current={i === page}
                    className={cx(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === page ? "w-8 bg-brand" : "w-2.5 bg-fog/70",
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={400} className="mt-10 text-center">
          <p className="text-[15px] text-steel">
            Ready to write your own story? It starts with one confidential conversation.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Btn href="#verify" size="lg">
              <Icon name="shield" className="h-4 w-4" />
              Verify Insurance Now
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
