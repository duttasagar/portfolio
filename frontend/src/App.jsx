import "./App.css";
import Particles from "./Particles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import RecentWork from "./components/RecentWork";
import AdminHero from "./pages/admin/Hero";
import AddSkills from "./pages/Admin/AddSkills";
import AddExperience from "./pages/Admin/AddExperience";
import AddWorks from "./pages/Admin/AddWorks";
import AddContact from "./pages/Admin/AddContact";
import AdminLayout from "./Layouts/AdminLayout";
import AddAbout from "./pages/Admin/AddAbout";
import Messages from "./pages/Admin/Messages";
import Layout from "./Layouts/Layout";

function App() {
  return (
    <>



      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />

            <Route
              path="/about"
              element={
                <>
                  <About />
                </>
              }
            />

            <Route
              path="/experience"
              element={
                <>
                  <Experience />
                </>
              }
            />

            <Route
              path="/skills"
              element={
                <>
                  <Skills />
                </>
              }
            />

            <Route
              path="/contact"
              element={
                <>
                  <Contact />
                </>
              }
            />

            <Route
              path="/works"
              element={
                <>
                  <RecentWork />
                </>
              }
            />
          </Route>

          {/* Admin Panel */}

          <Route
            path="/admin/hero"
            element={
              <AdminLayout>
                <AdminHero />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/addabout"
            element={
              <AdminLayout>
                <AddAbout />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/addskills"
            element={
              <AdminLayout>
                <AddSkills />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/addexperience"
            element={
              <AdminLayout>
                <AddExperience />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/addworks"
            element={
              <AdminLayout>
                <AddWorks />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/addcontact"
            element={
              <AdminLayout>
                <AddContact />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/messages"
            element={
              <AdminLayout>
                <Messages />
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
