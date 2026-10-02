import { useState } from "react";
import { IMG, INSURERS, PHONE } from "../data";
import CallButton from "./CallButton";
import { Icon, Reveal, cx } from "./ui";

type Fields = {
  who: "Myself" | "A loved one";
  first: string;
  last: string;
  phone: string;
  email: string;
  dob: string;
  insurer: string;
  memberId: string;
};

const EMPTY: Fields = {
  who: "Myself",
  first: "",
  last: "",
  phone: "",
  email: "",
  dob: "",
  insurer: "",
  memberId: "",
};

const digits = (v: string) => v.replace(/\D/g, "");
const formatPhone = (v: string) => {
  const d = digits(v).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

export default function VerifyForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (fields.first.trim().length < 2) e.first = "Enter a first name.";
    if (fields.last.trim().length < 2) e.last = "Enter a last name.";
    if (digits(fields.phone).length !== 10) e.phone = "Enter a 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(fields.email.trim()))
      e.email = "Enter a valid email address.";
    if (!fields.insurer.trim()) e.insurer = "Enter your insurance provider.";
    setErrors(e);
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      const firstKey = Object.keys(e)[0];
      document.getElementById(`vf-${firstKey}`)?.focus();
      return;
    }
    setSent(true);
  };

  const input =
    "w-full rounded-2xl border bg-cloud/60 px-4 py-4 text-[15.5px] text-ink outline-none transition-all duration-200 placeholder:text-steel/60 focus:bg-white focus:ring-4";
  const ok = "border-fog/60 focus:border-brand focus:ring-brand/15";
  const bad = "border-coral bg-coral/5 focus:border-coral focus:ring-coral/20";
  const label = "block text-[14px] font-semibold text-ink";

  return (
    <section id="verify" className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={IMG.formBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-ink/92" />
      </div>

      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* ---------- copy ---------- */}
          <div className="text-white">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint">
                <span className="h-px w-8 bg-mint/50" />
                Coverage check
              </span>
              <h2 className="mt-4 text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-[40px]">
                Check Your <span className="font-display italic text-mint">Coverage Today</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-fog">
                Insurance may cover 100% of your treatment costs. Don&rsquo;t see yours? We accept
                many plans not listed here. Complete the form, and our team will verify your benefits
                and contact you within 30 minutes.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: "clock", t: "Response within 30 minutes", d: "During business hours, Monday to Friday." },
                  { icon: "lock", t: "Private and confidential", d: "Your information is never shared or sold." },
                  { icon: "shield", t: "No obligation", d: "Verification is free and doesn't commit you to anything." },
                ].map((r) => (
                  <li key={r.t} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-mint">
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[15.5px] font-semibold text-white">{r.t}</span>
                      <span className="block text-[13.5px] text-fog">{r.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140} className="mt-9">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-mint">
                  In network with
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {INSURERS.slice(0, 8).map((i) => (
                    <span
                      key={i.name}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-fog"
                    >
                      {i.name}
                    </span>
                  ))}
                  <span className="rounded-full border border-white/15 px-3 py-1.5 text-[12.5px] font-medium text-fog">
                    + more
                  </span>
                </div>
              </div>
              <p className="mt-6 text-[15px] text-fog">Prefer to talk?</p>
              <CallButton className="mt-3 bg-white">Call {PHONE}</CallButton>
            </Reveal>
          </div>

          {/* ---------- form card ---------- */}
          <Reveal delay={60}>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_50px_100px_-50px_rgba(0,0,0,0.8)] sm:p-8">
              {sent ? (
                <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                  <span className="grid h-16 w-16 animate-pop place-items-center rounded-full bg-brand/12 text-brand">
                    <Icon name="check" className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-[24px] font-semibold tracking-tight text-ink">
                    Thanks, {fields.first.trim()}!
                  </h3>
                  <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-steel">
                    Our team is reviewing your {fields.insurer.trim()} benefits now and will contact
                    you within 30 minutes at{" "}
                    <span className="font-semibold text-ink">{fields.phone}</span>.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <CallButton>Call {PHONE}</CallButton>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setFields(EMPTY);
                      }}
                      className="rounded-full border border-fog px-6 py-3.5 text-[15px] font-semibold text-steel transition-colors hover:border-brand hover:text-brand"
                    >
                      Submit another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[30px]">
                      Verify Your Insurance
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-mint px-3.5 py-2.5 text-[13px] font-medium text-ink">
                      <Icon name="lock" className="h-4 w-4" />
                      HIPAA-secure
                    </span>
                  </div>
                  <p className="mt-3 text-[14px] text-steel/80">
                    &ldquo;*&rdquo; indicates required fields
                  </p>

                  {/* For myself / For loved one */}
                  <div
                    role="group"
                    aria-label="Who is this treatment for?"
                    className="mt-5 grid grid-cols-2 gap-1.5 rounded-2xl bg-cloud p-1.5"
                  >
                    {(
                      [
                        ["Myself", "For myself"],
                        ["A loved one", "For loved one"],
                      ] as const
                    ).map(([value, text]) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={fields.who === value}
                        onClick={() => set("who", value)}
                        className={cx(
                          "rounded-xl px-4 py-3.5 text-[15.5px] font-semibold transition-all duration-300",
                          fields.who === value
                            ? "bg-white text-ink shadow-[0_8px_20px_-12px_rgba(17,35,47,0.55)]"
                            : "text-steel hover:text-ink",
                        )}
                      >
                        {text}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 space-y-4">
                    {/* Full name */}
                    <div>
                      <span className={label}>
                        Full Name <span className="text-coral">*</span>
                      </span>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor="vf-first" className="sr-only">
                            First name
                          </label>
                          <input
                            id="vf-first"
                            autoComplete="given-name"
                            value={fields.first}
                            onChange={(e) => set("first", e.target.value)}
                            aria-invalid={Boolean(errors.first)}
                            aria-describedby={errors.first ? "vf-first-err" : undefined}
                            placeholder="First name"
                            className={cx(input, errors.first ? bad : ok)}
                          />
                          {errors.first && <Err id="vf-first-err" msg={errors.first} />}
                        </div>
                        <div>
                          <label htmlFor="vf-last" className="sr-only">
                            Last name
                          </label>
                          <input
                            id="vf-last"
                            autoComplete="family-name"
                            value={fields.last}
                            onChange={(e) => set("last", e.target.value)}
                            aria-invalid={Boolean(errors.last)}
                            aria-describedby={errors.last ? "vf-last-err" : undefined}
                            placeholder="Last name"
                            className={cx(input, errors.last ? bad : ok)}
                          />
                          {errors.last && <Err id="vf-last-err" msg={errors.last} />}
                        </div>
                      </div>
                    </div>

                    {/* Phone + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="vf-phone" className={label}>
                          Phone <span className="text-coral">*</span>
                        </label>
                        <input
                          id="vf-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={fields.phone}
                          onChange={(e) => set("phone", formatPhone(e.target.value))}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "vf-phone-err" : undefined}
                          className={cx(input, "mt-2 tabular-nums", errors.phone ? bad : ok)}
                        />
                        {errors.phone && <Err id="vf-phone-err" msg={errors.phone} />}
                      </div>
                      <div>
                        <label htmlFor="vf-email" className={label}>
                          Email <span className="text-coral">*</span>
                        </label>
                        <input
                          id="vf-email"
                          type="email"
                          autoComplete="email"
                          value={fields.email}
                          onChange={(e) => set("email", e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "vf-email-err" : undefined}
                          className={cx(input, "mt-2", errors.email ? bad : ok)}
                        />
                        {errors.email && <Err id="vf-email-err" msg={errors.email} />}
                      </div>
                    </div>

                    {/* DOB + Insurance provider */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="vf-dob" className={label}>
                          DOB
                        </label>
                        <input
                          id="vf-dob"
                          type="date"
                          autoComplete="bday"
                          max={new Date().toISOString().split("T")[0]}
                          value={fields.dob}
                          onChange={(e) => set("dob", e.target.value)}
                          className={cx(input, "mt-2 min-h-[58px]", ok)}
                        />
                      </div>
                      <div>
                        <label htmlFor="vf-insurer" className={label}>
                          Insurance Provider <span className="text-coral">*</span>
                        </label>
                        <input
                          id="vf-insurer"
                          list="vf-insurers"
                          autoComplete="off"
                          value={fields.insurer}
                          onChange={(e) => set("insurer", e.target.value)}
                          aria-invalid={Boolean(errors.insurer)}
                          aria-describedby={errors.insurer ? "vf-insurer-err" : undefined}
                          className={cx(input, "mt-2", errors.insurer ? bad : ok)}
                        />
                        <datalist id="vf-insurers">
                          {INSURERS.map((i) => (
                            <option key={i.name} value={i.name} />
                          ))}
                        </datalist>
                        {errors.insurer && <Err id="vf-insurer-err" msg={errors.insurer} />}
                      </div>
                    </div>

                    {/* Member ID */}
                    <div>
                      <label htmlFor="vf-memberId" className={label}>
                        Member ID Policy Number
                      </label>
                      <input
                        id="vf-memberId"
                        autoComplete="off"
                        value={fields.memberId}
                        onChange={(e) => set("memberId", e.target.value)}
                        className={cx(input, "mt-2", ok)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-6 py-5 text-[18px] font-semibold text-white shadow-[0_14px_32px_-16px_rgba(26,131,121,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
                  >
                    Verify My Insurance
                    <Icon
                      name="arrowRight"
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <p className="mt-5 text-center text-[13px] leading-relaxed text-steel">
                    Confidential and secure. Submitting this form does not obligate you to begin
                    treatment. By submitting, you agree to be contacted by NuView Treatment Center
                    about your benefits and options. We do not accept Medicaid, Medicare, or Kaiser.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Err({ id, msg }: { id: string; msg: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-coral">
      <Icon name="info" className="h-3.5 w-3.5 shrink-0" />
      {msg}
    </p>
  );
}
