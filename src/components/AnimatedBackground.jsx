import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const backgroundRef = useRef(null);
  const glowRef = useRef(null);
  const pointerPosition = useRef({ x: 0, y: 0 });
  const frameId = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const glow = glowRef.current;

    if (!background || !glow || typeof window === "undefined") {
      return undefined;
    }

    pointerPosition.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const updateCursorGlow = () => {
      frameId.current = null;
      glow.style.transform = `translate3d(${pointerPosition.current.x}px, ${pointerPosition.current.y}px, 0) translate(-50%, -50%)`;
    };

    const scheduleUpdate = () => {
      if (frameId.current !== null) {
        return;
      }

      frameId.current = window.requestAnimationFrame(updateCursorGlow);
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

    const handleMouseMove = (event) => {
      pointerPosition.current = {
        x: `${event.clientX}px`,
        y: `${event.clientY}px`,
      };

      scheduleUpdate();
    };

    const handlePointerLeave = () => {
      pointerPosition.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      scheduleUpdate();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    scheduleUpdate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="animated-background pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animated-background__wash" />
      <div ref={glowRef} className="animated-background__cursor-glow" />
      <div className="animated-background__grid" />
      <div className="animated-background__particles animated-background__particles--near" />
      <div className="animated-background__particles animated-background__particles--far" />
      <div className="animated-background__signal animated-background__signal--one" />
      <div className="animated-background__signal animated-background__signal--two" />
    </div>
  );
}
