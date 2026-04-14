import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Messagebox() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // Predefined doctor names
    const doctorNames = ["Dr. Shubham", "Dr. Patel", "Dr. Ritesh", "Dr. Aryan"];

    // Predefined specializations
    const specializations = [
        "Physician", "Cardiology", "Physician", "Cardiology"
    ];

    // Function to generate a random past joined date
    const generateRandomDate = () => {
        const pastDate = new Date();
        pastDate.setFullYear(pastDate.getFullYear() - Math.floor(Math.random() * 5));
        return pastDate.toLocaleDateString();
    };

    // Creating doctor objects with names, specializations, and joined dates
    const doctors = doctorNames.map((name, index) => ({
        _id: `doctor-${index + 1}`,
        name,
        specialization: specializations[Math.floor(Math.random() * specializations.length)],
        joinedAt: generateRandomDate(),
    }));

    // Filter doctors based on search input
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex justify-center items-center min-h-screen ml-64">
            <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Search Doctors..."
                    className="border rounded-md px-3 py-2 w-full mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDoctors.map(({ _id, name, specialization, joinedAt }) => (
                        <div key={_id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                            <h2 className="font-semibold text-lg">{name}</h2>
                            <p className="text-sm text-gray-500">Specialization: {specialization}</p>
                            {/* <p className="text-sm text-gray-500">Joined at: {joinedAt}</p> */}

                            <div className="flex flex-col gap-2 mt-3">
                                <button className="w-full px-4 py-2 text-center border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition">
                                    View Prescription
                                </button>
                                <button className="w-full px-4 py-2 text-center border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition">
                                    View Tests
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





