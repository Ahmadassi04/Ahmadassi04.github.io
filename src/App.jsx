import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

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

const navItems = ["About", "Education", "Skills", "Projects", "Experience", "Contact"];
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "e8b31f8f-371a-431b-a04e-96f396a3062f";

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[30%] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-lg font-bold tracking-tight">
            Ahmad<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="mailto:ahmad.assi7333@gmail.com"
            className="rounded-full border border-cyan-400/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400/10"
          >
            Contact Me
          </a>
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

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Ahmad Assi
            </span>
            .
          </h1>

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

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
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
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <MapPin size={16} /> Budapest, Hungary
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <GraduationCap size={16} /> BME Computer Science Engineering
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <section id="education" className="mx-auto max-w-6xl px-6 py-20">
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
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
                Started Sep 2023
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                Expected Jan 2027
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
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
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
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

        <div className="grid items-start gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                  <Cpu size={22} />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/90 p-2">
                      {skill.icon ? (
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          className="h-full w-full object-contain"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-xs font-black text-slate-950">
                          {skill.short}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-slate-100">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
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
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
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
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Experience
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Professional & community experience
          </h2>
        </div>

        <div className="space-y-5">
          {experience.map((item) => (
            <div
              key={`${item.role}-${item.org}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-400/30"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="text-cyan-300" size={22} />
                    <h3 className="text-xl font-bold">{item.role}</h3>
                  </div>
                  <p className="mt-2 text-cyan-100/80">{item.org}</p>
                </div>

                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">
                  {item.date}
                </span>
              </div>

              <p className="mt-4 leading-7 text-slate-400">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
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
                    data-theme="dark"
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
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h3 className="font-bold text-white">{selectedImage.title}</h3>
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
    </main>
  );
}