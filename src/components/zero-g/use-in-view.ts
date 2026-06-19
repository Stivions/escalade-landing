"use client";

import * as React from "react";

/**
 * Hook that returns a ref and a boolean indicating whether the element
 * is visible in the viewport. Once visible, the boolean stays true.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const { once = true, ...observerOptions } = options || {};
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fallback sin IntersectionObserver: mostrar el contenido de inmediato
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
        ...observerOptions,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

/**
 * Wraps an array of words so each word can animate in individually.
 */
export function splitWords(text: string): string[] {
  return text.split(" ");
}
