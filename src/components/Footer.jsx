import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContact(res.data[0]); // first contact
    } catch (error) {
      console.log("Footer contact fetch error:", error);
    }
  };

  return (
    <footer className="w-full bg-[#0f172a] text-white px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* CARD 1 */}
          <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sagar Dutta</h2>

            <p className="text-gray-400 leading-7 text-sm sm:text-base">
              Full Stack Developer focused on building modern, scalable and
              user-friendly web applications.
            </p>

            {/* CONTACT INFO */}
            <div className="mt-5 text-sm text-gray-400 space-y-2">
              <p>📧 {contact?.email || "Loading..."}</p>
              <p>📞 {contact?.phone || "Loading..."}</p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400 text-sm sm:text-base">
              <NavLink to="/" className="hover:text-violet-400 transition">
                Home
              </NavLink>

              <NavLink to="/about" className="hover:text-violet-400 transition">
                About
              </NavLink>

              <NavLink
                to="/skills"
                className="hover:text-violet-400 transition"
              >
                Skills
              </NavLink>

              <NavLink to="/works" className="hover:text-violet-400 transition">
                Projects
              </NavLink>

              <NavLink
                to="/experience"
                className="hover:text-violet-400 transition"
              >
                Experience
              </NavLink>

              <NavLink
                to="/contact"
                className="hover:text-violet-400 transition"
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Connect</h3>

            <p className="text-gray-400 mb-5 text-sm sm:text-base">
              Let’s build something amazing together.
            </p>

            {/* SOCIAL */}
            <div className="flex flex-wrap gap-3">
              <a
                href={contact?.facebook || "#"}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href={contact?.instagram || "#"}
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href={contact?.linkedin || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href={contact?.github || "#"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-violet-600 flex items-center justify-center transition"
              >
                <FaGithub size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 text-center border-t border-white/10 pt-6">
          <p className="text-gray-500 text-sm">
            © 2026 Sagar Dutta. Built with React, Tailwind CSS & Laravel
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
