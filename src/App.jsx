import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Moon,
  Send,
  Sparkles,
  Sun,
} from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import BackToTopButton from "./components/BackToTopButton";
import SkillOrbit from "./components/SkillOrbit";

const skillCategories = [
  {
    title: "Languages & Core",
    skills: [
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "Webflow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webflow/webflow-original.svg" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Google APIs", short: "API" },
    ],
  },
  {
    title: "Libraries, Frameworks & Testing",
    skills: [
      { name: "Tkinter", short: "TK" },
      { name: "Java Swing", short: "SW" },
      { name: "pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
      { name: "Pillow", short: "PIL" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
      { name: "JUnit 5", short: "J5" },
      { name: "Pytest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytest/pytest-original.svg" },
      { name: "localStorage", short: "LS" },
    ],
  },
];

const projects = [
  {
    title: "GDG Certificate Generator",
    image: "/projects/gdg-certificate-generator.png",
    category: "Project Lead • Automation & Desktop Application",
    tech: "Python, Tkinter, pandas, Pillow, Google APIs, CSV, PDF/JPG Export, Pytest",
    description:
      "Led and built a desktop certificate automation tool for GDG on Campus BME. As project lead, I designed a workflow for generating personalized certificates from CSV data, previewing outputs, uploading to Google Drive, and preparing email distribution while handling participant data responsibly.",
    link: "#",
    buttonText: "Private Repository",
    privateNote:
      "Repository is private because the project handles confidential participant and certificate data.",
  },
  {
    title: "Pipes in the Desert",
    image: "/projects/pipes-in-the-desert.png",
    category: "Group Project • Software Project Laboratory",
    tech: "Java, Java Swing, Object-Oriented Programming, GUI Development",
    description:
      "Developed a Java Swing strategy game as a group project for the Software Project Laboratory course. Players control plumbers and saboteurs competing across a desert pipe network using movement, repairs, sabotage actions, water flow, rounds, and score tracking.",
    link: "https://github.com/Ahmadassi04/software-project-lab-pipes-in-the-desert",
    buttonText: "View Code",
  },
  {
    title: "Todo List Web Application",
    image: "/projects/todo-list.png",
    category: "Web & Mobile-based Software",
    tech: "HTML, JavaScript, Bootstrap",
    description:
      "Responsive todo list application with user registration, login, task creation and deletion, filtering, item reordering, and localStorage-based persistence for separate users.",
    link: "https://ahmadassi04.github.io/todo-list-web-app/",
    buttonText: "Live Demo",
    codeLink: "https://github.com/Ahmadassi04/todo-list-web-app",
  },
  {
    title: "Bloch Sphere Simulator",
    image: "/projects/bloch-sphere.png",
    category: "Group Project • Quantum Computing",
    tech: "Python, NumPy, Matplotlib",
    description:
      "Team-built simulator for visualizing qubit state changes, applying quantum gates, and interacting with 1 to 3 qubit systems through GUI and command-line features.",
    link: "https://github.com/Ahmadassi04/bloch-sphere-simulator",
    buttonText: "View Code",
  },
  {
    title: "Table Reservation Management System",
    image: "/projects/table-reservation.png",
    category: "Programming 3",
    tech: "Java, JUnit 5",
    description:
      "Desktop application for creating, updating, canceling, filtering, saving, and loading table reservations while applying object-oriented programming principles.",
    link: "https://github.com/Ahmadassi04/table-reservation-system-java",
    buttonText: "View Code",
  },
  {
    title: "Employee Data Management System",
    image: "/projects/employee-management.png",
    category: "Programming 2",
    tech: "C++",
    description:
      "Employee record management system with add, edit, search, and organization features using classes, file handling, and structured program design.",
    link: "https://github.com/Ahmadassi04/employee-data-management-system-cpp",
    buttonText: "View Code",
  },
];

const experience = [
  {
    role: "Technical Team Core Member",
    org: "Google Developer Group on Campus BME",
    date: "Jan 2026 – Present",
    details:
      "Contributing to internal tech projects, supporting community activities, and serving as Project Lead for the Certificate Generator project.",
  },
  {
    role: "IT Team Member",
    org: "TEDxBME",
    date: "Feb 2025 – Jun 2025",
    details:
      "Managed and maintained the TEDxBME website using Webflow, updated content, supported functionality, and kept the site aligned with event branding.",
  },
  {
    role: "Technical Support",
    org: "BME Qiskit Fall Fest / IBM Quantum",
    date: "Oct 2025",
    details:
      "Provided participant onboarding, troubleshooting, and presenter support for a two-day lecture and hackathon program.",
  },
  {
    role: "Warehouse Associate",
    org: "LACASA Holding",
    date: "Aug 2022 – Aug 2023",
    details:
      "Managed inventory, supported logistics, maintained stock records, and assisted daily retail operations across multiple clothing stores.",
  },
];

const navItems = ["About", "Education", "Skills", "Projects", "Experience"];
const sectionIds = ["home", "about", "education", "skills", "projects", "experience", "contact"];
const heroHeadingPrefix = "Hi, I’m ";
const heroHeadingFirstName = "Ahmad";
const heroHeadingLastName = "Assi";
const heroHeadingSuffix = ".";
const heroHeadingFirstLine = `${heroHeadingPrefix}${heroHeadingFirstName}`;
const heroHeadingText = `${heroHeadingFirstLine} ${heroHeadingLastName}${heroHeadingSuffix}`;
const projectCardPointerFrames = new WeakMap();
const projectCardPointerPositions = new WeakMap();
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "e8b31f8f-371a-431b-a04e-96f396a3062f";

const getInitialTheme = () => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("portfolio-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

function SectionReveal({ id, className, children, amount = 0.15 }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function TypewriterHeroHeading({ className }) {
  const shouldReduceMotion = useReducedMotion();
  const [typedCharacters, setTypedCharacters] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    let currentCharacter = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      currentCharacter += 1;
      setTypedCharacters(currentCharacter);

      if (currentCharacter < heroHeadingText.length) {
        timeoutId = window.setTimeout(typeNextCharacter, 42);
      }
    };

    timeoutId = window.setTimeout(typeNextCharacter, 240);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion]);

  const visibleCharacters = shouldReduceMotion ? heroHeadingText.length : typedCharacters;
  const visiblePrefix = heroHeadingPrefix.slice(
    0,
    Math.min(visibleCharacters, heroHeadingPrefix.length),
  );
  const visibleFirstName = heroHeadingFirstName.slice(
    0,
    Math.max(0, visibleCharacters - heroHeadingPrefix.length),
  );
  const visibleSecondLineCharacters = Math.max(
    0,
    visibleCharacters - heroHeadingFirstLine.length - 1,
  );
  const visibleLastName = heroHeadingLastName.slice(0, visibleSecondLineCharacters);
  const visibleSuffix = heroHeadingSuffix.slice(
    0,
    Math.max(0, visibleSecondLineCharacters - heroHeadingLastName.length),
  );
  const isComplete = visibleCharacters >= heroHeadingText.length;
  const isTypingFirstLine = !shouldReduceMotion && visibleCharacters <= heroHeadingFirstLine.length;
  const isTypingSecondLine = !shouldReduceMotion && visibleCharacters > heroHeadingFirstLine.length && !isComplete;

  return (
    <h1 className={`${className} relative`} aria-label={heroHeadingText}>
      <span className="invisible" aria-hidden="true">
        <span className="block">
          {heroHeadingPrefix}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            {heroHeadingFirstName}
          </span>
        </span>
        <span className="block">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            {heroHeadingLastName}
          </span>
          {heroHeadingSuffix}
        </span>
      </span>

      <span className="absolute inset-0" aria-hidden="true">
        <span className="block">
          {visiblePrefix}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            {visibleFirstName}
          </span>
          {isTypingFirstLine && <span className="typewriter-cursor" />}
        </span>
        <span className="block">
          <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
            {visibleLastName}
          </span>
          {visibleSuffix}
          {isTypingSecondLine && <span className="typewriter-cursor" />}
        </span>
      </span>
    </h1>
  );
}

const updateProjectCardSpotlight = (card) => {
  const pointerPosition = projectCardPointerPositions.get(card);

  if (!pointerPosition) {
    projectCardPointerFrames.delete(card);
    return;
  }

  card.style.setProperty("--project-card-x", `${pointerPosition.x}%`);
  card.style.setProperty("--project-card-y", `${pointerPosition.y}%`);
  projectCardPointerFrames.delete(card);
};

const handleProjectCardPointerMove = (event) => {
  if (event.pointerType === "touch") {
    return;
  }

  const card = event.currentTarget;
  const cardRect = card.getBoundingClientRect();

  projectCardPointerPositions.set(card, {
    x: ((event.clientX - cardRect.left) / cardRect.width) * 100,
    y: ((event.clientY - cardRect.top) / cardRect.height) * 100,
  });

  if (!projectCardPointerFrames.has(card)) {
    const frameId = window.requestAnimationFrame(() => updateProjectCardSpotlight(card));
    projectCardPointerFrames.set(card, frameId);
  }
};

const handleProjectCardPointerLeave = (event) => {
  const card = event.currentTarget;
  projectCardPointerPositions.set(card, { x: 50, y: 18 });

  if (!projectCardPointerFrames.has(card)) {
    const frameId = window.requestAnimationFrame(() => updateProjectCardSpotlight(card));
    projectCardPointerFrames.set(card, frameId);
  }
};

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [activeSection, setActiveSection] = useState("home");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [contactStatus, setContactStatus  ] = useState({
    type: "",
    message: "",
  });

  const isLightTheme = theme === "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!selectedImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let frameId = null;

    const getActiveSection = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const activationOffset = Math.min(240, Math.max(160, viewportHeight * 0.32));

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        return sections[sections.length - 1].id;
      }

      return sections.reduce((currentSection, section) => {
        const sectionTop = section.getBoundingClientRect().top;

        return sectionTop <= activationOffset ? section.id : currentSection;
      }, sections[0].id);
    };

    const updateActiveSection = () => {
      frameId = null;
      setActiveSection(getActiveSection());
    };

    const scheduleUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    const scriptId = "web3forms-script";
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      const currentScript = document.getElementById(scriptId);

      if (currentScript) {
        currentScript.remove();
      }
    };
  }, []);
  

  const handleContactChange = (event) => {
    const { name, value } = event.target;

    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setContactStatus({ type: "", message: "" });

    const formData = new FormData(event.target);

    formData.append("subject", "New message from Ahmad Assi portfolio");
    formData.append("from_name", "Ahmad Assi Portfolio");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setContactStatus({
        type: "success",
        message: "Thank you! Your message was sent successfully. I’ll get back to you soon.",
      });

      setContactForm({
        name: "",
        email: "",
        message: "",
      });

      event.target.reset();

      if (window.hcaptcha) {
        window.hcaptcha.reset();
      }
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error.message || "Sorry, your message could not be sent right now.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      window.localStorage.setItem("portfolio-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <main
      className={`relative isolate min-h-screen overflow-x-hidden bg-transparent pt-20 text-slate-100 ${
        isLightTheme ? "theme-light" : "theme-dark"
      }`}
    >
      <AnimatedBackground />

      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-lg font-bold tracking-tight">
            Ahmad<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={() => setActiveSection(sectionId)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                    isActive
                      ? "bg-cyan-400/10 text-cyan-200 shadow-sm shadow-cyan-950/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-cyan-300"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute inset-x-3 -bottom-1 h-px rounded-full bg-cyan-300 transition ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleThemeToggle}
              aria-label={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
              title={isLightTheme ? "Switch to dark mode" : "Switch to light mode"}
              className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/35 bg-white/[0.04] text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {isLightTheme ? (
                <Moon size={18} aria-hidden="true" />
              ) : (
                <Sun size={18} aria-hidden="true" />
              )}
            </button>

            <a
              href="#contact"
              onClick={() => setActiveSection("contact")}
              aria-current={activeSection === "contact" ? "page" : undefined}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                activeSection === "contact"
                  ? "border-cyan-300 bg-cyan-400/15 text-cyan-100"
                  : "border-cyan-400/40 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/10"
              }`}
            >
              Contact Me
            </a>
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles size={16} />
            Computer Science Engineering Student
          </div>

          <TypewriterHeroHeading className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl" />

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            I’m an aspiring software developer based in Budapest, building a
            strong foundation in front-end and back-end development through
            university projects, teamwork, and hands-on technical experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View Projects <ArrowRight size={18} />
            </a>

            <a
              href="/Ahmad-Assi-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 px-6 py-3 font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/10"
            >
              Download CV <Download size={18} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/5"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950">
              <img
                src="/profile.jpg"
                alt="Ahmad Assi profile"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </section>

      <SectionReveal id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              About
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Driven by problem-solving, teamwork, and clean software.
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-300 shadow-xl">
            <p className="leading-8">
              I’m currently pursuing a BSc in Computer Science Engineering at
              Budapest University of Technology and Economics. My experience
              includes software coursework projects, technical support, website
              maintenance, and team-based development. I’m especially interested
              in growing as a developer and contributing to practical,
              real-world software projects.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="info-pill inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <MapPin size={16} /> Budapest, Hungary
              </span>
              <span className="info-pill inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <GraduationCap size={16} /> BME Computer Science Engineering
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>
      
      <SectionReveal id="education" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Education
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Academic background
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-cyan-950/30 md:p-12">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent" />
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <div className="mb-8 flex h-32 w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-inner">
              <img
                src="/bme-logo.png"
                alt="Budapest University of Technology and Economics logo"
                className="max-h-24 w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h3 className="text-2xl font-bold text-white md:text-3xl">
              BSc in Computer Science Engineering
            </h3>

            <p className="mt-3 text-lg text-slate-300">
              Budapest University of Technology and Economics (BME)
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="info-pill rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                Started Sep 2023
              </span>
              <span className="info-pill rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                Expected Jan 2027
              </span>
              <span className="info-pill rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                Budapest, Hungary
              </span>
            </div>

            <p className="mt-7 max-w-3xl leading-8 text-slate-400">
              Building a strong foundation in software development, programming,
              algorithms, computer systems, and engineering problem-solving through
              coursework and hands-on projects.
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="skills" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Skills
          </p>
          <h2 className="text-3xl font-bold md:text-5xl">Tech stack</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Technologies I use across coursework projects, web development, and
            software engineering practice.
          </p>
        </div>

        <SkillOrbit skillCategories={skillCategories} />
      </SectionReveal>

      <SectionReveal id="projects" className="mx-auto max-w-6xl px-6 py-20" amount={0.08}>
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Projects
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Selected software projects
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            A collection of academic, personal, and community-focused software projects
            built with practical problem-solving in mind.
          </p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              onPointerMove={handleProjectCardPointerMove}
              onPointerLeave={handleProjectCardPointerLeave}
              className="project-card group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >

              {project.image && (
                <button
                  type="button"
                  onClick={() => setSelectedImage(project)}
                  className="mb-6 block w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 text-left"
                  aria-label={`Open ${project.title} screenshot`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </button>
              )}

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <Code2 size={24} />
              </div>

              <div className="mb-3 text-sm text-cyan-200">
                {project.category}
              </div>

              <h3 className="text-xl font-bold text-white">{project.title}</h3>

              <p className="mt-3 leading-7 text-slate-400">
                {project.description}
              </p>

              <div className="mt-5 text-sm font-medium text-slate-300">
                {project.tech}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {project.link === "#" ? (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 opacity-80">
                    {project.buttonText || "Private Project"}
                    <GitBranch size={16} />
                  </span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 opacity-70 transition group-hover:opacity-100"
                  >
                    {project.buttonText || "View Project"}
                    {project.buttonText === "View Code" ? (
                      <GitBranch size={16} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                  </a>
                )}

                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 opacity-70 transition group-hover:opacity-100"
                  >
                    View Code <GitBranch size={16} />
                  </a>
                )}
              </div>

              {project.privateNote && (
                <p className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3 text-sm leading-6 text-slate-400">
                  {project.privateNote}
                </p>
              )}
            </article>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="experience" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Experience
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Professional & community experience
          </h2>
        </div>

        <div className="experience-timeline">
          {experience.map((item) => (
            <div
              key={`${item.role}-${item.org}`}
              className="experience-timeline__item"
            >
              <span className="experience-timeline__marker" aria-hidden="true" />

              <div className="experience-timeline__card rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-400/30">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <BriefcaseBusiness className="text-cyan-300" size={22} />
                      <h3 className="text-xl font-bold">{item.role}</h3>
                    </div>
                    <p className="mt-2 text-cyan-100/80">{item.org}</p>
                  </div>

                  <span className="info-pill rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {item.date}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-slate-400">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-white/[0.04] p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Contact
              </p>

              <h2 className="text-3xl font-bold md:text-5xl">
                Let’s connect and build something useful.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                I’m open to practical experience, software development opportunities,
                collaborations, and tech community projects.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:ahmad.assi7333@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  <Mail size={18} /> Email Me
                </a>

                <a
                  href="/Ahmad-Assi-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/5"
                >
                  <Download size={18} /> Download CV
                </a>

                <a
                  href="https://www.linkedin.com/in/ahmad-assi-772014309"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/5"
                >
                  <ExternalLink size={18} /> LinkedIn
                </a>

                <a
                  href="https://github.com/Ahmadassi04"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/5"
                >
                  <GitBranch size={18} /> GitHub
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur"
            >
              <div className="grid gap-5">
                <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/[0.07]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/[0.07]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows="5"
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:bg-white/[0.07]"
                  />
                </div>

                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="flex justify-center">
                  <div
                    className="h-captcha"
                    data-captcha="true"
                    data-theme={theme}
                  ></div>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </button>

                {contactStatus.message && (
                  <p
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      contactStatus.type === "success"
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                        : "border-red-400/30 bg-red-400/10 text-red-200"
                    }`}
                  >
                    {contactStatus.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </SectionReveal>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-screenshot-title"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 id="project-screenshot-title" className="font-bold text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-slate-400">Project screenshot</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <img
              src={selectedImage.image}
              alt={`${selectedImage.title} screenshot enlarged`}
              className="max-h-[78vh] w-full object-contain"
            />
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Ahmad Assi. All rights reserved.
      </footer>
      <BackToTopButton />
    </main>
  );
}
