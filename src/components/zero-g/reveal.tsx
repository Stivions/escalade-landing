"use client";

import * as React from "react";
import { useInView } from "./use-in-view";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "span" | "li" | "p";
  style?: React.CSSProperties;
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  as = "div",
  style,
}: RevealProps) {
  const Tag = as as "div";
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.12 });

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
