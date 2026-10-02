import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */

const P: Record<string, ReactNode> = {
  phone: (
    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  ),
  check: <path d="M4.5 12.75l6 6 9-13.5" />,
  arrowRight: <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />,
  arrowUp: <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />,
  chevronLeft: <path d="M15.75 19.5L8.25 12l7.5-7.5" />,
  chevronRight: <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />,
  chevronDown: <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
  shield: (
    <path d="M9 12.75L11.25 15 15 9.75M21 12c0 5.25-3.75 9-9 9.75C6.75 21 3 17.25 3 12V5.25l9-3 9 3V12Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l3 2.25" />
    </>
  ),
  calendar: (
    <path d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5M5.25 5.25h13.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z" />
  ),
  home: <path d="M3 10.5L12 3l9 7.5M5.25 9.75V21h13.5V9.75" />,
  wifi: (
    <path d="M8.29 15.04a5.25 5.25 0 0 1 7.42 0M5.1 11.86a9.75 9.75 0 0 1 13.8 0M1.92 8.67a14.25 14.25 0 0 1 20.16 0M12 20.25h.01" />
  ),
  users: (
    <path d="M15 19.13v.12A2.75 2.75 0 0 1 12.25 22h-.5A2.75 2.75 0 0 1 9 19.25V19m6 .13a9.4 9.4 0 0 0 2.63.37 9.3 9.3 0 0 0 4.12-.95 4.13 4.13 0 0 0-7.53-2.5M9 19.13a9.4 9.4 0 0 1-2.63.37 9.3 9.3 0 0 1-4.12-.95 4.13 4.13 0 0 1 7.53-2.5m0 0V19c0-1.11-.29-2.16-.79-3.07m8.25-2.43a2.63 2.63 0 1 1-5.25 0 2.63 2.63 0 0 1 5.25 0Zm-8.25.5a3.38 3.38 0 1 1-6.75 0 3.38 3.38 0 0 1 6.75 0Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8.25" r="3.75" />
      <path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" />
    </>
  ),
  briefcase: (
    <path d="M20.25 14.15v4.25c0 1.09-.79 2.04-1.87 2.18-2.09.28-4.22.42-6.38.42s-4.29-.14-6.38-.42A2.19 2.19 0 0 1 3.75 18.4v-4.25m16.5 0c.47-.4.75-.99.75-1.66V8.7c0-1.08-.77-2.02-1.84-2.18-1.1-.16-2.23-.29-3.36-.39M3.75 14.15c-.47-.4-.75-.99-.75-1.66V8.7c0-1.08.77-2.02 1.84-2.18 1.1-.16 2.23-.29 3.36-.39m7.55 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.89" />
  ),
  heart: (
    <path d="M21 8.25c0-2.49-2.1-4.5-4.69-4.5-1.93 0-3.6 1.13-4.31 2.73C11.29 4.88 9.62 3.75 7.69 3.75 5.1 3.75 3 5.76 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  ),
  search: (
    <path d="M21 21l-5.2-5.2m0 0A7.5 7.5 0 1 0 5.2 5.2a7.5 7.5 0 0 0 10.6 10.6Z" />
  ),
  close: <path d="M6 18L18 6M6 6l12 12" />,
  menu: <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />,
  mapPin: (
    <>
      <circle cx="12" cy="10.5" r="3" />
      <path d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </>
  ),
  mail: (
    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.24a2.25 2.25 0 0 1-1.07 1.92l-7.5 4.61a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.92V6.75" />
  ),
  lock: (
    <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75M6.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 12.75v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  ),
  sparkle: (
    <path d="M9.81 15.9L9 18.75l-.81-2.85a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.85-.81a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.81 2.85a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.85.81a4.5 4.5 0 0 0-3.09 3.09ZM18 4.5v3m0 9v3M16.5 12h3" />
  ),
  laptop: (
    <path d="M9 17.25v1a3 3 0 0 1-.88 2.12L7.5 21h9l-.62-.63A3 3 0 0 1 15 18.25v-1m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
  ),
  clipboard: (
    <path d="M9 5.25H6.75A2.25 2.25 0 0 0 4.5 7.5v11.25A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-2.25V7.5a2.25 2.25 0 0 0-2.25-2.25H15M9 5.25A2.25 2.25 0 0 1 11.25 3h1.5A2.25 2.25 0 0 1 15 5.25M9 5.25A2.25 2.25 0 0 0 11.25 7.5h1.5A2.25 2.25 0 0 0 15 5.25M9 12h6M9 15.75h4.5" />
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.25 14.25L6.75 21l5.25-2.25L17.25 21l-1.5-6.75" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 10.5v6M12 7.5h.01" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  className = "h-5 w-5",
  ...rest
}: { name: keyof typeof P | string; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {P[name] ?? null}
    </svg>
  );
}

export function Stars({ className = "h-4 w-4", count = 5 }: { className?: string; count?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll                                                    */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={cx(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Image with graceful fallback                                        */
/* ------------------------------------------------------------------ */

export function SmartImg({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [status, setStatus] = useState<"load" | "ok" | "fail">("load");

  return (
    <div className={cx("relative overflow-hidden bg-mint", className)}>
      {status === "fail" ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-mint to-cloud text-brand/60">
          <Icon name="home" className="h-10 w-10" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setStatus("ok")}
          onError={() => setStatus("fail")}
          className={cx(
            "h-full w-full object-cover transition-[opacity,transform] duration-700",
            status === "ok" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons & headings                                                  */
/* ------------------------------------------------------------------ */

type BtnProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Btn({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";
  const sizes = { md: "px-5 py-3 text-[15px]", lg: "px-7 py-4 text-base" }[size];
  const variants = {
    primary:
      "bg-brand text-white shadow-[0_10px_30px_-12px_rgba(26,131,121,0.9)] hover:bg-ink hover:shadow-[0_14px_34px_-12px_rgba(17,35,47,0.75)] hover:-translate-y-0.5",
    outline:
      "border border-brand bg-white/70 text-brand backdrop-blur hover:bg-brand hover:text-white hover:-translate-y-0.5",
    ghost: "text-brand hover:text-ink",
    white:
      "bg-white text-ink shadow-[0_10px_30px_-14px_rgba(17,35,47,0.6)] hover:bg-mint hover:-translate-y-0.5",
  }[variant];

  const cls = cx(base, sizes, variants, className);
  const inner = (
    <>
      {children}
      <Icon
        name="arrowRight"
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}

export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "light" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "brand" ? "text-brand" : "text-mint",
      )}
    >
      <span
        className={cx(
          "h-px w-8",
          tone === "brand" ? "bg-brand/50" : "bg-mint/50",
        )}
      />
      {children}
    </span>
  );
}
