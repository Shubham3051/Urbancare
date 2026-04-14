import React from "react";

const NoPatients = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          No New Registered Patients
        </h2>
        <p className="text-gray-600 mt-2">Please check back later for updates.</p>
      </div>
    </div>
  );
};

export default NoPatients;
