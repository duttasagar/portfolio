import axios from "axios";
import { useEffect, useState } from "react";

const AddSkills = () => {
  const API_URL = "http://127.0.0.1:8000/api";

  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/skills/${editId}`, {
          skill_name: skillName,
        });

        alert("Skill updated successfully");
      } else {
        await axios.post(`${API_URL}/skills`, {
          skill_name: skillName,
        });

        alert("Skill added successfully");
      }

      fetchSkills();

      setSkillName("");
      setEditId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Skill?")) return;

    try {
      await axios.delete(`${API_URL}/skills/${id}`);
      fetchSkills();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (skill) => {
    setSkillName(skill.skill_name);
    setEditId(skill.id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSkillName("");
    setEditId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Skills Management
        </h1>

        <button
          onClick={handleAddNew}
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-lg p-10 text-center">
            <p className="text-gray-500">No Skills Added Yet</p>
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl shadow-lg border p-5 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-bold text-violet-700 break-words">
                {skill.skill_name}
              </h3>

              {/* Small Buttons */}
              <div className="flex gap-2 mt-6 flex-wrap">
                <button
                  onClick={() => handleEdit(skill)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(skill.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">
                {editId ? "Edit Skill" : "Add Skill"}
              </h2>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditId(null);
                  setSkillName("");
                }}
                className="text-3xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="React JS"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />

              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditId(null);
                    setSkillName("");
                  }}
                  className="w-full sm:w-auto border px-5 py-3 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg"
                >
                  {editId ? "Update Skill" : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkills;