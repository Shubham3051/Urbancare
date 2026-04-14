import React from 'react'
 
import { useState } from 'react'
//dob experience specialization current location current hospital clinic avilable hours
//profile pic name email phone number
//edit profile
import { Navigate } from 'react-router-dom'
function Profile() {
   
    const [edit,setEdit]=useState(false);
    let doctor={
        Image:"https://imgs.search.brave.com/LcHTTXrctnmxLNGhNUsTwhdDkLHfyXNC3I9rGFHoLpk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTIz/NDcyODcvcGhvdG8v/cG9ydHJhaXQtb2Yt/YS1kb2N0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTR2/bm1MX1VyRUZ3dHhx/dVR0Mk5hRlpwQlp4/LUlXN0JQSHVaallJ/ZFh5TWM9",
        name:"Doctor Name",
        email:"ohriparas2005@gmail.com",
        phone:"1234567890",
        dob:"September,1978",
        experience:"20 Years",
        specialization:["Dermatologist","Cosmetic Surgery"],
        location:"1-1-1 Banjara Hills, Hyderabad, Telangana - 500034",
        hours:"Mon-Sat, 09:00 AM - 05:00 PM",
    hospital:"Apollo Hospital, Jubilee Hills, Hyderabad, Telangana - 500033"}
        const [doctorimage,setdoctorimage]=useState(doctor.Image);
        const [doctorname,setdoctorname]=useState(doctor.name);
        const [doctoremail,setdoctoremail]=useState(doctor.email);
        const [doctorphone,setdoctorphone]=useState(doctor.phone);
        const [doctordob,setdoctordob]=useState(doctor.dob);
        const [doctorexperience,setdoctorexperience]=useState(doctor.experience);
        const [doctorspecialization,setdoctorspecialization]=useState(doctor.specialization);
        const [doctorlocation,setdoctorlocation]=useState(doctor.location);
        const [doctorhospital,setdoctorhospital]=useState(doctor.hospital);
        const [doctorhours,setdoctorhours]=useState(doctor.hours);
        const [formData, setFormData] = useState({
            name: doctorname,
            email:  doctoremail,
            phone:  doctorphone,
            dob: doctordob,
            experience: doctorexperience,
            specialization: doctorspecialization,
            location: doctorlocation,
            hospital: doctorhospital,
            availableHours: doctorhours,
          });
           const submitHandler = (e) => {
            setdoctorname(formData.name);
            setdoctoremail(formData.email);
            setdoctorphone(formData.phone);
            setdoctordob(formData.dob);
            setdoctorexperience(formData.experience);
            setdoctorspecialization(formData.specialization);

            setdoctorlocation(formData.location);
            setdoctorhospital(formData.hospital);
            setdoctorhours(formData.availableHours);
            setEdit(false);
            e.preventDefault();
           }
           

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "specialization" ? value.split(", ") : value
    }));
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    {/* Header Section */}
    {!edit&&
    <div>
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src="https://imgs.search.brave.com/LcHTTXrctnmxLNGhNUsTwhdDkLHfyXNC3I9rGFHoLpk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTIz/NDcyODcvcGhvdG8v/cG9ydHJhaXQtb2Yt/YS1kb2N0b3IuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTR2/bm1MX1VyRUZ3dHhx/dVR0Mk5hRlpwQlp4/LUlXN0JQSHVaallJ/ZFh5TWM9"
          alt="Doctor"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{doctorname}</h2>
          <p className="text-gray-600">{doctoremail}</p>
          <p className="text-gray-600">{doctorphone}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p>
          <strong>Date of Birth:</strong> <span className="text-red-500">
              {doctordob}
          </span>
        </p>
        <p>
          <strong>Years of Experience:</strong>{" "}
          <span className="text-red-500">{doctorexperience}</span>
        </p>

        <div>
          <strong>Specialization:</strong>{" "}
          {doctorspecialization.map((specialization) => (
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md ml-2">
              {specialization}
            </span>
          ))}
          
        </div>

        <p>
          <strong>Current Location:</strong>{" "}
          <span className="text-red-500">{doctorlocation}</span>
        </p>
        <p>
          <strong>Current Hospital/Clinic:</strong>{" "}
          <span className="text-red-500">{doctorhospital}</span>
        </p>
        <p>
          <strong>Available Hours:</strong>{" "}
          <span className="text-red-500">{doctorhours}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button onClick={()=>{setEdit(true)}} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md">
          Edit Profile
        </button>
      </div>
    </div>}
      {edit && 
    
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

    <form className="space-y-4">
      {/* Name */}
      <div>
        <label className="block font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block font-semibold">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block font-semibold">Date of Birth</label>
        <input
          type="month"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block font-semibold">Years of Experience</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Specialization */}
      <div>
        <label className="block font-semibold">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization.join(", ")}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <p className="text-sm text-gray-500">Separate specializations with commas.</p>
      </div>

      {/* Location */}
      <div>
        <label className="block font-semibold">Location</label>
        <textarea
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Hospital */}
      <div>
        <label className="block font-semibold">Current Hospital/Clinic</label>
        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Available Hours */}
      <div>
        <label className="block font-semibold">Available Hours</label>
        <input
          type="text"
          name="availableHours"
          value={formData.availableHours}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button type="submit" onClick={submitHandler} className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Save Changes
        </button>
        <button type="button" onClick ={()=>{
            setEdit(false);
        }}className="px-4 py-2 bg-gray-500 text-white rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  </div>
}
    
  </div>
  )
}

export default Profile
