import React from "react";

const Skills: React.FC = () => {
  return (
    <section className="pt-20 pb-12">
      <h2 className="text-3xl font-bold mb-4">Skills & Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          "React",
          "TypeScript",
          "Node.js",
          "JavaScript",
          "Tailwind CSS",
          "Python",
          "Git",
          "REST APIs",
        ].map((skill) => (
          <div
            key={skill}
            className="p-3 bg-gray-100 rounded-lg text-center text-gray-800 hover:bg-blue-100 transition"
          >
            {skill}
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Currently Learning:</span> Next.js,
        GraphQL
      </p>
    </section>
  );
};

export default Skills;
