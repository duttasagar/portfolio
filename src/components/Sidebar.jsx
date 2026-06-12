import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  User,
  Code,
  Briefcase,
  FolderKanban,
  Phone,
  LogOut,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");

    // remove other auth data if you add later
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Hero Section",
      path: "/admin/hero",
      icon: <Image size={20} />,
    },
    {
      name: "About Me",
      path: "/admin/addabout",
      icon: <User size={20} />,
    },
    {
      name: "Skills",
      path: "/admin/addskills",
      icon: <Code size={20} />,
    },
    {
      name: "Experience",
      path: "/admin/addExperience",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Projects",
      path: "/admin/addworks",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Contact",
      path: "/admin/addcontact",
      icon: <Phone size={20} />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      {/* {!open && (
        <div className="md:hidden fixed top-4 right-4 z-[60] p-2">
          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 text-white p-3 rounded-lg shadow-lg"
          >
            <Menu size={24} />
          </button>
        </div>
      )} */}
      {/* Mobile Hamburger Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
      md:hidden
      fixed
      top-4
      right-4
      z-[9999]
      w-12
      h-12
      flex
      items-center
      justify-center
      bg-violet-600
      text-white
      rounded-xl
      shadow-lg
    "
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-72 h-screen bg-slate-900 text-white
          flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0 md:static
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>
        {/* Profile Section */}
        <div className="p-8 border-b border-slate-700">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-4xl font-bold">
              S
            </div>

            <h2 className="mt-4 text-xl font-semibold">Sagar Dutta</h2>

            <p className="text-sm text-slate-400">Portfolio Administrator</p>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-violet-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-medium transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>{" "}
      </aside>
    </>
  );
};

export default Sidebar;
