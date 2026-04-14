import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const defaultData = {
    name: "",dob: "",
    age: "",
    
    bloodGroup: "",
    location: "",
    image: null,
  };

  const [formData, setFormData] = useState({ ...defaultData });
  const [savedData, setSavedData] = useState(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedData"));
    console.log("useEffect: savedData from localStorage:", saved);
    if (saved) {
      setSavedData(saved);
      setFormData(saved); // Initialize formData with saved data
    }
  }, []);

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange: name=${name}, value=${value}`);

    // If the DOB field is changed, calculate the age
    if (name === "dob") {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      // Adjust age if the birthday hasn't occurred yet this year
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      // Update both dob and age in formData
      setFormData((prev) => ({
        ...prev,
        dob: value,
        age: age.toString(), // Convert age to string to match input type
      }));
    } else {
      // For all other fields, update normally
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save data to localStorage and update savedData
  const handleSave = () => {
    setSavedData(formData); // Update savedData with the current formData
    localStorage.setItem("savedData", JSON.stringify(formData)); // Save to localStorage
  };

  // Revert formData to the last saved state (or default if no saved data)
  const handleCancel = () => {
    console.log("handleCancel clicked");
    if (savedData) {
      console.log("Reverting to savedData:", savedData);
      setFormData({ ...savedData }); // Revert to savedData
    } else {
      console.log("No savedData, reverting to default");
      setFormData({ ...defaultData }); // Revert to defaultData
    }
  };

  // Trigger file input when profile picture is clicked
  const handleProfileClick = () => {
    console.log("handleProfileClick called");
    document.getElementById("profileInput").click();
  };

  // Remove the profile image and reset image field
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null })); // Only reset the image field
  };

  return (
    <div className="profile-container">
      {/* Left Card (Display Saved Data) */}
      <div className="card">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
        <div className="circle-6"></div>

        <div className="profile-picture">
          <input
            type="file"
            accept="image/*"
            id="profileInput"
            onChange={handleImageChange}
            capture="user"
            style={{ display: "none" }}
          />
          <label htmlFor="profileInput" className="profile-picture-label">
            {formData.image ? (
              <div className="image-container">
                <img
                  src={formData.image}
                  alt="Profile"
                  onClick={handleProfileClick}
                  className="profile-image"
                />
                <button
                  className="remove-image-button"
                  onClick={handleRemoveImage}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <span className="camera-icon" onClick={handleProfileClick}>
                <FontAwesomeIcon icon={faCamera} />
              </span>
            )}
          </label>
        </div>
        <h2>Personal Information</h2>
        {savedData ? (
          <>
            <p>
              <b>Name:</b> {savedData.name}
            </p><p>
              <b>Date of Birth:</b> {savedData.dob}
            </p>
            <p>
              <b>Age:</b> {savedData.age}
            </p>
            
            <p>
              <b>Blood Group:</b> {savedData.bloodGroup}
            </p>
            <p>
              <b>Location:</b> {savedData.location}
            </p>
          </>
        ) : (
          <p>No details available. Please update your profile.</p>
        )}
      </div>

      {/* Right Card (Edit Form) */}
      <div className="card form-card">
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
        <div className="circle-4"></div>
        <div className="circle-5"></div>
        <div className="circle-6"></div>

        <h2>Edit Your Details</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /> <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
       
        <label>Blood Group:</label>
        <input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        />
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <div className="buttons">
          <button className="save" onClick={handleSave}>
            Save
          </button>
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;



// import React, { useState, useEffect } from "react";
// import "./ProfileCard.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Profile = () => {
//   const defaultData = {
//     name: "",
//     age: "",
//     bloodGroup: "",
//     location: "",
//     image: null,
//   };

//   const [formData, setFormData] = useState({ ...defaultData });
//   const [savedData, setSavedData] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("User not authenticated. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch("http://localhost:8080/api/patient/profile", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) throw new Error("Unauthorized: Invalid or expired token.");
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setSavedData(formData);
//     localStorage.setItem("savedData", JSON.stringify(formData));
//   };

//   return (
//     <div className="profile-container">
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: "red" }}>{error}</p>
//       ) : profile ? (
//         <div className="card">
//           <h2>Personal Information</h2>
//           <p><b>Name:</b> {profile.name}</p>
//           <p><b>Age:</b> {profile.age}</p>
//           <p><b>Blood Group:</b> {profile.bloodGroup}</p>
//         </div>
//       ) : (
//         <p>No profile data found.</p>
//       )}

//       <div className="card form-card">
//         <h2>Edit Your Details</h2>
//         <label>Name:</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         <label>Age:</label>
//         <input type="number" name="age" value={formData.age} onChange={handleChange} />
//         <label>Blood Group:</label>
//         <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
//         <button className="save" onClick={handleSave}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;




// // import React, { useState, useEffect } from "react";
// // import "./ProfileCard.css";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

// // const Profile = () => {
// //   const defaultData = {
// //     name: "",
// //     age: "",
// //     bloodGroup: "",
// //     location: "",
// //     image: null,
// //   };

// //   const [formData, setFormData] = useState({ ...defaultData });
// //   const [savedData, setSavedData] = useState(null);


// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           setError("User not authenticated. Please log in.");
// //           setLoading(false);
// //           return;
// //         }
  
// //         const response = await fetch("http://localhost:8080/api/patient/profile", {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${token}`,  // ✅ Correct token format
// //             "Content-Type": "application/json",
// //           },
// //         });
  
