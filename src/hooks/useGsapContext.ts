"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type DependencyList, type RefObject, useEffect, useLayoutEffect } from "react";

// Register once at module load; every GSAP consumer imports from here.
gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs `setup` inside a `gsap.context()` scoped to `scope`, so selector strings
 * only match descendants. Everything created inside (tweens, ScrollTriggers,
 * matchMedia) is reverted on cleanup, which keeps strict-mode double mounts and
 * route changes leak-free. `setup` may return an extra cleanup function.
 */
export function useGsapContext<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (ctx: gsap.Context) => void | (() => void),
  deps: DependencyList = [],
) {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context((self) => setup(self), scope.current);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger };
