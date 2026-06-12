import React, { useState, useEffect } from "react";
import axios from "axios";

const AddContact = () => {
    const API_URL = "http://127.0.0.1:8000/api";

  // const API_URL = "https://portfolio-backend-1-sbnp.onrender.com/api";

  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [contact, setContact] = useState({
    email: "",
    phone: "",
    linkedin: "",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_URL}/contacts`);
      setContacts(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null) {
        const id = contacts[editIndex].id;
        await axios.put(`${API_URL}/contacts/${id}`, contact);
      } else {
        await axios.post(`${API_URL}/contacts`, contact);
      }

      fetchContacts();

      setContact({ email: "", phone: "", linkedin: "" });
      setEditIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  const handleEdit = (index) => {
    setContact(contacts[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async (index) => {
    try {
      const id = contacts[index].id;
      await axios.delete(`${API_URL}/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleAddNew = () => {
    setEditIndex(null);
    setContact({ email: "", phone: "", linkedin: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Contact Management
        </h1>

        <button
          onClick={handleAddNew}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg w-full sm:w-auto"
        >
          + Add Contact
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {contacts.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md border p-4 sm:p-6"
          >
            <p className="text-gray-700 break-words">{item.email}</p>
            <p className="text-gray-700 break-words">{item.phone}</p>

            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-words"
            >
              LinkedIn
            </a>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-2 rounded w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-5 sm:p-6 shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-violet-400"
              />

              <input
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-violet-400"
              />

              <input
                name="linkedin"
                value={contact.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn"
                className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-violet-400"
              />

              <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 w-full rounded">
                {editIndex !== null ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full border py-2 rounded mt-2 text-gray-600"
              >
                Cancel
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AddContact;