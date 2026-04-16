import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../../axios/axios.js";

const Appointment = () => {
  const { id: doctorId } = useParams();  
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const todayDate = new Date().toLocaleDateString('en-CA'); // Correct today's date
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch doctor details based on doctorId
  const fetchDoctorDetails = async () => {
    try {
      const response = await apiClient.get(`/api/${doctorId}`);
      setDoctor(response.data.data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      alert("Failed to fetch doctor details. Please try again.");
    }
  };

  // Fetch slots based on selected date and doctor
  const fetchSlots = async () => {
    if (!selectedDate || !doctorId) return;

    try {
      const response = await apiClient.get(
        `/appointment/slots?doctorId=${doctorId}&date=${selectedDate}`
      );

      const { availableSlots, bookedSlots } = response.data;

      const allSlotsOrder = [
        "9:00 - 9:20", "9:20 - 9:40", "9:40 - 10:00", "10:00 - 10:20",
        "10:20 - 10:40", "10:40 - 11:00", "11:00 - 11:20", "11:20 - 11:40",
        "11:40 - 12:00", "12:00 - 12:20", "12:20 - 12:40", "12:40 - 1:00",
        "2:00 - 2:20", "2:20 - 2:40", "2:40 - 3:00", "3:00 - 3:20",
        "3:20 - 3:40", "3:40 - 4:00", "4:00 - 4:20", "4:20 - 4:40",
        "4:40 - 5:00"
      ];

      const rawSchedule = [
        ...availableSlots.map((time) => ({ time, status: "available" })),
        ...bookedSlots.map((time) => ({ time, status: "booked" }))
      ];

      const updatedSchedule = rawSchedule.sort((a, b) => {
        return allSlotsOrder.indexOf(a.time) - allSlotsOrder.indexOf(b.time);
      });

      setSchedule(updatedSchedule);
    } catch (error) {
      console.error("Error fetching slots:", error);
      alert("Failed to fetch slots. Please try again.");
    }
  };

// Fetch doctor only once
useEffect(() => {
  fetchDoctorDetails();
}, [doctorId]);

// Fetch slots when date or doctorId changes
useEffect(() => {
  fetchSlots();
}, [selectedDate, doctorId]);

  const openPopup = (slot) => {
    setSelectedSlot(slot);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedSlot(null);
    setIsPopupVisible(false);
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    try {
      const response = await apiClient.post(
        `/appointment/create?doctorId=${doctorId}`,
        {
          date: selectedDate,
          timeSlot: selectedSlot.time
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert(` Appointment booked successfully for ${doctor?.name} at ${selectedSlot.time}`);

        try {
          const chat = await apiClient.post(`/chat/chat?doctor=${doctor?.name}`);
          console.log("Chat created successfully:", chat.data);
          setSuccessMessage(
            ` Your appointment is scheduled for ${selectedSlot.time}. You can chat with ${doctor?.name} at that time from the Messagebox.`
          );
        } catch (chatError) {
          console.error("Error creating chat:", chatError);
          alert(`⚠️ Appointment booked, but chat creation failed.`);
        }

        closePopup();
        fetchSlots();  // Refresh slots after booking
      }
    } catch (error) {
      alert(` Failed to book appointment: ${error.response?.data?.error || "Server error"}`);
    }
  };

  return (
    <div className="flex justify-end pr-10 pt-10 relative">
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md w-72">
          {successMessage}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Book an Appointment with {doctor?.name || "Unknown Doctor"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {schedule.map((slot, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-md cursor-pointer 
                ${slot.status === "available" ? "bg-green-500 text-white" : ""}
                ${slot.status === "booked" ? "bg-red-500 text-white cursor-not-allowed" : ""}`}
              onClick={() => slot.status === "available" && openPopup(slot)}
            >
              {slot.time}
            </div>
          ))}
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-bold mb-4">Confirm Booking</h3>
            <p className="mb-2">Doctor: {doctor?.name || "Unknown Doctor"}</p>
            <p className="mb-2">Date: {selectedDate || "Not selected"}</p>
            <p className="mb-4">Time Slot: {selectedSlot?.time}</p>

            <div className="flex justify-end gap-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleBooking}
              >
                Book Slot
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
