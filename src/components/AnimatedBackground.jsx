import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const backgroundRef = useRef(null);
  const pointerPosition = useRef({ x: "50vw", y: "50vh" });
  const frameId = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const root = document.documentElement;

    if (!background || typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const updateCursorVariables = () => {
      frameId.current = null;
      root.style.setProperty("--cursor-x", pointerPosition.current.x);
      root.style.setProperty("--cursor-y", pointerPosition.current.y);
    };

    const scheduleUpdate = () => {
      if (frameId.current !== null) {
        return;
      }

      frameId.current = window.requestAnimationFrame(updateCursorVariables);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      pointerPosition.current = {
        x: `${event.clientX}px`,
        y: `${event.clientY}px`,
      };

      scheduleUpdate();
    };

    const handlePointerLeave = () => {
      pointerPosition.current = { x: "50vw", y: "50vh" };
      scheduleUpdate();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    scheduleUpdate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);

      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="animated-background fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animated-background__wash" />
      <div className="animated-background__cursor-glow" />
      <div className="animated-background__grid" />
      <div className="animated-background__particles animated-background__particles--near" />
      <div className="animated-background__particles animated-background__particles--far" />
      <div className="animated-background__signal animated-background__signal--one" />
      <div className="animated-background__signal animated-background__signal--two" />
    </div>
  );
}
