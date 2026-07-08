"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export function useScopedGsap<T extends HTMLElement>(
  callback: (context: { scope: RefObject<T | null> }) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<T | null>(null);

  useGSAP(
    () => {
      callback({ scope });
    },
    { scope, dependencies: deps },
  );

  return scope;
}

export { gsap, ScrollTrigger, SplitText };
