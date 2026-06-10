

import React, { useState, useEffect } from "react";
import axios from "axios";

const AddExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [experience, setExperience] = useState({
    companyName: "",
    role: "",
    description: "",
    duration: "",
  });

  const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_URL}/experiences`);
      setExperiences(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (experience.id) {
        await axios.put(
          `${API_URL}/experiences/${experience.id}`,
          experience
        );
      } else {
        await axios.post(`${API_URL}/experiences`, experience);
      }

      fetchExperiences();

      setExperience({
        companyName: "",
        role: "",
        description: "",
        duration: "",
      });

      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Experience?")) return;

    try {
      await axios.delete(`${API_URL}/experiences/${id}`);
      fetchExperiences();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setExperience({
      id: item.id,
      companyName: item.company_name,
      role: item.role,
      description: item.description,
      duration: item.duration,
    });

    setEditIndex(item.id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setExperience({
      companyName: "",
      role: "",
      description: "",
      duration: "",
    });

    setEditIndex(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Experience Management
        </h1>

        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          + Add Experience
        </button>

      </div>

      {/* Experience Cards */}
      <div className="space-y-5">

        {experiences.length > 0 ? (
          experiences.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-violet-700 break-words">
                    {item.company_name}
                  </h2>

                  <p className="text-base sm:text-lg font-semibold text-gray-700 mt-1">
                    {item.role}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.duration}
                  </p>

                  <p className="text-gray-600 mt-4 leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>

                {/* <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div> */}

                <div className="flex items-center justify-end gap-3 mt-5">
  <button
    onClick={() => handleEdit(skill)}
    className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg text-sm transition"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(skill.id)}
    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm transition"
  >
    Delete
  </button>
</div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <p className="text-gray-500 text-lg">
              No experiences added yet.
            </p>
          </div>
        )}
      </div>

            {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                {editIndex !== null
                  ? "Edit Experience"
                  : "Add Experience"}
              </h2>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditIndex(null);
                }}
                className="text-gray-500 hover:text-gray-800 text-3xl"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={experience.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={experience.role}
                  onChange={handleChange}
                  placeholder="Enter role"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={experience.description}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities and achievements"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={experience.duration}
                  onChange={handleChange}
                  placeholder="Jan 2024 - Present"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditIndex(null);
                  }}
                  className="w-full sm:w-auto px-5 py-3 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg"
                >
                  {editIndex !== null
                    ? "Update Experience"
                    : "Save Experience"}
                </button>

              </div>
            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AddExperience;