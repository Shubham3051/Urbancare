import React, { useState, useEffect } from "react";
import { apiClient } from "../../axios/axios.js";

function Patient() {
  const [patients, setPatients] = useState([]);
  const [addPatients, setAddPatients] = useState(false);
  const [patientDetail, setPatientDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    age: 1,
    bloodGroup: "O+",
    pwd:"",
    conditions: "Hypertension, Allergies",
    details: ["", "", "", "", ""],
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiClient.get("/chat/docchats");
        console.log("sa",response);
        
        const filteredPatients = response.data.chats
          .map(chat => chat.userone)
          .filter(patient => patient); // Filter out null/undefined entries

        setPatients(filteredPatients);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch patient data.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleDetailChange = (index, value) => {
    setUser((prevUser) => {
      const newDetails = [...prevUser.details];
      newDetails[index] = value;
      return { ...prevUser, details: newDetails };
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {!addPatients && !patientDetail && (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setAddPatients(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              + Add Patient
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {patients.map((patient) => (
              <PatientCard
                key={patient._id}
                patient={patient}
                setPatientDetail={setPatientDetail}
                setUser={setUser}
              />
            ))}
          </div>
        </div>
      )}

      {addPatients && (
        <div>
          Add Patients
          <button
            className="bg-gray-400 rounded-lg"
            onClick={() => setAddPatients(false)}
          >
            Back
          </button>
        </div>
      )}

      {patientDetail && (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">HealthTrack - User Details</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700">Patient's Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            {user.details.map((detail, index) => (
              <div className="mb-2" key={index}>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  placeholder="Enter new detail"
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setPatientDetail(false)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setPatientDetail(false);
                  setUser((prevUser) => ({
                    ...prevUser,
                    details: prevUser.details.map(() => ""),
                  }));
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PatientCard = ({ patient, setPatientDetail, setUser }) => {
  const { name, email, age, bloodGroup, conditions } = patient || {};

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="text-lg font-semibold">{name || "Unknown Patient"}</h2>
      <p className="text-sm text-gray-600">Email: {email || "N/A"}</p>
      <p className="text-sm text-gray-600">Age: {age || "N/A"}</p>
      <p className="text-sm text-gray-600">Blood Group: {bloodGroup || "N/A"}</p>
      <p className="text-sm text-gray-600">Conditions: {conditions || "N/A"}</p>

      <button
        onClick={() => {

          setUser((prevUser) => ({
            ...prevUser,
            name: patient?.name || "",
            age: patient?.age || "",
            bloodGroup: patient?.bloodGroup || "",
            conditions: patient?.conditions || "",
          }));
          setPatientDetail(true);
        }}
        className="mt-2 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
      >
        Details
      </button>
    </div>
  );
};

export default Patient;
