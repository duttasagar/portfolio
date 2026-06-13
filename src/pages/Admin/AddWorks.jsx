


import React, { useEffect, useState } from "react";
import axios from "axios";

  // const API_URL = "http://127.0.0.1:8000/api";

// const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";
  const API_URL = import.meta.env.VITE_API_URL;

const IMAGE_URL = "http://127.0.0.1:8000";
const AddWorks = () => {
  const [works, setWorks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [work, setWork] = useState({
    title: "",
    image: null,
    description: "",
    technologies: "",
    projectLink: "",
  });

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get(`${API_URL}/works`);
      setWorks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setWork({
      ...work,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setWork({
      ...work,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", work.title);
    formData.append("description", work.description);
    formData.append("technologies", work.technologies);
    formData.append("project_link", work.projectLink);

    if (work.image) {
      formData.append("image", work.image);
    }

    try {
      if (editId) {
        await axios.post(`${API_URL}/works/${editId}`, formData);
      } else {
        await axios.post(`${API_URL}/works`, formData);
      }

      fetchWorks();
      resetForm();
      setEditId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setWork({
      title: item.title,
      image: null,
      description: item.description,
      technologies: item.technologies,
      projectLink: item.project_link,
    });

    setEditId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Project?")) return;

    try {
      await axios.delete(`${API_URL}/works/${id}`);
      fetchWorks();
    } catch (err) {
      console.log(err);
    }
  };

  const resetForm = () => {
    setWork({
      title: "",
      image: null,
      description: "",
      technologies: "",
      projectLink: "",
    });
  };

  const handleAddNew = () => {
    resetForm();
    setEditId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Recent Works
        </h1>

        <button
          onClick={handleAddNew}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        >
          + Add Work
        </button>

      </div>

      {/* PROJECTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {works.length > 0 ? (
          works.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border overflow-hidden flex flex-col h-full"
            >
              {item.image && (
                <img
                  src={`${IMAGE_URL}/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex flex-col flex-1">

                <h2 className="text-xl font-bold text-violet-700">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {item.description}
                </p>

                <div className="mt-4">
                  <p className="font-semibold">
                    Technologies
                  </p>

                  <p className="text-gray-500 mt-1">
                    {item.technologies}
                  </p>
                </div>

                                <div className="flex flex-wrap justify-end gap-2 mt-6">

                  <a
                    href={item.project_link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    View Live
                  </a>

                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No projects added yet.
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-2xl p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                {editId ? "Edit Project" : "Add Project"}
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl text-gray-500"
              >
                ×
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="title"
                value={work.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="description"
                value={work.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="text"
                name="technologies"
                value={work.technologies}
                onChange={handleChange}
                placeholder="React, Laravel, Spring Boot..."
                className="w-full border p-3 rounded-lg"
                required
              />

              <input
                type="url"
                name="projectLink"
                value={work.projectLink}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border p-3 rounded-lg"
                required
              />

              <div className="flex flex-col sm:flex-row justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                  }}
                  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg w-full sm:w-auto"
                >
                  {editId ? "Update Project" : "Save Project"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
};

export default AddWorks;