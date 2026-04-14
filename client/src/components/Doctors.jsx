import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserMd } from "react-icons/fa";
import "./doctors.css";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/doctors`;
        const response = await axios.get(apiUrl);

        if (response.data.success && Array.isArray(response.data.data)) {
          setDoctors(response.data.data);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        setError("Error fetching doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAppointment = (doctor) => {
    navigate(`/appointment/${doctor._id}`, { state: { doctor } });
  };

  const handleViewRatings = (doctorId) => {
    navigate(`/doctor/${doctorId}/ratings`, { state: { id: doctorId } });
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="doctors-container">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <div className="card-header">
              <FaUserMd size={50} color="#007bff" />
            </div>
            <div className="card-body">
              <h3>{doctor.name}</h3>
              <p>Experience: {doctor.experience} years</p>
              <p>Licence: {doctor.licence}</p>
              <p>Specialization: {doctor.specialization}</p>

              <div className="btn-group">
                <button
                  onClick={() => handleAppointment(doctor)}
                  className="appointment-btn"
                >
                  Book an Appointment
                </button>

                <button
                  onClick={() => handleViewRatings(doctor._id)}
                  className=" mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                >
                  View Ratings
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
};

export default Doctors;
