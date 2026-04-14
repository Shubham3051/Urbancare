import { apiClient } from "../../axios/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Messagebox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await apiClient.get('/chat/allchat');
        console.log(response);
        setDoctors(response.data.chats); 
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((chat) =>
    chat.usertwo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-green-700 text-white p-4 mt-[5vh] ml-[-2vw]">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      </div>

      <div className="mt-10 p-6 bg-white w-3/4">
        <h1 className="text-2xl font-bold text-green-700 mb-4"></h1>

        <input
          type="text"
          placeholder="Search doctors..."
          className="border rounded-md px-3 py-2 w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map(({ _id, usertwo }) => (
            <div key={_id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="font-semibold text-lg">{usertwo.name}</h2>
              <p className="text-sm text-gray-500">
                Specialization: {usertwo.specialization}
              </p>

              <p className="text-sm text-gray-700 mt-1">Schedule:</p>
              <ul className="text-sm text-gray-600">
                {usertwo.schedule.map((scheduleItem) => (
                  <li key={scheduleItem._id}>{scheduleItem.day}: {scheduleItem.time}</li>
                ))}
              </ul>

              <div className="mt-3 space-x-2">
                <button
                  onClick={() => navigate(`/messagebox/message/${_id}`, { state: { name: usertwo.name, id: _id } })}
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
                >
                  Chat with Doctor
                </button>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messagebox;