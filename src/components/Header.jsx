import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setMenuOpen(false);

  return (
    // [#f7f7fb]
    <header className="w-full bg-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 shadow-sm  fixed  z-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight">
            <span className="text-[#8B5CF6] ">Port</span>
            <span className="text-black">folio</span>
          </h1>{" "}
        </div>

        {/* Desktop Navigation */}
        <nav>
          <ul className="hidden md:flex items-center gap-8 lg:gap-10 text-base lg:text-[17px] font-medium text-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
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
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
                }
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/experience"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
                }
              >
                Experience
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/skills"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
                }
              >
                Skills
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/works"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
                }
              >
                Works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold"
                    : "text-gray-800 hover:text-violet-600"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <NavLink
            to="/contact"
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 lg:px-7 py-2.5 lg:py-3 rounded-full font-semibold transition inline-block"
          >
            Let's Talk ↗
          </NavLink>{" "}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-2xl shadow-lg p-5 mx-4">
          <ul className="flex flex-col gap-4 text-gray-800 font-medium">
            <li onClick={closeMenu}>
              <NavLink to="/">Home</NavLink>
            </li>

            <li onClick={closeMenu}>
              <NavLink to="/about">About</NavLink>
            </li>

            <li onClick={closeMenu}>
              <NavLink to="/skills">Skills</NavLink>
            </li>

            <li onClick={closeMenu}>
              <NavLink to="/experience">Experience</NavLink>
            </li>

            <li onClick={closeMenu}>
              <NavLink to="/works">Works</NavLink>
            </li>

            <li onClick={closeMenu}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          {/* Mobile Button */}
          <button className="mt-5 w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-full font-semibold transition">
            Let's Talk ↗
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
