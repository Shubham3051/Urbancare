import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../axios/axios.js";

function Messagebox() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [chat, setChat] = useState(false);

    // Fetch patients data
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get('/chat/docchats');
                console.log("API Response:", response.data); // Check data structure
                setPatients(Array.isArray(response.data.chats) ? response.data.chats : []);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };
        fetchPatients();
    }, []);

    // Filter patients based on search input
    const filteredPatients = patients.filter((patient) =>
        patient.userone?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-green-700 mb-4">HealthConnect</h1>

                <input
                    type="text"
                    placeholder="Search patients..."
                    className="border rounded-md px-3 py-2 w-full mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPatients.map(({ _id, userone, createdAt }) => (
                        <div key={_id} className="border p-4 rounded-lg shadow-sm bg-white">
                            <h2 className="font-semibold text-lg">{userone?.name}</h2>
                            <p className="text-sm text-gray-500">Joined at: {new Date(createdAt).toLocaleDateString()}</p>

                            <button
    onClick={() => {
        setPatientName(userone?.name);
        navigate(`/docdashboard/message/${_id}`, { state: { name: userone?.name, chatId: _id } });
        setChat(true);
    }}
    className="mt-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition mr-2"
>
    View Chat
</button>
<button
    onClick={() => {
        setPatientName(userone?.name);
        navigate(`/docdashboard/message/${_id}`, { state: { name: userone?.name, chatId: _id } });
        setChat(true);
    }}
    className="mt-3 px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
>
    View Prescription
</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Messagebox;
