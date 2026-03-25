/* eslint-disable react-refresh/only-export-components */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CategoryCardRootProps = ComponentPropsWithoutRef<"section">;

type CategoryCardContentProps = ComponentPropsWithoutRef<"div">;

type CategoryCardTextProps = ComponentPropsWithoutRef<"p">;

type CategoryCardTitleProps = ComponentPropsWithoutRef<"h2">;

type CategoryCardMediaProps = ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
};

function Root({
  className,
  children,
  ...props
}: CategoryCardRootProps) {
  return (
    <section
      className={cn(
        "border border-border/80 bg-card/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

function Content({
  className,
  children,
  ...props
}: CategoryCardContentProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function Body({
  className,
  children,
  ...props
}: CategoryCardContentProps) {
  return (
    <div className={cn("max-w-2xl space-y-3", className)} {...props}>
      {children}
    </div>
  );
}

function Eyebrow({
  className,
  children,
  ...props
}: CategoryCardTextProps) {
  return (
    <p
      className={cn(
        "text-[10px] uppercase tracking-[0.32em] text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function Title({
  className,
  children,
  ...props
}: CategoryCardTitleProps) {
  return (
    <h2 className={cn("text-2xl text-violet-300 sm:text-4xl", className)} {...props}>
      {children}
    </h2>
  );
}

function Description({
  className,
  children,
  ...props
}: CategoryCardTextProps) {
  return (
    <p
      className={cn(
        "max-w-xl text-sm leading-7 text-muted-foreground sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function Media({
  className,
  children,
  ...props
}: CategoryCardMediaProps) {
  return (
    <div
      className={cn("relative mx-auto h-45 w-45 shrink-0 lg:mx-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export const CategoryCard = Object.assign(Root, {
  Root,
  Content,
  Body,
  Eyebrow,
  Title,
  Description,
  Media,
});
