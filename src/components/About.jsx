import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Particles from "../Particles";
import { MovingParticles } from "../MovingParticles";
import SplitText from "../SplitText";
const About = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [about, setAbout] = useState(null);
  const [skill, setSkill] = useState([]);
  const [qualification, setQualification] = useState([]);

  useEffect(() => {
    fetchAbout();
    fetchSkill();
    fetchQualifications();
  }, []);

  const fetchSkill = async () => {
    try {
      const userSkill = await axios.get(`${API_URL}/skills`);
      setSkill(userSkill.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/summary`);
      setAbout(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQualifications = async () => {
    try {
      const qualification = await axios.get(`${API_URL}/qualifications`);
      setQualification(qualification.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!about) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section
      id="about"
      className="w-full bg-[#f7f7fb] px-4 sm:px-6 md:px-12 lg:px-20  sm:py-0 lg:py-0 h-auto  "
    >
      <MovingParticles />

      <div className="max-w-7xl mx-auto pt-13 pb-10">
        {/* Heading */}
        {/* <div className="text-center mb-8 sm:mb-10">
          <p className="text-violet-600 font-semibold tracking-widest mb-2 sm:mb-3 text-sm sm:text-base">
            ABOUT ME
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            My Journey
          </h2>
        </div> */}
        <div className="text-center mb-8 sm:mb-10">
          <SplitText
            text="ABOUT ME"
            tag="p"
            className="text-violet-600 font-semibold tracking-widest mb-2 sm:mb-3 text-sm sm:text-base"
            delay={30}
            duration={0.8}
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
          />
          <br />

          <SplitText
            text="My Journey"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            delay={50}
            duration={1}
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* LEFT SIDE */}
          <div className="h-full">
            <div className="bg-white rounded-[25px] sm:rounded-[35px] p-5 sm:p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition duration-300">
              <div className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5">
                {about.role}
              </div>

              {/* <p className="text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base md:text-lg whitespace-pre-line">
                {about.summary}
              </p> */}

              <p className="text-gray-600 leading-6 sm:leading-7 text-xs sm:text-sm md:text-base whitespace-pre-line">
                {about.summary}
              </p>

              {/* SKILLS */}
              <div className="mt-6 sm:mt-8">
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {skill?.map((item) => (
                    <span
                      key={item.id}
                      className="bg-violet-100 text-violet-700 px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-center text-sm sm:text-base"
                    >
                      {item.skill_name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 sm:space-y-8 mt-6 lg:mt-0">
            {qualification.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[20px] sm:rounded-[30px] p-5 sm:p-7 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(139,92,246,0.18)] transition duration-300"
              >
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                    🎓
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.year}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 leading-6 sm:leading-7 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
