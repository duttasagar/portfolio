import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminHero = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  // const API_URL = "http://127.0.0.1:8000/api";
  // const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    show: false,
    text: "",
    type: "",
  });

  const [hero, setHero] = useState({
    name: "",
    title: "",
    description: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    image: null,
    cv_link: null,
  });

  const [existingId, setExistingId] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${API_URL}/hero`);

      if (res.data.hero) {
        setHero({
          ...res.data.hero,
          image: null,
          cv_link: null,
        });

        setImageUrl(res.data.image_url);
        setExistingId(res.data.hero.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setHero({
      ...hero,
      image: e.target.files[0],
    });
  };

  const handleCv = (e) => {
    setHero({
      ...hero,
      cv_link: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", hero.name);
    formData.append("title", hero.title);
    formData.append("description", hero.description);
    formData.append("facebook", hero.facebook);
    formData.append("instagram", hero.instagram);
    formData.append("linkedin", hero.linkedin);

    if (hero.image instanceof File) {
      formData.append("image", hero.image);
    }

    if (hero.cv_link instanceof File) {
      formData.append("cv_link", hero.cv_link);
    }

    try {
      if (existingId) {
        await axios.post(`${API_URL}/hero/${existingId}?_method=PUT`, formData);
      } else {
        await axios.post(`${API_URL}/hero`, formData);

        setMessage({
          show: true,
          text: "Hero Updated Successfully",
          type: "success",
        });
      }

      setIsModalOpen(false);

      fetchHero();
    } catch (error) {
      console.log(error);
      setMessage({
        show: true,
        text: "Failed to update hero",
        type: "error",
      });
    } finally {
      setLoading(false);

      setTimeout(() => {
        setMessage({
          show: false,
          text: "",
          type: "",
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {message.show && (
        <div
          className={`fixed top-5 right-5 z-[9999] px-6 py-3 rounded-lg shadow-lg text-white
      ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message.text}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Hero Section Management</h1>

      {/* Hero Preview Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero"
                className="w-56 h-56 rounded-xl object-cover border"
              />
            ) : (
              <div className="w-56 h-56 rounded-xl bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">{hero.name}</h2>

            <p className="text-violet-600 text-xl mt-2">{hero.title}</p>

            <p className="text-gray-600 mt-4 whitespace-pre-line">
              {hero.description}
            </p>

            <div className="mt-6 space-y-2">
              <p>
                <strong>Facebook:</strong> {hero.facebook}
              </p>

              <p>
                <strong>Instagram:</strong> {hero.instagram}
              </p>

              <p>
                <strong>LinkedIn:</strong> {hero.linkedin}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg"
            >
              Edit Hero
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Hero</h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={hero.name || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={hero.title || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                rows="4"
                name="description"
                placeholder="Description"
                value={hero.description || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                value={hero.facebook || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                value={hero.instagram || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={hero.linkedin || ""}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />

              <div>
                <label className="font-medium block mb-2">Upload CV</label>

                <input
                  type="file"
                  onChange={handleCv}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium block mb-2">Upload Image</label>

                <input
                  type="file"
                  onChange={handleImage}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              {/* <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg"
              >
                Update Hero
              </button> */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-3 rounded-lg flex items-center justify-center gap-2
  ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-violet-600 hover:bg-violet-700"
  }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  "Update Hero"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHero;
