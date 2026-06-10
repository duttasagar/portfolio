


import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAbout = () => {
  const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const [summaryData, setSummaryData] = useState({
    role: "",
    summary: "",
  });

  const [qualifications, setQualifications] = useState([]);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const [isQualificationModalOpen, setIsQualificationModalOpen] =
    useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const [qualification, setQualification] = useState({
    title: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    fetchSummary();
    fetchQualifications();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API_URL}/summary`);

      if (res.data) {
        setSummaryData({
          role: res.data.role || "",
          summary: res.data.summary || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQualifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/qualifications`);
      setQualifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAboutChange = (e) => {
    setSummaryData({
      ...summaryData,
      [e.target.name]: e.target.value,
    });
  };

  const saveSummary = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/summary`, summaryData);

      alert("Summary saved successfully");
      setIsSummaryModalOpen(false);

      fetchSummary();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setQualification({
      ...qualification,
      [e.target.name]: e.target.value,
    });
  };

  const handleQualificationSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null) {
        await axios.put(
          `${API_URL}/qualifications/${qualification.id}`,
          qualification
        );

        alert("Qualification updated successfully");
      } else {
        await axios.post(
          `${API_URL}/qualifications`,
          qualification
        );

        alert("Qualification added successfully");
      }

      fetchQualifications();

      setQualification({
        title: "",
        year: "",
        description: "",
      });

      setEditIndex(null);
      setIsQualificationModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setQualification(item);
    setEditIndex(item.id);
    setIsQualificationModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete qualification?")) return;

    try {
      await axios.delete(`${API_URL}/qualifications/${id}`);
      fetchQualifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">

        <h1 className="text-2xl md:text-3xl font-bold">
          About Section Management
        </h1>

        <button
          onClick={() => setIsSummaryModalOpen(true)}
          className="w-full lg:w-auto bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg"
        >
          Edit About Summary
        </button>

      </div>

      {/* SUMMARY CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-10">

        <h2 className="text-xl md:text-2xl font-bold mb-5">
          About Summary
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">
              Professional Role
            </p>

            <h3 className="text-lg md:text-xl font-semibold text-violet-700">
              {summaryData.role || "No role added"}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Summary
            </p>

            <p className="text-gray-700 leading-7">
              {summaryData.summary || "No summary available"}
            </p>
          </div>

        </div>

      </div>

      {/* QUALIFICATION HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

        <h2 className="text-xl md:text-2xl font-bold">
          Qualifications
        </h2>

        <button
          onClick={() => {
            setQualification({
              title: "",
              year: "",
              description: "",
            });

            setEditIndex(null);
            setIsQualificationModalOpen(true);
          }}
          className="w-full md:w-auto bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Qualification
        </button>

      </div>

      {/* QUALIFICATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {qualifications.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-5 md:p-6"
          >
            <h3 className="text-lg md:text-xl font-bold text-violet-700">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-700">
              {item.description}
            </p>

            <p className="text-gray-500 mt-3">
              {item.year}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mt-5">

              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
            {/* SUMMARY MODAL */}
      {isSummaryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-2xl p-5 md:p-8 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl md:text-2xl font-bold">
                Edit About Summary
              </h2>

              <button
                onClick={() => setIsSummaryModalOpen(false)}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            <form onSubmit={saveSummary} className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Professional Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={summaryData.role}
                  onChange={handleAboutChange}
                  placeholder="Full Stack Developer"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Summary
                </label>

                <textarea
                  rows="6"
                  name="summary"
                  value={summaryData.summary}
                  onChange={handleAboutChange}
                  placeholder="Write your professional summary..."
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setIsSummaryModalOpen(false)}
                  className="w-full sm:w-auto border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg"
                >
                  Save Summary
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* QUALIFICATION MODAL */}
      {isQualificationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-xl p-5 md:p-8 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl md:text-2xl font-bold">
                {editIndex !== null
                  ? "Edit Qualification"
                  : "Add Qualification"}
              </h2>

              <button
                onClick={() => {
                  setIsQualificationModalOpen(false);
                  setEditIndex(null);
                  setQualification({
                    title: "",
                    year: "",
                    description: "",
                  });
                }}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleQualificationSubmit}
              className="space-y-5"
            >

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Qualification Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="BSc IT"
                  value={qualification.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  placeholder="University Name"
                  value={qualification.description}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Year
                </label>

                <input
                  type="text"
                  name="year"
                  placeholder="2020 - 2023"
                  value={qualification.year}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setIsQualificationModalOpen(false);
                    setEditIndex(null);
                  }}
                  className="w-full sm:w-auto border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg"
                >
                  {editIndex !== null ? "Update" : "Save"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AddAbout;