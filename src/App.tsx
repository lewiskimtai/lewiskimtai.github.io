import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./styles.css";


const App: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    if (typedRef.current) {
      const options = {
        strings: ["Kimtai Lewis"],
        typeSpeed: 300,
        backSpeed: 50,
        loop: false,
        showCursor: true,
        cursorChar: "|",
        onComplete: (self: Typed) => {
          if (self.cursor) {
            self.cursor.style.visibility = "hidden";
          }
        },
      };
      const typed = new Typed(typedRef.current, options);
      return () => {
        typed.destroy();
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent =
        docHeight > winHeight ? scrollTop / (docHeight - winHeight) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.height = `${scrollPercent * 100}%`;
      }
      scrollYProgress.set(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    document.documentElement.classList.add("hide-scrollbar");

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.classList.remove("hide-scrollbar");
    };
  }, [scrollYProgress]);

  const circleVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const headingRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Adjust threshold as needed
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && !animationPlayed) {
      if (headingRef.current) {
        const options = {
          strings: ["FEATURED CASE STUDIES"],
          typeSpeed: 10,
          backSpeed: 50,
          loop: false,
          showCursor: false,
          cursorChar: "|",
          onComplete: (self: { cursor: { style: { visibility: string } } }) => {
            if (self.cursor) {
              self.cursor.style.visibility = "hidden";
            }
            setAnimationPlayed(false); // Animation has played
          },
        };

        const typed = new Typed(headingRef.current, options);

        return () => {
          typed.destroy();
        };
      }
    }
    // REMOVED: if (!isIntersecting) { setAnimationPlayed(false); }
  }, [isIntersecting, animationPlayed]);

  const barHeight = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const pieStrokeDashoffset = useTransform(scrollYProgress, [0, 1], [283, 0]);
  const gaugeRotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);
   const handleScroll = (sectionId: string) => {
     document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
   };

  return (
    <div className="app-container">
      {/* Vertical Scroll Bar */}
      <div className="scroll-bar">
        <div
          ref={progressBarRef}
          className="scroll-progress"
          style={{ height: "0%" }}
        />
      </div>

      {/* Hero Section with Background Image */}
      <header id="home" className="hero-section">
        {/* New Div at the Top of Hero Section */}
        <div className="top-hero-div">
          {/* Navigation buttons div */}
          <div className="nav-buttons">
            <button className="nav-button" onClick={() => handleScroll("home")}>
              Home
            </button>
            <button
              className="nav-button"
              onClick={() => handleScroll("projects")}
            >
              Projects
            </button>
            <button
              className="nav-button"
              onClick={() => handleScroll("skills")}
            >
              Skills
            </button>
            <button
              className="nav-button"
              onClick={() => handleScroll("about")}
            >
              About me
            </button>
            <button
              className="nav-button"
              onClick={() => handleScroll("contact")}
            >
              Contact
            </button>
          </div>
        </div>

        <img
          src="/data-analytics-myths.jpg"
          alt="Background"
          className="hero-background"
        />
        {/* Background Animations */}
        <motion.div
          className="background-animations"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="floating-circle circle-1"
            variants={circleVariants}
            animate="animate"
          />
          <motion.div
            className="floating-circle circle-2"
            variants={circleVariants}
            animate="animate"
          />
          <motion.div
            className="floating-circle circle-3"
            variants={circleVariants}
            animate="animate"
          />

          <div className="bar-chart">
            <motion.div
              className="bar bar-1"
              style={{ height: barHeight, transformOrigin: "bottom" }}
            />
            <motion.div
              className="bar bar-2"
              style={{ height: barHeight, transformOrigin: "bottom" }}
              transition={{ delay: 0.1 }}
            />
            <motion.div
              className="bar bar-3"
              style={{ height: barHeight, transformOrigin: "bottom" }}
              transition={{ delay: 0.2 }}
            />
          </div>

          <svg className="pie-chart" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="10"
              strokeDasharray="283"
              strokeDashoffset={pieStrokeDashoffset}
            />
          </svg>

          <svg className="gauge" viewBox="0 0 100 100">
            <path
              d="M 20 80 A 40 40 0 0 1 80 80"
              fill="none"
              stroke="#dbeafe"
              strokeWidth="10"
            />
            <motion.path
              d="M 20 80 A 40 40 0 0 1 80 80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="10"
              strokeDasharray="125.6"
              strokeDashoffset={useTransform(
                scrollYProgress,
                [0, 1],
                [125.6, 0]
              )}
            />
            <motion.line
              x1="50"
              y1="80"
              x2="50"
              y2="40"
              stroke="#ef4444"
              strokeWidth="2"
              style={{ rotate: gaugeRotate, originX: "50%", originY: "80%" }}
            />
          </svg>
        </motion.div>

        {/* Content */}
        <div className="hero-content">
          <div className="profile-pic-container">
            <img
              src="/profile-pic.jpg"
              alt="Kimtai Lewis Profile"
              className="profile-pic"
            />
          </div>
          <div className="hero-text">
            <h1>
              I help founders visualize their success using seamless digital
              experience.
            </h1>
            <h2>
              Hello, I’m <span ref={typedRef} className="highlight"></span> a{" "}
              <span className="highlight pulse">
                Data Scientist & Full Stack Developer
              </span>{" "}
            </h2>
            <a
              href="https://wa.me/qr/WXG7IR4SKBVCF1" // Replace with your link URL
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
              style={{ textDecoration: "none" }} // Remove default underline
            >
              <button
                className="cta-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "30px",
                  borderColor: "rgba(93, 93, 107, 0.69)",
                  borderWidth: "1px",
                }}
              >
                Let's Connect
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "8px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <img
                    src="/right-arrow-svgrepo-com.svg"
                    alt="Right Arrow"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Projects Showcase */}
        <section
          id="projects"
          className="section"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="section-inner">
            <center>
              <h3 style={{ color: "white" }} ref={headingRef}></h3>
            </center>
            <center>
              <h1 style={{ fontSize: "4em", color: "white" }}>Curated work</h1>
            </center>

            <div
              style={{
                flexDirection: "column",
                display: "flex",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  marginLeft: "100px",
                  marginTop: "100px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "35rem",
                    maxWidth: "70%",
                    marginRight: "20px",
                    marginBottom: "20px",

                    borderWidth: "10px",
                    borderTopLeftRadius: "30px",
                    borderTopRightRadius: "30px",
                    borderBottomLeftRadius: "30px",
                    borderBottomRightRadius: "30px",
                    borderColor: "rgb(17, 17, 20)",
                    boxShadow:
                      "0 0 0 0.3px rgba(229, 229, 236, 0.69), 0 0 0 0.3px rgba(30, 30, 36, 0.69)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "blue",
                    transition: "transform 0.3s ease",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const profileImg = e.currentTarget.querySelector(
                      'img[src="/pdd.png"]'
                    ); // Target dash image
                    if (profileImg) {
                      (profileImg as HTMLImageElement).style.transform =
                        "rotate(-3deg) scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const profileImg = e.currentTarget.querySelector(
                      'img[src="/pdd.png"]'
                    ); // Target dash image
                    if (profileImg) {
                      (profileImg as HTMLImageElement).style.transform =
                        "rotate(0deg) scale(1)";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "20px",
                      paddingBottom: "70px",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "8px",
                        display: "flex",
                        justifyContent: "center",
                        width: "70%",
                        color: "rgb(116, 200, 248)", // Make the text blue
                      }}
                    >
                      An online space for farmers to detect potato diseases and
                      discover their causes and solutions.
                    </div>
                    <a
                      href="https://plantdiseasedetection-1-x5dz.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/right-arrow-svgrepo-com.svg"
                        alt="Right Arrow"
                        style={{
                          width: "40px",
                          height: "40px",
                          filter:
                            "invert(50%) sepia(100%) saturate(3300%) hue-rotate(190deg) brightness(100%) contrast(100%)",
                        }}
                      />
                    </a>
                  </div>
                  <img
                    src="/pdd.png"
                    alt="Potato Disease Detection"
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: "12px",
                      boxShadow:
                        "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.06), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.05), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.04), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0.01), " + // Outer glow
                        "0 0 10px 4px rgba(255, 255, 255, 0), " + // Outer glow
                        "0 0 15px 6px rgba(255, 255, 255, 0)", // Further outer glow
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "30px",
                    color: "white", // White text
                    fontFamily: "sans-serif", // Basic font
                    maxWidth: "400px", // Adjust as needed
                    margin: "20px auto", // Center the card
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      borderBottom: "1px solid rgb(116, 200, 248)", // Line under title
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "rgb(116, 200, 248)",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <h2 style={{ margin: 0, fontSize: "1.5em" }}>
                      Potato Disease Detection
                    </h2>
                    <span
                      role="img"
                      aria-label="cat"
                      style={{ marginLeft: "10px" }}
                    ></span>
                  </div>
                  <p
                    style={{
                      lineHeight: "1.6",
                      marginBottom: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    Developed a platform to help farmers predict potato diseases
                    using Python and React.
                  </p>
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                      fontFamily: "cursive",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 200, 248)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      Predictive CNN model trained and tested on 10,000+ potato
                      leaf images.
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 200, 248)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      Simplified photo upload, intuitive prediction.
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 200, 248)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      Enhanced UI with React for seamless performance
                      optimization.
                    </li>
                  </ul>

                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      display: "flex",
                      flexWrap: "wrap", // Allow items to wrap
                      gap: "10px", // Space between items
                      maxWidth: "100%", // Prevent overflow
                      overflow: "hidden", // Hide overflow
                    }}
                  >
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/python-svgrepo-com.svg"
                        alt="Python"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      Python
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/jupyter-svgrepo-com.svg"
                        alt="Jypyter notebook"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      Jypyter notebook
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/tensorflow-svgrepo-com.svg"
                        alt="TensorFlow"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      TensorFlow
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/numpy-svgrepo-com.svg"
                        alt="Numpy"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      Numpy
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/react-svgrepo-com.svg"
                        alt="React"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      React
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/fastapi-svgrepo-com.svg"
                        alt="Fastapi"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      Fastapi
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  marginLeft: "100px",
                  marginTop: "100px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: "35rem",
                    maxWidth: "70%",
                    marginRight: "20px",
                    marginBottom: "20px",

                    borderWidth: "10px",
                    borderTopLeftRadius: "30px",
                    borderTopRightRadius: "30px",
                    borderBottomLeftRadius: "30px",
                    borderBottomRightRadius: "30px",
                    borderColor: "rgb(17, 17, 20)",
                    boxShadow:
                      "0 0 0 0.3px rgba(229, 229, 236, 0.69), 0 0 0 0.3px rgba(30, 30, 36, 0.69)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "rgba(6, 110, 32, 0.64)",
                    transition: "transform 0.3s ease",
                    boxSizing: "border-box",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const profileImg = e.currentTarget.querySelector(
                      'img[src="/pdd.png"]'
                    ); // Target dash image
                    if (profileImg) {
                      (profileImg as HTMLImageElement).style.transform =
                        "rotate(-3deg) scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const profileImg = e.currentTarget.querySelector(
                      'img[src="/pdd.png"]'
                    ); // Target dash image
                    if (profileImg) {
                      (profileImg as HTMLImageElement).style.transform =
                        "rotate(0deg) scale(1)";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "20px",
                      paddingBottom: "70px",
                      color: "white",
                      fontSize: "1.2rem",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "8px",
                        display: "flex",
                        justifyContent: "center",
                        width: "70%",
                        color: "rgb(116, 248, 118)", // Make the text blue
                      }}
                    >
                      A mobile application space for SACCO administrators and
                      memebers to manage there savings and credit transactions.
                    </div>
                    <img
                      src="/right-arrow-svgrepo-com.svg"
                      alt="Right Arrow"
                      style={{
                        width: "40px",
                        height: "40px",
                        filter:
                          "brightness(0) saturate(100%) invert(89%) sepia(33%) saturate(826%) hue-rotate(55deg) brightness(99%) contrast(96%)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px", // Keep the gap between images
                      width: "auto", // Adjust width to fit content
                      height: "80%",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/screen1.png"
                      alt="Screen 1"
                      style={{
                        borderRadius: "12px",
                        boxShadow:
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.06), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.05), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.04), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.01), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0), " + // Outer glow
                          "0 0 15px 6px rgba(255, 255, 255, 0)", // Further outer glow
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <img
                      src="/screen2.png"
                      alt="Screen 2"
                      style={{
                        borderRadius: "12px",
                        boxShadow:
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.06), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.05), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.04), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.01), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0), " + // Outer glow
                          "0 0 15px 6px rgba(255, 255, 255, 0)", // Further outer glow
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <img
                      src="/screen3.png"
                      alt="Screen 3"
                      style={{
                        borderRadius: "12px",
                        boxShadow:
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.06), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.05), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.04), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.01), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0), " + // Outer glow
                          "0 0 15px 6px rgba(255, 255, 255, 0)", // Further outer glow
                        transition: "transform 0.3s ease",
                      }}
                    />
                    <img
                      src="/screen4.png"
                      alt="Screen 4"
                      style={{
                        borderRadius: "12px",
                        boxShadow:
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.07), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.06), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.05), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.04), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0.01), " + // Outer glow
                          "0 0 10px 4px rgba(255, 255, 255, 0), " + // Outer glow
                          "0 0 15px 6px rgba(255, 255, 255, 0)", // Further outer glow
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    padding: "30px",
                    color: "white", // White text
                    fontFamily: "sans-serif", // Basic font
                    maxWidth: "400px", // Adjust as needed
                    margin: "20px auto", // Center the card
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                      borderBottom: "1px solid rgb(116, 248, 118)", // Line under title
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "rgb(116, 248, 118)",
                        marginRight: "10px",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <h2 style={{ margin: 0, fontSize: "1.5em" }}>
                      SACCO Mobile App
                    </h2>
                    <span
                      role="img"
                      aria-label="cat"
                      style={{ marginLeft: "10px" }}
                    ></span>
                  </div>
                  <p
                    style={{
                      lineHeight: "1.6",
                      marginBottom: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    Developed a sacco mobile app UI for sacco memebrs to manage
                    and track there savings, interests and loans using React.
                  </p>
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                      fontFamily: "cursive",
                    }}
                  >
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 248, 118)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      Expo server for development.
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 248, 118)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      React navigation for seamless navigation to different
                      screens.
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: "rgb(116, 248, 118)",
                          marginRight: "8px",
                        }}
                      >
                        ✦
                      </span>
                      Enhanced UI with vector icons
                    </li>
                  </ul>

                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      display: "flex",
                      flexWrap: "wrap", // Allow items to wrap
                      gap: "10px", // Space between items
                      maxWidth: "100%", // Prevent overflow
                      overflow: "hidden", // Hide overflow
                    }}
                  >
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/react-svgrepo-com.svg"
                        alt="React"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      React
                    </div>
                    <div
                      style={{
                        borderWidth: "2px",
                        borderColor: "rgba(104, 100, 100, 0.29)",
                        display: "inline-flex", // Use inline-flex to shrink to content
                        alignItems: "center", // Center items vertically
                        padding: "5px 5px", // Reduce padding
                        paddingRight: "10px",
                        fontSize: "0.9rem", // Reduce font size
                        borderRadius: "100px",
                        backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                      }}
                    >
                      <img
                        src="/light-expo-svgrepo-com.svg"
                        alt="Expo"
                        style={{
                          width: "25px", // Reduce image size
                          height: "25px", // Reduce image size
                          marginRight: "5px", // Reduce spacing
                        }}
                      />
                      Expo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Tools Section */}
        <section id="skills" className="section">
          <div className="section-inner">
            <center>
              <h3 style={{ color: "white" }}>I constantly try to improve</h3>
            </center>
            <center>
              <h1 style={{ fontSize: "4em", color: "white" }}>My Tech Stack</h1>
            </center>
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap", // Allow items to wrap
                gap: "10px", // Space between items
                maxWidth: "100%", // Prevent overflow
                overflow: "hidden", // Hide overflow
                color: "white", // White text
                justifyContent: "center", // Center items
                alignContent: "center", // Center items
              }}
            >
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/react-svgrepo-com.svg"
                  alt="React"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                React
              </div>

              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/ex-kernel-manager-svgrepo-com.svg"
                  alt="ExpressJS"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                ExpressJS
              </div>

              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/python-svgrepo-com.svg"
                  alt="Python"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Python
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/fastapi-svgrepo-com.svg"
                  alt="FastAPI"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                FastAPI
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/light-expo-svgrepo-com.svg"
                  alt="Expo"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Expo
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/mongo-svgrepo-com.svg"
                  alt="MongoDB"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                MongoDB
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/tensorflow-svgrepo-com.svg"
                  alt="TensorFlow"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                TensorFlow
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/nodejs-svgrepo-com.svg"
                  alt="NodeJS"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                NodeJS
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/numpy-svgrepo-com.svg"
                  alt="Numpy"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Numpy
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/redux-svgrepo-com.svg"
                  alt="Redux"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Redux
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/git-svgrepo-com.svg"
                  alt="Git"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Git
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/github-svgrepo-com.svg"
                  alt="Github"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Github
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/html-5-svgrepo-com.svg"
                  alt="HTML"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                HTML
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/javascript-svgrepo-com.svg"
                  alt="Javascript"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Javascript
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/mysql-logo-svgrepo-com.svg"
                  alt="MySQL"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                MySQL
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/matplotlib.png"
                  alt="Matplotlib"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Matplotlib
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/pandas-svgrepo-com.svg"
                  alt="Pandas"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Pandas
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/scikitlearn-svgrepo-com.svg"
                  alt="SciKit-Learn"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                SciKit-Learn
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/postgresql-svgrepo-com.svg"
                  alt="postgresql"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Postgresql
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/django-svgrepo-com.svg"
                  alt="Django"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Django
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/flask-svgrepo-com.svg"
                  alt="Flask"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Flask
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/jupyter-svgrepo-com.svg"
                  alt="Jupyter"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Jupyter
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/linux-svgrepo-com.svg"
                  alt="Linux"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Linux
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/light-pnpm-svgrepo-com.svg"
                  alt="Pnpm"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                pnpm
              </div>
            </div>

            <center>
              <h1 style={{ fontSize: "2em", color: "white" }}>
                Currently Learning
              </h1>
            </center>
            <div
              style={{
                marginTop: "10px",
                padding: "20px",
                display: "flex",
                flexWrap: "wrap", // Allow items to wrap
                gap: "10px", // Space between items
                maxWidth: "100%", // Prevent overflow
                overflow: "hidden", // Hide overflow
                color: "white", // White text
                justifyContent: "center", // Center items
                alignContent: "center", // Center items
              }}
            >
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/docker-svgrepo-com.svg"
                  alt="Docker"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Docker
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/kubernetes-svgrepo-com.svg"
                  alt="Kubernetes"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Kubernetes
              </div>
              <div
                style={{
                  borderWidth: "2px",
                  borderColor: "rgba(104, 100, 100, 0.29)",
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  padding: "5px 20px", // Reduce padding
                  paddingRight: "20px",
                  fontSize: "1.5rem", // Reduce font size
                  borderRadius: "20px",
                  backgroundColor: "rgba(47, 44, 44, 0.45)", // Semi-transparent background
                }}
              >
                <img
                  src="/lynx.svg"
                  alt="Lynx"
                  style={{
                    width: "30px", // Reduce image size
                    height: "30px", // Reduce image size
                    marginRight: "10px", // Reduce spacing
                  }}
                />
                Lynx
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="section">
          <div className="section-inner">
            <div
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                paddingTop: "40px",
                color: "white",
                fontFamily: "sans-serif",
                maxWidth: "800px",
                margin: "50px auto",
              }}
            >
              <h3
                style={{
                  textTransform: "uppercase",
                  color: "#F06292",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                MORE ABOUT ME
              </h3>
              <h1
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  lineHeight: "1",
                  marginBottom: "10px",
                }}
              >
                Data Scientist, Full-Stack Developer and <br />a little bit of{" "}
                <span
                  style={{
                    display: "inline",
                    backgroundImage:
                      "linear-gradient(to right, #F06292, #FFA07A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  everything
                </span>
              </h1>
              <p
                style={{
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                I'm Kimtai Lewis, a proactive Data Scientist and full-stack
                developer passionate about creating dynamic dashboard
                experiences. From frontend to backend, I thrive on analyzing
                complex problems with clean, efficient code. My expertise spans
                Python, React and Node.js, and I'm always eager to learn more.
              </p>
              <p
                style={{
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                When I'm not coding, I'm exploring new ideas and staying
                curious. Life's about balance, and I love embracing every part
                of it.
              </p>
              <p
                style={{
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                I believe in waking up each day eager to make a difference!
              </p>
              <div
                style={{
                  display: "inline-flex", // Use inline-flex to shrink to content
                  alignItems: "center", // Center items vertically
                  justifyItems: "center", // Center items horizontally
                  gap: "10px", // Space between items
                }}
              >
                <a
                  href="https://www.linkedin.com/in/lewis-kimtai/" // Replace with your LinkedIn URL
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                  style={{
                    textDecoration: "none", // Remove default underline from link
                    display: "inline-block", // Make the <a> tag behave like a block element
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/linkedin-svgrepo-com.svg"
                      alt="LinkedIn"
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                </a>
                <a
                  href="https://github.com/lewiskimtai" // Replace with your LinkedIn URL
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                  style={{
                    textDecoration: "none", // Remove default underline from link
                    display: "inline-block", // Make the <a> tag behave like a block element
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/github-color-svgrepo-com.svg"
                      alt="Github"
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                </a>
                <a
                  href="https://x.com/thedatascientst" // Replace with your LinkedIn URL
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                  style={{
                    textDecoration: "none", // Remove default underline from link
                    display: "inline-block", // Make the <a> tag behave like a block element
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/twitter-svgrepo-com.svg"
                      alt="X"
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                </a>
                <a
                  href="https://wa.me/qr/WXG7IR4SKBVCF1" // Replace with your LinkedIn URL
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                  style={{
                    textDecoration: "none", // Remove default underline from link
                    display: "inline-block", // Make the <a> tag behave like a block element
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="/whatsapp-svgrepo-com.svg"
                      alt="WhatsApp"
                      style={{
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="section-inner">
            <div
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                color: "white",
                fontFamily: "sans-serif",
                maxWidth: "800px",
                margin: "50px auto",
              }}
            >
              <h1
                style={{
                  fontSize: "3em",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                FROM CONCEPT TO CREATION <br />
                LET'S MAKE IT HAPPEN!
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <a
                  href="https://wa.me/qr/WXG7IR4SKBVCF1" // Replace with your link URL
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Security best practice
                  style={{ textDecoration: "none" }} // Remove default underline
                >
                  <button
                    className="cta-button"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: "30px",
                      borderColor: "rgba(93, 93, 107, 0.69)",
                      borderWidth: "1px",
                    }}
                  >
                    Get In Touch
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: "8px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                      }}
                    >
                      <img
                        src="/right-arrow-svgrepo-com.svg"
                        alt="Right Arrow"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                  </button>
                </a>
              </div>
              <div
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                }}
              >
                I'm available for full-time roles & freelance projects.
              </div>
              <div
                style={{
                  fontSize: "1em",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                I thrive on crafting data driven dynamic web applications, and
                delivering seamless user experiences with trained, tested and
                predictable machine learning models.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Kimtai Lewis. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
