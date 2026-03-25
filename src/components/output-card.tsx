/* eslint-disable react-refresh/only-export-components */
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type OutputCardRootProps = ComponentPropsWithoutRef<"article">;

type OutputCardHeaderProps = ComponentPropsWithoutRef<"div">;

type OutputCardEyebrowProps = ComponentPropsWithoutRef<"p">;

type OutputCardTitleProps = ComponentPropsWithoutRef<"h2">;

type OutputCardContentProps = ComponentPropsWithoutRef<"div">;

function Root({ className, children, ...props }: OutputCardRootProps) {
  return (
    <article
      className={cn("border border-border/80 bg-card/70 p-5", className)}
      {...props}
    >
      {children}
    </article>
  );
}

function Header({ className, children, ...props }: OutputCardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-dashed border-border/80 pb-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Eyebrow({ className, children, ...props }: OutputCardEyebrowProps) {
  return (
    <p
      className={cn(
        "text-[10px] uppercase tracking-[0.28em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function Title({ className, children, ...props }: OutputCardTitleProps) {
  return (
    <h2 className={cn("mt-2 text-xl text-violet-300", className)} {...props}>
      {children}
    </h2>
  );
}

function Content({ className, children, ...props }: OutputCardContentProps) {
  return (
    <div
      className={cn("mt-4 border border-border/70 bg-background/60 p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const OutputCard = Object.assign(Root, {
  Root,
  Header,
  Eyebrow,
  Title,
  Content,
});
