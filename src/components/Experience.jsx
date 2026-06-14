import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovingParticles } from "../MovingParticles";
import SplitText from "../SplitText";
const Experience = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/experiences`);

      console.log("API RESPONSE:", res.data);

      setExperiences(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <section
      id="experience"
      className="w-full bg-[#f7f7fb] px-4 sm:px-6 md:px-12 lg:px-20  sm:py-0 lg:py-0 "
    >
      <MovingParticles />
      {/* <div className="max-w-7xl mx-auto  pt-12 pb-10"> */}
        <div className="max-w-7xl mx-auto pt-0 sm:pt-12 pb-10">

        <div className="text-center mb-8 sm:mb-10 lg:mb-12 flex flex-col ">
          <SplitText
            text="EXPERIENCE"
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
            text="My Journey & Experience"
            tag="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            delay={50}
            duration={1}
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />

          <SplitText
            text="My professional journey started with customer service experience and gradually moved into software development."
            tag="p"
            className="text-gray-600 mt-4 sm:mt-5 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base md:text-lg px-2 sm:px-0"
            delay={15}
            duration={0.8}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 sm:border-l-4 border-violet-200 ml-3 sm:ml-4 md:ml-10 space-y-10 sm:space-y-14 lg:space-y-16">
          {/* Loading */}
          {loading && (
            <p className="text-gray-500 text-center">Loading experiences...</p>
          )}

          {/* Data */}
          {!loading &&
            experiences.length > 0 &&
            experiences.map((item) => (
              <div key={item.id} className="relative pl-6 sm:pl-8 md:pl-10">
                {/* Dot */}
                <div className="absolute -left-[10px] sm:-left-[14px] md:-left-[18px] top-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-violet-600 border-2 sm:border-4 border-white shadow-lg"></div>

                {/* Card */}
                <div className="bg-white rounded-2xl sm:rounded-[35px] p-5 sm:p-7 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)] transition duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                        {item.company_name}
                      </h3>

                      <p className="text-violet-600 font-medium mt-1 text-sm sm:text-base">
                        {item.role}
                      </p>
                    </div>

                    <span className="bg-violet-100 text-violet-700 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold w-fit">
                      {item.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-6 sm:leading-7 md:leading-8 text-sm sm:text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

          {/* Empty state */}
          {!loading && experiences.length === 0 && (
            <p className="text-gray-500 text-center">No experiences found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
