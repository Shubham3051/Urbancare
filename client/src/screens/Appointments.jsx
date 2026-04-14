 import React, { useState, useEffect } from 'react';
import { apiClient } from '../../axios/axios.js';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch appointments from API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get("/appointment/getdocapp");
console.log("ss",response);

const today = new Date();
today.setHours(0, 0, 0, 0); 


        const formattedAppointments = response.data
          .map(appt => ({
            id: appt._id,
            name: appt.patientId.name,
            date: new Date(appt.date), // Store as Date object for comparison
            time: appt.timeSlot,
            status: appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
          }))
          .filter(appt => appt.date >= today); // Filter upcoming appointments

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Filter Logic
  const filteredAppointments = appointments.filter(appt =>
    (filter === "All" || appt.status === filter) &&
    appt.name.toLowerCase().includes(search.toLowerCase())
  );

  // Cancel Appointment Handler
  const handleCancel = async (id) => {
    try {
      await apiClient.get(`/appointment/update?status=cancelled&id=${id}`);
      setAppointments(prev =>
        prev.map(appt =>
          appt.id === id ? { ...appt, status: "Cancelled" } : appt
        )
      );
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel the appointment. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {["All", "Cancelled", "Confirmed"].map(status => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md text-sm font-semibold ${
              filter === status ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search appointments..."
          className="border rounded-md px-3 py-2 w-48"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Appointments List */}
      <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
      <div className="bg-white p-4 shadow-md rounded-md">
        {filteredAppointments.length ? (
          filteredAppointments.map(({ id, name, date, time, status }) => (
            <div key={id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">{date.toDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">{time}</p>
                <p
                  className={`text-sm font-semibold ${
                    status === "Cancelled"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {status}
                  {status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(id)}
                      className="bg-red-500 ml-2 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No upcoming appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
