import { useEffect, useState } from 'react';
import { apiClient } from '../../axios/axios.js';
import { useLocation } from 'react-router-dom';

const DoctorProfile = () => {
    const location = useLocation();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const doctorId = location.state?.id;

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await apiClient.get(`/api/${doctorId}`);
                setDoctor(response.data.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            } finally {
                setLoading(false);
            }
        };
        if (doctorId) fetchDoctor();
    }, [doctorId]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex justify-end p-6 mt-10 mr-40">
            <div className="w-full md:w-1/3 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-green-700 mb-2">{doctor?.name}</h2>
                <p className="text-gray-600">Specialization: {doctor?.specialization}</p>
                <p className="text-green-600 font-semibold mt-2">Average Rating: {doctor?.averageRating} / 5</p>

                <h3 className="mt-4 text-lg font-bold">Schedule:</h3>
                <ul className="list-disc ml-6 text-gray-700">
                    {doctor?.schedule.map(({ _id, day, time }) => (
                        <li key={_id}>{day}: {time}</li>
                    ))}
                </ul>

                <h3 className="mt-4 text-lg font-bold">Reviews:</h3>
                {doctor?.ratings.map(({ _id, userId, rating, comment }) => (
                    <div key={_id} className="border-t pt-2 mt-2">
                        <p className="text-sm">User ID: {userId} - {rating} / 5</p>
                        <p className="text-xs text-gray-500">Comment: {comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorProfile;