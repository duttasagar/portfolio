import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MovingParticles } from "../MovingParticles";
import AnimatedText from "../AnimatedText";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const API_URL = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();

  useEffect(() => {
    fetchHero();
  }, []);

  const handleWorkRedirect = () => {
    navigate("/works");
  };

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${API_URL}/hero`);
      setHero({
        ...res.data.hero,
        image_url: res.data.image_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!hero) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  // bg-[#f7f7fb]
  return (
    <section className="w-full bg-[#f7f7fb]   lg:pt-18 pb-0 sm:pb-16 lg:pb-10 overflow-hidden relative ">
      <MovingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20  pb-0  ">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] items-center gap-10">
          {/* LEFT SIDE */}
          <div className="bg-white/70 backdrop-blur-md p-4 sm:p-4 md:p-12 rounded-3xl shadow-lg text-center md:text-left  ">
            <div className="inline-block bg-violet-100 text-violet-600 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5">
              👋 Hello, I'm
            </div>
            <br />

            {/* <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
              {hero.name}

              <span className="block text-violet-600 text-sm sm:text-lg md:text-xl mt-2">
                {hero.title}
              </span>
            </h1> */}
            <AnimatedText
              text={hero.name}
              tag="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black "
            />
            <br />

            <AnimatedText
              text={hero.title}
              tag="p"
              className="block text-violet-600 text-sm sm:text-lg md:text-xl mt-2"
              splitType="words"
            />

            <p className="text-gray-600 text-sm sm:text-base md:text-md mt-5 sm:mt-7 leading-7 sm:leading-8 max-w-xl mx-auto md:mx-0">
              {hero.description}
            </p>

            {/* BUTTONS */}
            <div className="flex justify-between sm:flex-row items-center gap-4 mt-8 sm:mt-10">
              <button
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:-translate-y-1 transition-all duration-300"
                onClick={handleWorkRedirect}
              >
                View My Work →
              </button>

              {hero.cv_link && (
                <a
                  href={`http://127.0.0.1:8000/storage/${hero.cv_link}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-white text-gray-800 font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200"
                >
                  Download CV
                </a>
              )}
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center md:justify-center flex-wrap gap-4 mt-4 sm:mt-4">
              {hero.facebook && (
                <a
                  href={hero.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center"
                >
                  <FaFacebookF size={16} />
                </a>
              )}

              {hero.instagram && (
                <a
                  href={hero.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center"
                >
                  <FaInstagram size={16} />
                </a>
              )}

              {hero.linkedin && (
                <a
                  href={hero.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow flex items-center justify-center"
                >
                  <FaLinkedinIn size={16} />
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center items-center mx-auto">
            <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[300px] md:h-[500px] bg-violet-200 rounded-full blur-3xl opacity-60"></div>

            {/* <div className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[430px] md:h-[430px] bg-violet-300 rounded-full"></div> */}

            {/* IMAGE */}
            <img
              // src="#"
              src="/dp5.png"
              alt="hero"
              className="relative z-10 w-[300px] h-full sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-cover rounded-full drop-shadow-[0_20px_40px_rgba(139,92,246,0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
