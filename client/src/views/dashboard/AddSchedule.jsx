import React, { useState, useMemo, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";
const handleAddSchedule = async (doctorName, schedule, setLoading, onClose) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/addschedule`, {
        doctorname: doctorName,
        schedule: schedule,
      });

      if (response?.status === 200) {
        toast.success("Schedule added successfully");
        setReload((prev) => !prev); 
        onClose(); 
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      toast.error(error?.response?.data?.message || "Failed to add schedule");
    } finally {
      setLoading(false);
    }
};

const AddScheduleModal = ({ doctorName }) => {
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!day.trim() || !time.trim()) {
        toast.error("Please fill in all fields");
        return;
      }

      handleAddSchedule(doctorName, [{ day, time }], setLoading, () => {
        setDay("");
        setTime("");
      });
    };

    return (
      <Dialog>
        <DialogTrigger>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Schedule
          </button>
        </DialogTrigger>
        <DialogContent className="p-6 bg-white shadow-lg rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-4">Add Schedule for {doctorName}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    );
};
export default AddScheduleModal;