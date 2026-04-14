import React, { useState, useEffect } from 'react';
import { apiClient } from '../../axios/axios.js';

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/appointment/patapp');
        setAppointments(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch appointments. Please try again later.');
      }
    };

    fetchAppointments();
  }, []);

  // Function to format date (e.g., "March 19, 2025")
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mr-10 mt-20 p-8 text-right"> {/* Positioned at right with mt-20 */}
      <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        {appointments.length > 0 ? (
          appointments.map(({ _id, doctorId, timeSlot, date, status }) => (
            <div
              key={_id}
              className={`border p-3 mb-2 rounded-md shadow-md w-3/4 ml-auto 
                ${status === 'cancelled' ? 'bg-red-100 border-red-400' : ''}`}
            >
              {status === 'cancelled' ? (
                <>
                  <p className="font-medium text-red-500">
                    ❌ Your appointment with <span className="font-bold">{doctorId.name} </span>  
                    scheduled at <span className="text-blue-500">{timeSlot}</span> on{' '}
                    <span className="text-purple-500">{formatDate(date)}</span> was <b>cancelled</b> by the doctor.
                  </p>
                  <p className="text-gray-600">
                    ⚠️ Please reschedule your appointment at a different available slot.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">
                    Your appointment with <span className="font-bold">{doctorId.name}</span>  
                    is at <span className="text-blue-500">{timeSlot}</span> on{' '}
                    <span className="text-purple-500">{formatDate(date)}</span>.
                  </p>
                  <p className="text-green-600">Message doctor at that time.</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments available.</p>
        )}
      </div>
    </div>
  );
}

export default PatientAppointments;
