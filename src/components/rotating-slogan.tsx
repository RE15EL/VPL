import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export type RotatingSloganProps = {
  items: readonly string[];
  intervalMs?: number;
  className?: string;
};

export function RotatingSlogan({
  items,
  intervalMs = 5000,
  className,
}: RotatingSloganProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || items.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [intervalMs, items.length, shouldReduceMotion]);

  const normalizedIndex = items.length === 0 ? 0 : activeIndex % items.length;
  const activeItem = items[normalizedIndex] ?? "";

  if (!activeItem) {
    return null;
  }

  return (
    <div className="relative h-[1.1rem] overflow-hidden" aria-live="polite">
      <AnimatePresence initial={false} mode="wait">
        <motion.p
          key={activeItem}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={shouldReduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={cn(
            "absolute inset-0 text-[10px] uppercase tracking-[0.32em] whitespace-nowrap text-muted-foreground",
            className,
          )}
        >
          {activeItem}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
