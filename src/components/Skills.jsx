import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovingParticles } from "../MovingParticles";
import SplitText from "../SplitText";

const Skills = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [skills, setSkills] = useState([]);

  // const API_URL = "http://127.0.0.1:8000/api";

  // const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_URL}/skills`);
      setSkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="skills"
      className="w-full  px-4 sm:px-6 md:px-12 lg:px-20   bg-[#f7f7fb] "
    >
      <MovingParticles />

      <div className="max-w-7xl lg:pt-13 pb-10">
        {/* Heading */}
        {/* <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <p className="text-violet-600 font-semibold tracking-widest mb-2 sm:mb-3 text-sm sm:text-base">
            MY SKILLS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Technologies I Work With
          </h2>
        </div> */}

        <div className="text-center mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center">
          <SplitText
            text="MY SKILLS"
            tag="p"
            className="text-violet-600 font-semibold tracking-widest mb-2 sm:mb-3 text-sm sm:text-base"
            delay={30}
            duration={0.8}
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />

          <SplitText
            text="Technologies I Work With"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            delay={50}
            duration={1}
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
        </div>

        {/* Skills Grid */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 "> */}
        <div className="bg-white flex items-center rounded-2xl sm:rounded-[30px] p-10 sm:p-6 md:p-2 justify-center text-center shadow-[0_15px_35px_rgba(139,92,246,0.15)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.25)] hover:-translate-y-2 sm:hover:-translate-y-3 transition-all duration-300 gap-5 ">
          {skills.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No skills found
            </p>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-[#f7f7fb] flex items-center justify-between  rounded-2xl sm:rounded-[30px] mb-6 mt-6 ml-5 mr-5  text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 sm:hover:-translate-y-3 transition duration-300"
              >
                {/* Icon */}

                <div className="text-2xl sm:text-3xl md:text-4xl mb-3 ml-3 sm:mb-5">
                  ⚡
                </div>

                {/* Skill Name */}
                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-black break-words mr-3">
                  {skill.skill_name}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;
