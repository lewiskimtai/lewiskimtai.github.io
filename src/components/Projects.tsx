import React from "react";

const Projects: React.FC = () => {
  return (
    <section id="projects" className="pt-20 pb-12">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "E-Commerce Platform",
            desc: "A responsive online store with payment integration.",
            tech: "React, Node.js, Stripe",
            demo: "#",
            repo: "#",
          },
          {
            title: "Task Management App",
            desc: "A productivity tool for teams with real-time updates.",
            tech: "React, Firebase",
            demo: "#",
            repo: "#",
          },
          {
            title: "Portfolio Website",
            desc: "This site! A clean, minimalist developer portfolio.",
            tech: "React, Tailwind CSS",
            demo: "#",
            repo: "#",
          },
        ].map((project, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="h-40 bg-gray-200 rounded-t-lg mb-4" />{" "}
            {/* Placeholder for thumbnail */}
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{project.desc}</p>
            <p className="text-gray-500 text-xs mb-2">Tech: {project.tech}</p>
            <div className="flex space-x-4">
              <a
                href={project.demo}
                className="text-blue-500 hover:underline text-sm"
              >
                Live Demo
              </a>
              <a
                href={project.repo}
                className="text-blue-500 hover:underline text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
