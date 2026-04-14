import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiCalendar, FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ColorRing } from "react-loader-spinner";
import AddDoctor from "./AddDoctor";
import AddSchedule from "./AddSchedule";
import DoctorDetails from "./DoctorDetails";
import axios from "axios";
import toast from "react-hot-toast";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    handleGetDoctorList();
  }, [reload]);

  const handleGetDoctorList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/doctors`);
      if (response?.status === 200) {
        setDoctors(response?.data?.data || []);
        setFilteredItems(response?.data?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to get Doctor List");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setDeleteId(id);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/doctors/${id}`);
      if (response?.status === 200) {
        setReload(!reload);
        toast.success("Doctor deleted successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete Doctor");
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  const ActionButtons = ({ data }) => (
    <div className="flex gap-2 items-center py-3">
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition">
            <FiEye size={20} />
          </div>
        </DialogTrigger>
        <DialogContent className="p-8 bg-white shadow-xl rounded-2xl max-w-md">
          <DoctorDetails doctor={data} />
        </DialogContent>
      </Dialog>

      <div
        onClick={() => {
          setOpenModal(true);
          setRowData(data);
        }}
        className="cursor-pointer p-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
      >
        <FaRegEdit size={20} />
      </div>

      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 rounded-full shadow-md hover:shadow-lg transition duration-200">
            <FiCalendar size={20} />
          </div>
        </DialogTrigger>
        <DialogContent className="p-8 bg-white shadow-xl rounded-2xl max-w-md">
          <AddSchedule doctorName={data?.name} />
        </DialogContent>
      </Dialog>

      {deleteLoading && deleteId === data?._id ? (
        <ColorRing visible height="30" width="30" ariaLabel="loading" colors={["#16a34a", "#22c55e", "#16a34a", "#22c55e", "#16a34a"]} />
      ) : (
        <div
          onClick={() => handleDelete(data?._id)}
          className="cursor-pointer p-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
        >
          <Trash2 size={20} />
        </div>
      )}
    </div>
  );

  const columns = [
    { name: "Doctor Name", selector: (row) => row.name, sortable: true },
    { name: "Experience", selector: (row) => row.experience, sortable: true },
    { name: "Licence", selector: (row) => row.licence, sortable: true },
    { name: "Specialization", selector: (row) => row.specialization, sortable: true },
    { name: "Action", cell: (row) => <ActionButtons data={row} /> },
  ];

  return (
    <div>
      <DataTable
        title="Doctors List"
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        progressPending={loading}
      />
    </div>
  );
};

export default DoctorList;
