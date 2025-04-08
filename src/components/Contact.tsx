import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="pt-20 pb-12">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form
        action="mailto:[your.email@example.com]"
        method="post"
        encType="text/plain"
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Or connect with me on:{" "}
          <a href="[Your GitHub]" className="text-blue-500 hover:underline">
            GitHub
          </a>{" "}
          |{" "}
          <a href="[Your LinkedIn]" className="text-blue-500 hover:underline">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="[Your X]" className="text-blue-500 hover:underline">
            X
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
