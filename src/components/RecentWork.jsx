import React, { useState, useEffect } from "react";
import axios from "axios";
import { MovingParticles } from "../MovingParticles";
import SplitText from "../SplitText";

const RecentWork = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const IMAGE_URL = API_URL.replace("/api", "");
  // const API_URL = "http://127.0.0.1:8000/api";
  // const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const [works, setWork] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get(`${API_URL}/works`);
      setWork(res.data);
    } catch (error) {
      console.log("Error fetching works:", error);
    }
  };

  return (
    <section
      id="work"
      className="w-full bg-[#f7f7fb] px-4 sm:px-6 md:px-12 lg:px-20 sm:py-0 lg:py-0"
    >
      <MovingParticles />
      <div className="max-w-7xl mx-auto lg:pt-13 pb-10">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center">
          <SplitText
            text="MY WORK"
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
            text="Recent Projects"
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
            text="Here are some of my recent projects focused on frontend development, backend systems, and responsive web applications."
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

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {!works || works.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No works yet
            </p>
          ) : (
            works.map((work, index) => (
              <div
                key={index}
                className="relative group rounded-2xl sm:rounded-[30px] p-[1px] 
  bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-600 
  hover:scale-[1.02] transition duration-300"
              >
                {/* Inner Card with background image */}
                <div
                  className="relative bg-cover bg-center rounded-2xl sm:rounded-[30px] p-5 sm:p-6 lg:p-7 
    h-full flex flex-col text-white overflow-hidden"
                  style={{
                    backgroundImage: work.image
                      ? `url(${IMAGE_URL}/${work.image})`
                      : "none",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 z-0">
                    {/* base dark layer (ensures readability) */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* bottom emphasis (glass feel without killing image) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl sm:text-2xl font-bold mb-5">
                      {work.title}
                    </h3>

                    {work.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {work.technologies.split(",").map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/20 text-white px-3 py-1 rounded-full"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-gray-200 text-sm sm:text-base mb-3">
                      {expandedIndex === index
                        ? work.description
                        : work.description.slice(0, 120) + "..."}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                      className="text-violet-300 font-semibold mb-4 w-fit"
                    >
                      {expandedIndex === index ? "Read Less" : "Read More"}
                    </button>

                    <a
                      href={work.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-full font-semibold text-center"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
