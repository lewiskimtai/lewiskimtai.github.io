import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white p-4 shadow-md fixed w-full top-0 z-10">
      <ul className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6 text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/testimonials"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Testimonials
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/project-management"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Project Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "hover:text-blue-500 transition"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
