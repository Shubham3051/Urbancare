



import Navbar from "@/components/navbarr";
import Dashboard from "@/views/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import Profile from "@/views/dashboard/profile";
import DoctorList from "@/views/dashboard/DoctorList";
import PatientList from "@/views/dashboard/PatientList";
import AddDoctor from "@/views/dashboard/AddDoctor";
import Notification from "@/views/dashboard/Notification";


const DashboardLayout = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="w-full h-[99vh] overflow-hidden pt-[70px]" style={{ scrollbarWidth: "none" }}>
        <div className="w-full h-full overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/DoctorList" element={<DoctorList />} />
            <Route path="/AddDoctor" element={<AddDoctor />} />
            <Route path="/PatientList" element={<PatientList />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
