import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faHeart,
  faSignOutAlt,
  faHome
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bg-green-200 shadow-md w-full px-6 py-2.5 z-50">
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex gap-5">
          {/* Home */}
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FontAwesomeIcon icon={faHome} className="text-blue-600 text-base" />
            <p className="text-sm font-semibold">Home</p>
          </div>

          {/* Add Doctor */}
          <div
            onClick={() => navigate("/dashboard/AddDoctor")}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FontAwesomeIcon icon={faUserDoctor} className="text-blue-600 text-base" />
            <p className="text-sm font-semibold">Add Doctor</p>
          </div>

          {/* Patients */}
          <div
            onClick={() => navigate("/dashboard/PatientList")}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FontAwesomeIcon icon={faHeart} className="text-blue-600 text-base" />
            <p className="text-sm font-semibold">Patients</p>
          </div>

          {/* Doctors */}
          <div
            onClick={() => navigate("/dashboard/DoctorList")}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FontAwesomeIcon icon={faUserDoctor} className="text-blue-600 text-base" />
            <p className="text-sm font-semibold">Doctors</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <Link to="/dashboard/notification" className="relative p-2 rounded-md bg-neutral-100 group hover:bg-gray-300 transition duration-300">
            <FiBell className="text-neutral-600 group-hover:text-blue-500 text-base transition-all duration-300" />
          </Link>

          {/* Profile */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FaUser className="text-blue-600 text-base" />
            <p className="text-sm font-semibold">Profile</p>
          </div>

          {/* Logout */}
          <div
            onClick={() => navigate("/SignIn")}
            className="flex items-center gap-2 cursor-pointer hover:bg-red-300 px-4 py-2 rounded-md transition duration-300"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600 text-base" />
            <p className="text-sm font-semibold text-red-600">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
