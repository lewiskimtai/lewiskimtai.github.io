import React from "react";

const Testimonials: React.FC = () => {
  return (
    <section className="pt-20 pb-12">
      <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <blockquote className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">
            "[Your Name] delivered an exceptional project on time!"
          </p>
          <cite className="block mt-2 text-gray-500 text-sm">
            — Client Name, Company
          </cite>
        </blockquote>
        <blockquote className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">"Highly skilled and professional."</p>
          <cite className="block mt-2 text-gray-500 text-sm">
            — Another Client, Startup
          </cite>
        </blockquote>
      </div>
    </section>
  );
};

export default Testimonials;
