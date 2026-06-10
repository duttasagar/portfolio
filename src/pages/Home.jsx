import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import RecentWork from "../components/RecentWork";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Particles from "../Particles";
const Home = () => {
  return (
    <>
      {/* <div className="fixed inset-0 -z-10">
        <Particles
          particleColors={["#8B5CF6", "#A855F7"]}
          particleCount={100}
          particleSpread={12}
          speed={0.05}
          particleBaseSize={60}
          moveParticlesOnHover
          alphaParticles={true}
          disableRotation={false}
        />
      </div> */}
      <Hero />
      <About />
      <Experience />
      <Skills />
      <RecentWork />
      <Contact />
    </>
  );
};

export default Home;
