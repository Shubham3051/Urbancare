import { useState } from 'react';
import { apiClient } from '../../axios/axios.js';

const RatingComponent = ({ doctorName }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showRatingForm, setShowRatingForm] = useState(false);

  const handleRatingSubmit = async () => {
    try {
      await apiClient.post(`/api/rate/${doctorName}`, { rating, comment });
      alert('Rating submitted successfully!');
      setShowRatingForm(false);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating.');
    }
  };

  return (
    <div className="mt-5 p-4 border border-green-300 rounded-lg bg-green-50 shadow-md">
      {!showRatingForm ? (
        <button 
          onClick={() => setShowRatingForm(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Give Rating
        </button>
      ) : (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-green-700">Rate the Doctor</h3>
          <select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))} 
            className="border border-green-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
            ))}
          </select>
          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-green-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleRatingSubmit} 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Submit Rating
            </button>
            <button 
              onClick={() => setShowRatingForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingComponent;