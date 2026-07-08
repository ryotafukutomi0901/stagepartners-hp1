import gsap from "gsap";

export const EASE = "power2.out";
export const EASE_SOFT = "power1.out";

export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
} as const;

export function fadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 32,
    duration: 1,
    ease: EASE,
    ...vars,
  });
}

export function staggerFadeUp(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: EASE,
    stagger: 0.15,
    ...vars,
  });
}

export function imageReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    scale: 1.08,
    duration: 1.4,
    ease: EASE_SOFT,
    ...vars,
  });
}
