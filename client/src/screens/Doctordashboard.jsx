import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Header from '../header/Header';
const Doctordashboard = () => {
const [slidebaropen, setSlidebaropen] = useState(false);
    return (
        <> 
            <div className="h-screen bg-white flex flex-col">
             <Header/>
                {/* <nav className="bg-gray-300 text-black p-4"> 
                    <ul className="flex space-x-4 ml-90"> 
                        <li><Link to="/" className="hover:text-blue-800">Home</Link></li>
                        <li><Link to="/appointments" className="hover:text-blue-800">Appointments</Link></li>
                        <li><Link to="/schedule" className="hover:text-blue-800">Schedule</Link></li>
                        <li><Link to="/patients" className="hover:text-blue-800">Patients</Link></li>
                        <li><Link to="/profile" className="hover:text-blue-800">Profile</Link></li>
                        <li><Link to="/messagebox" className="hover:text-blue-800">Messagebox</Link></li>
                        <li><Link to="/logout" className=" mr-0 hover:text-blue-800">Logout</Link></li>
                    </ul>
                </nav> */}
                <div className="flex-grow p-8">
                 
                </div>
            </div>
        </>
    );
};

export default Doctordashboard;
