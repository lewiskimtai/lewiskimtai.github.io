import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import "./styles.css";

/* ── Sub-components ──────────────────────────────────── */

interface TechItem { src: string; label: string; }

const ProjectCard: React.FC<{
  color: string;
  accent: string;
  image?: string;
  images?: string[];
  title: string;
  description: string;
  highlights: string[];
  tech: TechItem[];
  link?: string;
}> = ({ color, accent, image, images, title, description, highlights, tech, link }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.55 }}
  >
    <div className="project-preview" style={{ backgroundColor: color }}>
      <div className="project-preview-label" style={{ color: accent }}>
        <span>{title}</span>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer"
            className="project-link-icon" style={{ color: accent }}>
            ↗
          </a>
        )}
      </div>
      {image && <img src={image} alt={title} className="project-img-single" />}
      {images && (
        <div className="project-imgs-row">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${title} ${i + 1}`} className="project-img-screen" />
          ))}
        </div>
      )}
    </div>
    <div className="project-info">
      <div className="project-header">
        <span className="project-dot" style={{ backgroundColor: accent }} />
        <h3 className="project-title">{title}</h3>
      </div>
      <p className="project-desc">{description}</p>
      <ul className="project-highlights">
        {highlights.map((h, i) => (
          <li key={i}><span style={{ color: accent }}>✦</span> {h}</li>
        ))}
      </ul>
      <div className="project-tech">
        {tech.map((t) => (
          <span key={t.label} className="tech-tag">
            <img src={t.src} alt={t.label} />{t.label}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillCategory: React.FC<{ title: string; skills: TechItem[] }> = ({ title, skills }) => (
  <div className="skill-category">
    <h4 className="skill-category-title">{title}</h4>
    <div className="skills-tags">
      {skills.map((s) => (
        <span key={s.label} className="skill-tag">
          <img src={s.src} alt={s.label} />{s.label}
        </span>
      ))}
    </div>
  </div>
);

/* ── Main App ────────────────────────────────────────── */

const App: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: ["Data Scientist", "Full Stack Developer", "ML Engineer"],
        typeSpeed: 75,
        backSpeed: 40,
        backDelay: 1800,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
      return () => typed.destroy();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks: { id: string; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <button className="nav-logo" onClick={() => scrollTo("home")}>
            <span className="nav-logo-dot">✦</span> Lewis Kimtai
          </button>

          <div className={`nav-links${menuOpen ? " nav-links-open" : ""}`}>
            {navLinks.map(({ id, label }) => (
              <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </div>

          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <motion.div className="hero-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}>
            <p className="hero-greeting">Hi there, I'm Kimtai Lewis 👋</p>
            <h1 className="hero-headline">
              I build <span className="accent-text">data-driven</span><br />
              digital experiences
            </h1>
            <h2 className="hero-role"><span ref={typedRef} /></h2>
            <p className="hero-desc">
              Passionate about creating seamless web apps and uncovering insights
              from data. I help founders and businesses turn complex problems into
              elegant, scalable solutions.
            </p>
            <div className="hero-actions">
              <a href="https://wa.me/qr/WXG7IR4SKBVCF1" target="_blank"
                rel="noopener noreferrer" className="btn-primary">
                Let's Connect
              </a>
              <button className="btn-secondary" onClick={() => scrollTo("projects")}>
                View Work
              </button>
            </div>
          </motion.div>

          <motion.div className="hero-image"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}>
            <div className="hero-img-wrapper">
              <img src="/profile-pic.jpg" alt="Kimtai Lewis" className="hero-profile" />
              <div className="hero-img-ring" />
              <div className="hero-img-dot dot-1" />
              <div className="hero-img-dot dot-2" />
            </div>
          </motion.div>
        </div>

        <motion.div className="hero-scroll-hint"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>
          ↓
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="section section-alt">
        <div className="section-inner">
          <span className="section-label">Featured Work</span>
          <h2 className="section-title">Curated Projects</h2>
          <div className="projects-grid">
            <ProjectCard
              color="#0d0f1a"
              accent="rgb(116, 200, 248)"
              image="/pdd.png"
              title="Potato Disease Detection"
              description="A platform that helps farmers predict potato diseases using computer vision. Trained a CNN on 10,000+ leaf images and wrapped it in a clean React + FastAPI web app."
              highlights={[
                "CNN model trained on 10,000+ annotated images",
                "Simple photo upload with instant prediction",
                "React frontend served by a FastAPI backend",
              ]}
              tech={[
                { src: "/python-svgrepo-com.svg", label: "Python" },
                { src: "/tensorflow-svgrepo-com.svg", label: "TensorFlow" },
                { src: "/react-svgrepo-com.svg", label: "React" },
                { src: "/fastapi-svgrepo-com.svg", label: "FastAPI" },
              ]}
              link="https://plantdiseasedetection-1-x5dz.onrender.com/"
            />
            <ProjectCard
              color="#0a1a0c"
              accent="rgb(116, 248, 118)"
              images={["/screen1.png", "/screen2.png", "/screen3.png", "/screen4.png"]}
              title="SACCO Mobile App"
              description="A mobile app for SACCO administrators and members to manage savings, credit transactions, and loan tracking — built with React Native and Expo."
              highlights={[
                "React Navigation for seamless multi-screen flow",
                "Real-time savings & loan tracking",
                "Polished UI with vector icons",
              ]}
              tech={[
                { src: "/react-svgrepo-com.svg", label: "React Native" },
                { src: "/light-expo-svgrepo-com.svg", label: "Expo" },
                { src: "/redux-svgrepo-com.svg", label: "Redux" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section">
        <div className="section-inner">
          <span className="section-label">What I Work With</span>
          <h2 className="section-title">Tech Stack</h2>
          <div className="skills-categories">
            <SkillCategory title="Frontend" skills={[
              { src: "/react-svgrepo-com.svg", label: "React" },
              { src: "/nextjs-svgrepo-com.svg", label: "Next.js" },
              { src: "/typescript-svgrepo-com.svg", label: "TypeScript" },
              { src: "/javascript-svgrepo-com.svg", label: "JavaScript" },
              { src: "/html-5-svgrepo-com.svg", label: "HTML" },
              { src: "/css-3-svgrepo-com.svg", label: "CSS" },
              { src: "/redux-svgrepo-com.svg", label: "Redux" },
            ]} />
            <SkillCategory title="Backend" skills={[
              { src: "/python-svgrepo-com.svg", label: "Python" },
              { src: "/nodejs-svgrepo-com.svg", label: "Node.js" },
              { src: "/ex-kernel-manager-svgrepo-com.svg", label: "Express" },
              { src: "/fastapi-svgrepo-com.svg", label: "FastAPI" },
              { src: "/django-svgrepo-com.svg", label: "Django" },
              { src: "/flask-svgrepo-com.svg", label: "Flask" },
            ]} />
            <SkillCategory title="Data Science" skills={[
              { src: "/tensorflow-svgrepo-com.svg", label: "TensorFlow" },
              { src: "/scikitlearn-svgrepo-com.svg", label: "Scikit-Learn" },
              { src: "/pandas-svgrepo-com.svg", label: "Pandas" },
              { src: "/numpy-svgrepo-com.svg", label: "NumPy" },
              { src: "/matplotlib.png", label: "Matplotlib" },
              { src: "/jupyter-svgrepo-com.svg", label: "Jupyter" },
            ]} />
            <SkillCategory title="Databases & DevOps" skills={[
              { src: "/postgresql-svgrepo-com.svg", label: "PostgreSQL" },
              { src: "/mysql-logo-svgrepo-com.svg", label: "MySQL" },
              { src: "/mongo-svgrepo-com.svg", label: "MongoDB" },
              { src: "/git-svgrepo-com.svg", label: "Git" },
              { src: "/github-svgrepo-com.svg", label: "GitHub" },
              { src: "/linux-svgrepo-com.svg", label: "Linux" },
            ]} />
          </div>

          <div className="skills-learning">
            <span className="section-label">Currently Learning</span>
            <div className="skills-tags" style={{ marginTop: "1rem" }}>
              {[
                { src: "/docker-svgrepo-com.svg", label: "Docker" },
                { src: "/kubernetes-svgrepo-com.svg", label: "Kubernetes" },
                { src: "/lynx.svg", label: "Lynx" },
              ].map((s) => (
                <span key={s.label} className="skill-tag skill-tag-learning">
                  <img src={s.src} alt={s.label} />{s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section section-alt">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-image-col">
              <div className="about-img-wrapper">
                <img src="/profile-pic.jpg" alt="Kimtai Lewis" className="about-img" />
              </div>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Clients</span>
                </div>
              </div>
            </div>

            <div className="about-text-col">
              <span className="section-label">More About Me</span>
              <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
                Data Scientist,<br />Full-Stack Developer,<br />& a little bit of{" "}
                <span className="accent-text">everything</span>
              </h2>
              <p className="about-bio">
                I'm Kimtai Lewis — a proactive Data Scientist and full-stack developer
                passionate about creating dynamic, data-driven experiences. From
                frontend to backend I thrive on solving complex problems with clean,
                efficient code. My core stack spans Python, React, and Node.js.
              </p>
              <p className="about-bio">
                When I'm not coding I'm exploring new ideas, reading, or finding
                inspiration in everyday patterns. I believe balance and curiosity
                are what make great engineers.
              </p>
              <p className="about-bio">
                I wake up each day eager to make a difference — one commit at a time.
              </p>
              <div className="about-socials">
                <a href="https://www.linkedin.com/in/lewis-kimtai/" target="_blank"
                  rel="noopener noreferrer" className="social-link">
                  <img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" />
                </a>
                <a href="https://github.com/lewiskimtai" target="_blank"
                  rel="noopener noreferrer" className="social-link">
                  <img src="/github-color-svgrepo-com.svg" alt="GitHub" />
                </a>
                <a href="https://x.com/thedatascientst" target="_blank"
                  rel="noopener noreferrer" className="social-link">
                  <img src="/twitter-svgrepo-com.svg" alt="Twitter/X" />
                </a>
                <a href="https://wa.me/qr/WXG7IR4SKBVCF1" target="_blank"
                  rel="noopener noreferrer" className="social-link">
                  <img src="/whatsapp-svgrepo-com.svg" alt="WhatsApp" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="section">
        <div className="section-inner">
          <div className="contact-inner">
            <span className="section-label">Let's Talk</span>
            <h2 className="contact-title">
              From Concept to Creation —{" "}
              <span className="accent-text">Let's Make It Happen</span>
            </h2>
            <p className="contact-desc">
              I'm available for full-time roles and freelance projects. I thrive
              on crafting data-driven web applications and delivering seamless
              user experiences with reliable machine learning models.
            </p>
            <div className="contact-actions">
              <a href="mailto:lewis.kimtai@gmail.com" className="btn-primary">
                Send an Email
              </a>
              <a href="https://wa.me/qr/WXG7IR4SKBVCF1" target="_blank"
                rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Me
              </a>
            </div>
            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/lewis-kimtai/" target="_blank"
                rel="noopener noreferrer">LinkedIn</a>
              <span>·</span>
              <a href="https://github.com/lewiskimtai" target="_blank"
                rel="noopener noreferrer">GitHub</a>
              <span>·</span>
              <a href="https://x.com/thedatascientst" target="_blank"
                rel="noopener noreferrer">Twitter / X</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <p className="footer-name">Lewis Kimtai</p>
          <p className="footer-copy">© 2026 Kimtai Lewis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
