import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Typed from "typed.js";

const Hero: React.FC = () => {
  const typedRef = useRef<HTMLSpanElement>(null); // Ref for the typing element

  useEffect(() => {
    if (typedRef.current) {
      const options = {
        strings: ["[Your Name]"], // Replace with your actual name
        typeSpeed: 300, // Speed of typing (ms)
        backSpeed: 5000, // Speed of backspacing (ms)
        loop: false, // No repeat
        showCursor: true, // Show cursor during animation
        cursorChar: "|", // Cursor character
        onComplete: (self: Typed) => {
          // Hide the cursor after typing completes
          if (self.cursor) {
            self.cursor.style.visibility = "hidden";
          }
        },
      };

      const typed = new Typed(typedRef.current, options);

      // Cleanup on unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <section className="pt-24 pb-12">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto px-4">
        {/* Profile Picture */}
        <div className="mb-6 md:mb-0 md:mr-8">
          <img
            src="/profile-pic.jpg" // Replace with your actual image path
            alt="[Your Name] Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500"
          />
        </div>
        {/* Text and CTA */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Hi, I’m <span ref={typedRef} className="text-blue-500"></span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            A Developer Building Solutions for Companies and Individuals
          </p>
          <NavLink
            to="/projects"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition inline-block"
          >
            View My Projects
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
