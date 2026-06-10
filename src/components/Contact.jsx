import React, { useEffect, useState } from "react";
import axios from "axios";
import SplitText from "../SplitText";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const [contact, setContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContact(res.data[0]);
    } catch (error) {
      console.log("Error fetching contact:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/contact-messages`, formData);

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log("Submit error:", error);
      alert("Failed to send message");
    }
  };

  return (
    <section
      id="contact"
      className="w-full  px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 lg:py-0 bg-[#f7f7fb]"
    >
      <div className="max-w-7xl mx-auto lg:pt-13 pb-10">
        {/* Heading */}
        {/* <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <p className="text-violet-600 font-semibold tracking-widest mb-2 sm:mb-3 text-sm sm:text-base">
            CONTACT ME
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Let’s Work Together
          </h2>

          <p className="text-gray-600 mt-4 sm:mt-5 max-w-2xl mx-auto leading-7 sm:leading-8 text-sm sm:text-base md:text-lg px-2 sm:px-0">
            Have a project idea or opportunity? Feel free to contact me.
          </p>
        </div> */}

        <div className="text-center mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center">
  <SplitText
    text="CONTACT ME"
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
    text="Let’s Work Together"
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
    text="Have a project idea or opportunity? Feel free to contact me."
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

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* LEFT SIDE */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8">
            {/* EMAIL */}
            <div className="bg-[#f7f7fb] rounded-2xl sm:rounded-[35px] p-5 sm:p-7 md:p-8 flex items-center shadow">
              <div className="flex items-center gap-3 sm:gap-5 w-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg sm:text-xl md:text-2xl flex-shrink-0">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">Email</p>

                  <a
                    href={`mailto:${contact?.email || ""}`}
                    className="text-sm sm:text-base md:text-lg font-bold hover:text-violet-600 break-all"
                  >
                    {contact?.email || "Loading..."}
                  </a>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="bg-[#f7f7fb] rounded-2xl sm:rounded-[35px] p-5 sm:p-7 md:p-8 flex items-center shadow">
              <div className="flex items-center gap-3 sm:gap-5 w-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg sm:text-xl md:text-2xl flex-shrink-0">
                  <FaPhoneAlt />
                </div>

                <div className="min-w-0">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">Phone</p>

                  <a
                    href={`tel:${contact?.phone || ""}`}
                    className="text-sm sm:text-base md:text-lg font-bold hover:text-violet-600 break-all"
                  >
                    {contact?.phone || "Loading..."}
                  </a>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-[#f7f7fb] rounded-2xl sm:rounded-[35px] p-5 sm:p-7 md:p-8 flex items-center shadow">
              <div className="flex items-center gap-3 sm:gap-5 w-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg sm:text-xl md:text-2xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">
                    Location
                  </p>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold">
                    Guwahati, Assam
                  </h3>
                </div>
              </div>
            </div>

            {/* LINKEDIN */}
            <div className="bg-[#f7f7fb] rounded-2xl sm:rounded-[35px] p-5 sm:p-7 md:p-8 flex items-center shadow">
              <div className="flex items-center gap-3 sm:gap-5 w-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg sm:text-xl md:text-2xl flex-shrink-0">
                  <FaLinkedinIn />
                </div>

                <div className="min-w-0">
                  <p className="text-gray-500 text-xs sm:text-sm mb-1">
                    LinkedIn
                  </p>

                  <a
                    href={contact?.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-base md:text-lg font-bold hover:text-violet-600 break-all"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-[#f7f7fb] rounded-2xl sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow mt-6 lg:mt-0">
            <div className="mb-5 sm:mb-6 text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                Send <span className="text-violet-600">Message</span>
              </h2>

              <p className="mt-2 text-gray-500 text-xs sm:text-sm md:text-base leading-6 max-w-md mx-auto lg:mx-0">
                Have a question or project idea? Send a message and I’ll reply
                soon.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 lg:space-y-6"
            >
              <input
                name="name"
                className="w-full p-3 sm:p-4 rounded-xl shadow-sm focus:outline-none focus:shadow-md focus:shadow-violet-200"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="email"
                className="w-full p-3 sm:p-4 rounded-xl shadow-sm focus:outline-none focus:shadow-md focus:shadow-violet-200"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                name="subject"
                className="w-full p-3 sm:p-4 rounded-xl shadow-sm focus:outline-none focus:shadow-md focus:shadow-violet-200"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                className="w-full p-3 sm:p-4 rounded-xl shadow-sm focus:outline-none focus:shadow-md focus:shadow-violet-200"
                rows="2"
                placeholder="Write Message"
                value={formData.message}
                onChange={handleChange}
              />

              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
