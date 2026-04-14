import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { apiClient } from '../../axios/axios.js';

function Schedule() {
  const [value, setValue] = useState(new Date());
  const [sched, setSched] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiClient.get('/appointment/getdocapp');
        const formattedAppointments = response.data.map(appt => ({
          id: appt._id,
          name: appt.patientId.name,
          date: formatDate(new Date(appt.date)),
          time: appt.timeSlot,
          status: appt.status.charAt(0).toUpperCase() + appt.status.slice(1), // Capitalize status
        }));
        
        // Filter appointments based on selected date
        const selectedDate = formatDate(value);
        const filteredAppointments = formattedAppointments.filter(
          item => item.date === selectedDate
        );

        setSched(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [value]);

  // Function to format Date object to 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // 2-digit day
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-8">
      <Calendar onChange={setValue} value={value} />

      <h2 className="text-lg font-bold mt-4">Selected Date: {value.toDateString()}</h2>

      <div className="mt-4">
        {sched.length > 0 ? (
          sched.map(({ id, name, time, status }) => (
            <div key={id} className="border p-3 mb-2 rounded-md shadow-md">
              <p className="font-medium">{name}</p>
              <p className="text-gray-600">{time}</p>
              <p
                className={`text-sm font-semibold ${
                  status === 'Cancelled'
                    ? 'text-red-500'
                    : status === 'Confirmed'
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }`}
              >
                {status}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments on this day.</p>
        )}
      </div>
    </div>
  );
}

export default Schedule;
