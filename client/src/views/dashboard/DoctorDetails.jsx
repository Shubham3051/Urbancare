import React from "react";

const DoctorDetails = ({ doctor }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md space-y-3">
      <h2 className="text-2xl font-bold text-gray-800">{doctor?.name}</h2>
      <p>
        <strong>Experience:</strong> {doctor?.experience} years
      </p>
      <p>
        <strong>Licence:</strong> {doctor?.licence}
      </p>
      <p>
        <strong>Specialization:</strong> {doctor?.specialization}
      </p>
      <div>
        <strong>Schedule:</strong>
        <ul className="list-disc ml-4">
          {doctor?.schedule?.length > 0 ? (
            doctor.schedule.map((slot, index) => (
              <li key={index}>
                {slot.day} - {slot.time}
              </li>
            ))
          ) : (
            <p>No schedule available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDetails;
