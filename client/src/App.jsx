import  { useEffect } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import Components
import Navbar from "./components/navbarr";
import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Doctors from "./components/Doctors";
import Appointment from "./components/Appointment";
import Doco from "./components/Doco";
import SignIn from "./views/dashboard/SignIn";
import DoctorDashboard from "./layout/dashboardLayout";
import DoctorDashboards from "./layout/doctordashboard";
import Messagebox from "./components/MessageBox.jsx";
import Message from "./components/Message.jsx";
import DoctorRatings from './components/DoctorProfile.jsx'
import History from "./components/History.jsx";

import Appoinhistory from './components/Appoinhistory.jsx'
// Styles
import "./index.css";
import "./components/styles.css";
import Appointments from "./screens/Appointments";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to SignIn on first load
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/SignIn");
    }
  }, [location.pathname, navigate]);

  // Check if the current route is one that should NOT have Navbar & Sidebar
  const noNavbarSidebar = ["/SignIn", "/dashboard", "/docdashboard"].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="app-container w-full">
      {/* Show Navbar & Sidebar only if not on SignIn, Dashboard, or DocDashboard */}
      {!noNavbarSidebar && <Navbar />}
      <div className="main-content">
        {!noNavbarSidebar && <Sidebar />}
        <div className="page-content">
          <Routes>

          

            {/* Pages without Navbar & Sidebar */}
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/dashboard/*" element={<DoctorDashboard />} />
            <Route path="/docdashboard/*" element={<DoctorDashboards />} />
            

            {/* Pages with Navbar & Sidebar */}
            <Route path="/main" element={<MainPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment/:id" element={<Appointment />} />
            <Route path="/messages" element={<Doco />} />
            <Route path='/messagebox' element={<Messagebox />} />
            <Route path='/history' element={<History />} />
<Route path='/messagebox/message/:messageId' element={<Message />} />
<Route path="/doctor/:id/ratings" element={<DoctorRatings />} />
<Route path="/appointmentuser" element={<Appointment />} />
 
            <Route path="*" element={<Navigate to="/SignIn" />} />
          </Routes>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 99999 }} />
    </div>
  );
};

export default App;
