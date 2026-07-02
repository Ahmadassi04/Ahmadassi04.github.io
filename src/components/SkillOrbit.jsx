import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Cpu, List, X } from "lucide-react";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const ROTATION_DURATION = 130000;
const FRAME_INTERVAL = 34;
const SPHERE_TILT = -0.22;
const MIN_TILT = -0.7;
const MAX_TILT = 0.28;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

const createSpherePoints = (total) =>
  Array.from({ length: total }, (_, index) => {
    const y = 1 - (index / (total - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = index * GOLDEN_ANGLE + 0.45;

    return {
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    };
  });

const projectPoint = (point, rotation, tilt) => {
  const cosY = Math.cos(rotation);
  const sinY = Math.sin(rotation);
  const cosX = Math.cos(tilt);
  const sinX = Math.sin(tilt);

  const rotatedX = point.x * cosY - point.z * sinY;
  const rotatedZ = point.x * sinY + point.z * cosY;
  const tiltedY = point.y * cosX - rotatedZ * sinX;
  const tiltedZ = point.y * sinX + rotatedZ * cosX;
  const depth = (tiltedZ + 1) / 2;
  const perspective = 0.9 + depth * 0.18;

  return {
    x: 50 + rotatedX * 38 * perspective,
    y: 50 + tiltedY * 38 * perspective,
    depth,
    scale: 0.72 + depth * 0.42,
    opacity: 0.28 + depth * 0.7,
    blur: Math.max(0, 0.8 - depth * 0.8),
    zIndex: Math.round(10 + depth * 90),
  };
};

export default function SkillOrbit({ skillCategories }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isListOpen, setIsListOpen] = useState(false);
  const [rotation, setRotation] = useState(0.42);
  const [tilt, setTilt] = useState(SPHERE_TILT);
  const rotationRef = useRef(0.42);
  const tiltRef = useRef(SPHERE_TILT);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({
    x: 0,
    y: 0,
    rotation: 0.42,
    tilt: SPHERE_TILT,
  });

  const skills = useMemo(
    () =>
      skillCategories.flatMap((category) =>
        category.skills.map((skill) => ({
          ...skill,
          category: category.title,
        })),
      ),
    [skillCategories],
  );

  const spherePoints = useMemo(() => createSpherePoints(skills.length), [skills.length]);

  useEffect(() => {
    if (!isListOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsListOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isListOpen]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    let animationFrame = 0;
    let previousFrame = performance.now();

    const animate = (now) => {
      if (now - previousFrame > FRAME_INTERVAL) {
        if (!isDraggingRef.current) {
          const nextRotation =
            rotationRef.current +
            ((now - previousFrame) / ROTATION_DURATION) * Math.PI * 2;

          rotationRef.current = nextRotation;
          setRotation(nextRotation);
        }

        previousFrame = now;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [prefersReducedMotion]);

  const handlePointerDown = (event) => {
    if (!event.isPrimary) {
      return;
    }

    isDraggingRef.current = true;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      rotation: rotationRef.current,
      tilt: tiltRef.current,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current || !event.isPrimary) {
      return;
    }

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    const nextRotation = dragStartRef.current.rotation + deltaX * 0.008;
    const nextTilt = clamp(dragStartRef.current.tilt + deltaY * 0.005, MIN_TILT, MAX_TILT);

    rotationRef.current = nextRotation;
    tiltRef.current = nextTilt;
    setRotation(nextRotation);
    setTilt(nextTilt);
  };

  const handlePointerEnd = (event) => {
    if (!event.isPrimary) {
      return;
    }

    isDraggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const projectedSkills = useMemo(
    () =>
      skills.map((skill, index) => ({
        ...skill,
        projection: projectPoint(spherePoints[index], rotation, tilt),
      })),
    [rotation, skills, spherePoints, tilt],
  );

  return (
    <div className="skill-orbit relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur md:p-8">
      <div className="skill-orbit__glow" aria-hidden="true" />

      <div
        className="skill-orbit__stage"
        role="list"
        aria-label="Rotating toolkit globe with programming languages, tools, frameworks, and testing skills"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className="skill-orbit__globe-visual" aria-hidden="true">
          <div className="skill-orbit__orb" />
          <div className="skill-orbit__wire skill-orbit__wire--lat" />
          <div className="skill-orbit__wire skill-orbit__wire--lon" />
        </div>

        <div className="skill-orbit__core" aria-hidden="true">
          <Cpu size={22} />
          <strong>{skills.length}</strong>
          <span>skills</span>
        </div>

        {projectedSkills.map((skill) => (
          <div
            key={skill.name}
            role="listitem"
            aria-label={`${skill.name}, ${skill.category}`}
            className="skill-orbit__node"
            style={{
              left: `${skill.projection.x}%`,
              top: `${skill.projection.y}%`,
              opacity: skill.projection.opacity,
              transform: `translate(-50%, -50%) scale(${skill.projection.scale})`,
              filter: `blur(${skill.projection.blur}px)`,
              zIndex: skill.projection.zIndex,
            }}
          >
            <div className="skill-orbit__node-shell">
              <span className="skill-orbit__icon" aria-hidden="true">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt=""
                    className="h-full w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span>{skill.short}</span>
                )}
              </span>
              <span className="skill-orbit__label">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="skill-orbit__list-toggle"
        onClick={() => setIsListOpen(true)}
      >
        <List size={17} aria-hidden="true" />
        <span>View Skills List</span>
      </button>

      {isListOpen && typeof document !== "undefined" && createPortal(
        <div
          className="skill-orbit__list-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skills-list-title"
          onClick={() => setIsListOpen(false)}
        >
          <div className="skill-orbit__list-panel" onClick={(event) => event.stopPropagation()}>
            <div className="skill-orbit__list-header">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                  Skills
                </p>
                <h3 id="skills-list-title">Toolkit cards</h3>
              </div>

              <button
                type="button"
                className="skill-orbit__list-close"
                aria-label="Back to Skills globe"
                onClick={() => setIsListOpen(false)}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="skill-orbit__list-grid">
              {skillCategories.map((category) => (
                <section key={category.title} className="skill-orbit__list-category">
                  <div className="skill-orbit__list-category-heading">
                    <Cpu size={18} aria-hidden="true" />
                    <h4>{category.title}</h4>
                  </div>

                  <div className="skill-orbit__list-items">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="skill-orbit__list-skill">
                        <span className="skill-orbit__list-icon" aria-hidden="true">
                          {skill.icon ? (
                            <img
                              src={skill.icon}
                              alt=""
                              className="h-full w-full object-contain"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <span>{skill.short}</span>
                          )}
                        </span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
