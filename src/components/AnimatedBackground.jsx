import { useEffect, useRef } from "react";

const getParticleCount = () => {
  if (typeof window === "undefined") {
    return 80;
  }

  return 96;
};

const createParticle = (width, height, startAbove = false) => ({
  x: Math.random() * width,
  y: startAbove ? -Math.random() * height : Math.random() * height,
  radius: 0.8 + Math.random() * 1.8,
  speed: 0.22 + Math.random() * 0.55,
  drift: -0.12 + Math.random() * 0.24,
  phase: Math.random() * Math.PI * 2,
  vx: 0,
  vy: 0,
  opacity: 0.26 + Math.random() * 0.42,
});

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || typeof window === "undefined") {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactScreenQuery = window.matchMedia("(max-width: 768px)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let isMobileMode = compactScreenQuery.matches || coarsePointerQuery.matches;
    let pointerListenersActive = false;

    const resizeCanvas = () => {
      isMobileMode = compactScreenQuery.matches || coarsePointerQuery.matches;
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = isMobileMode ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      if (isMobileMode) {
        canvas.style.display = "none";
        context.clearRect(0, 0, width, height);
        particlesRef.current = [];
        return;
      }

      canvas.style.display = "block";
      particlesRef.current = Array.from({ length: getParticleCount() }, () =>
        createParticle(width, height),
      );
    };

    const getAccentColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const particleRgb = rootStyles.getPropertyValue("--accent-particle-rgb").trim() || "226, 246, 255";
      const glowRgb = rootStyles.getPropertyValue("--accent-rgb").trim() || "34, 211, 238";

      return { particleRgb, glowRgb };
    };

    const drawParticle = (particle, isLightTheme, accentColors) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = isLightTheme
        ? `rgba(${accentColors.glowRgb}, ${particle.opacity * 0.58})`
        : `rgba(${accentColors.particleRgb}, ${particle.opacity})`;
      context.fill();

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 2.7, 0, Math.PI * 2);
      context.fillStyle = isLightTheme
        ? `rgba(${accentColors.glowRgb}, ${particle.opacity * 0.08})`
        : `rgba(${accentColors.glowRgb}, ${particle.opacity * 0.12})`;
      context.fill();
    };

    const renderStaticParticles = () => {
      const isLightTheme = document.documentElement.dataset.theme === "light";
      const accentColors = getAccentColors();

      context.clearRect(0, 0, width, height);
      particlesRef.current.forEach((particle) => drawParticle(particle, isLightTheme, accentColors));
    };

    const animateParticles = () => {
      animationFrame += 1;
      const isLightTheme = document.documentElement.dataset.theme === "light";
      const accentColors = getAccentColors();

      context.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        const distanceX = mouseRef.current.x - particle.x;
        const distanceY = mouseRef.current.y - particle.y;
        const distance = Math.hypot(distanceX, distanceY);
        const attractionRadius = 145;

        if (mouseRef.current.active && distance > 0 && distance < attractionRadius) {
          const pull = (1 - distance / attractionRadius) * 0.018;
          particle.vx += distanceX * pull;
          particle.vy += distanceY * pull;
        }

        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.phase += 0.012;
        particle.x += particle.drift + Math.sin(particle.phase + animationFrame * 0.005) * 0.08 + particle.vx;
        particle.y += particle.speed + particle.vy;

        if (particle.y > height + 16) {
          Object.assign(particle, createParticle(width, height, true), { y: -16 });
        }

        if (particle.x < -16) {
          particle.x = width + 16;
        } else if (particle.x > width + 16) {
          particle.x = -16;
        }

        drawParticle(particle, isLightTheme, accentColors);
      });

      frameId.current = window.requestAnimationFrame(animateParticles);
    };

    const startAnimation = () => {
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }

      if (isMobileMode) {
        removePointerListeners();
        context.clearRect(0, 0, width, height);
        return;
      }

      if (reduceMotionQuery.matches) {
        removePointerListeners();
        renderStaticParticles();
        return;
      }

      addPointerListeners();
      frameId.current = window.requestAnimationFrame(animateParticles);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === "touch") {
        return;
      }

      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    function addPointerListeners() {
      if (pointerListenersActive) {
        return;
      }

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("blur", handlePointerLeave);
      document.documentElement.addEventListener("mouseleave", handlePointerLeave);
      pointerListenersActive = true;
    }

    function removePointerListeners() {
      if (!pointerListenersActive) {
        return;
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      pointerListenersActive = false;
      mouseRef.current.active = false;
    }

    const handleEnvironmentChange = () => {
      resizeCanvas();
      startAnimation();
    };

    resizeCanvas();
    startAnimation();

    window.addEventListener("resize", handleEnvironmentChange);
    compactScreenQuery.addEventListener("change", handleEnvironmentChange);
    coarsePointerQuery.addEventListener("change", handleEnvironmentChange);
    reduceMotionQuery.addEventListener("change", startAnimation);

    const themeObserver = new MutationObserver(() => {
      if (!isMobileMode && reduceMotionQuery.matches) {
        renderStaticParticles();
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-accent"],
    });

    return () => {
      window.removeEventListener("resize", handleEnvironmentChange);
      compactScreenQuery.removeEventListener("change", handleEnvironmentChange);
      coarsePointerQuery.removeEventListener("change", handleEnvironmentChange);
      reduceMotionQuery.removeEventListener("change", startAnimation);
      themeObserver.disconnect();
      removePointerListeners();

      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <div
      className="animated-background pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="animated-background__wash" />
      <div className="animated-background__grid" />
      <canvas ref={canvasRef} className="animated-background__interactive-particles" />
      <div className="animated-background__particles animated-background__particles--near" />
      <div className="animated-background__particles animated-background__particles--far" />
      <div className="animated-background__signal animated-background__signal--one" />
      <div className="animated-background__signal animated-background__signal--two" />
    </div>
  );
}
