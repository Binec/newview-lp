import type { ComponentPropsWithoutRef } from "react";
import { PHONE, PHONE_HREF } from "../data";
import { cn } from "../utils/cn";
import { Icon } from "./ui";

type CallButtonProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  compact?: boolean;
};

export default function CallButton({
  children = PHONE,
  compact = false,
  className,
  "aria-label": ariaLabel = `Call NuView Treatment Center at ${PHONE}`,
  ...props
}: CallButtonProps) {
  return (
    <a
      {...props}
      href={PHONE_HREF}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 text-[15px] font-semibold text-brand transition-all duration-300 hover:border-brand hover:bg-mint",
        compact ? "h-11 w-11 p-0" : "px-4 py-2.5",
        className,
      )}
    >
      <Icon name="phone" className={compact ? "h-5 w-5 shrink-0" : "h-4 w-4 shrink-0"} />
      {!compact && <span className="tabular-nums">{children}</span>}
    </a>
  );
}