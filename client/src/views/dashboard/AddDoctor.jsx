


import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const AddDoctor = ({ data, reload, setReload, openModal, setOpenModal }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    experience: data?.experience || "",
    licence: data?.licence || "",
    specialization: data?.specialization || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ Fixed: Declared error state

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Debugging: Log formData before sending
    console.log("📤 Form Data:", formData);
  
    if (!formData.name || !formData.experience || !formData.licence || !formData.specialization) {
      console.log("❌ Validation Failed: Missing Fields");
      setError("All fields are required!");
      return;
    }
  
    setError("");
    setLoading(true);
  
    try {
      console.log("🚀 Sending API request to:", import.meta.env.VITE_API_URL);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/doctors`,
        formData,
        { headers: { "Content-Type": "application/json" } } // Ensure JSON format
      );
  
      console.log("✅ Response Data:", response.data);
  
      if (response?.status === 201) {
        toast.success("Doctor added successfully!");
        setFormData({ name: "", experience: "", licence: "", specialization: "" });
        setReload(!reload);
        setOpenModal(!openModal);
      }
    } catch (err) {
      console.error("❌ Error adding doctor:", err.response?.data || err.message);
      setError(err?.response?.data?.message || "Failed to add doctor.");
      toast.error(err?.response?.data?.message || "Failed to add doctor.");
    } finally {
      setLoading(false);
    }
  };
  



  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add Doctor</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>} {/* ✅ Fixed: Display error message */}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Doctor Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Doctor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter doctor name"
          />
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter doctor's experience"
          />
        </div>

        {/* Medical Licence */}
        <div>
          <label htmlFor="licence" className="block text-sm font-medium text-gray-700">Medical Licence Number</label>
          <input
            type="text"
            id="licence"
            name="licence"
            value={formData.licence}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Doctor Licence Number"
          />
        </div>

        {/* Specialization */}
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="mt-1 p-3 border block w-full rounded-xl border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Doctor's Specialization"
          />
        </div>

        {/* Submit Button */}
        {loading ? (
          <button
            disabled
            className="flex justify-center mt-2 px-4 py-2 bg-blue-800 text-white rounded-xl cursor-not-allowed"
          >
            <ColorRing
              visible
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </button>
        ) : (
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-700">
            Add Doctor
          </button>
        )}
      </form>
    </div>
  );
};

export default AddDoctor;