// //         if (!response.ok) {
// //           if (response.status === 401) throw new Error("Unauthorized: Invalid or expired token.");
// //           throw new Error(`Error ${response.status}: ${response.statusText}`);
// //         }
  
// //         const data = await response.json();
// //         setProfile(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     fetchProfile();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSave = () => {
// //     setSavedData(formData);
// //     localStorage.setItem("savedData", JSON.stringify(formData));
// //   };

// //   return (
// //     <div className="profile-container">
// //       <div className="card">
// //         <h2>Personal Information</h2>
// //         {savedData ? (
// //           <>
// //             <p><b>Name:</b> {savedData.name}</p>
// //             <p><b>Age:</b> {savedData.age}</p>
// //             <p><b>Blood Group:</b> {savedData.bloodGroup}</p>
// //           </>
// //         ) : (
// //           <p>No details available. Please update your profile.</p>
// //         )}
// //       </div>

// //       <div className="card form-card">
// //         <h2>Edit Your Details</h2>
// //         <label>Name:</label>
// //         <input type="text" name="name" value={formData.name} onChange={handleChange} />
// //         <label>Age:</label>
// //         <input type="number" name="age" value={formData.age} onChange={handleChange} />
// //         <label>Blood Group:</label>
// //         <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
// //         <button className="save" onClick={handleSave}>Save</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;



// // import React, { useState, useEffect } from "react";

// // const ProfileCard = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         if (!token) {
// //           setError("User not authenticated. Please log in.");
// //           setLoading(false);
// //           return;
// //         }

// //         const response = await fetch("http://localhost:8080/api/patient/profile", {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error(`Error ${response.status}: ${response.statusText}`);
// //         }

// //         const data = await response.json();
// //         setProfile(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProfile();
// //   }, []);

// //   return (
// //     <div className="flex justify-center items-center h-screen">
// //       <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center border border-gray-200">
// //         <h2 className="text-xl font-semibold text-gray-800">Patient Profile</h2>

// //         {loading ? (
// //           <p className="text-gray-600 mt-4">Loading...</p>
// //         ) : error ? (
// //           <p className="text-red-500 mt-4">{error}</p>
// //         ) : (
// //           <>
// //             <p className="mt-4">
// //               <span className="font-semibold">Name:</span> {profile?.name || "N/A"}
// //             </p>
// //             <p>
// //               <span className="font-semibold">Age:</span> {profile?.age || "N/A"}
// //             </p>
// //             <p>
// //               <span className="font-semibold">Blood Group:</span> {profile?.bloodGroup || "N/A"}
// //             </p>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileCard;
