import { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiEye} from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import { formatDate } from "@/utils/dateFormater";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="md:flex hidden gap-2 items-center">
    <input
      id="search"
      type="text"
      placeholder="Filter by patient name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="p-2 border rounded-lg focus:outline-none focus:border-blue-800"
    />
  </div>
);

const PatientList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleGetPatientList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/patients`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response?.status === 200) {
        setPatients(response?.data?.data || []);
        const filteredItemsData = response?.data?.data?.filter((item) =>
          item?.name?.toLowerCase()?.includes(filterText.toLowerCase())
        );
        setFilteredItems(filteredItemsData);
      }
    } catch (error) {
      console.error("Error while getting the patient list:", error);

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/patients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response?.status === 200) {
        setDeleteLoading(false);
        setDeleteId(null);
        setReload(true);
        handleGetPatientList();
        toast.success("Patient deleted successfully");
      }
    } catch (error) {
      console.error("Error while deleting the patient:", error);
      toast.error(error?.response?.data?.message || "Failed to delete patient");
    }
  };

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const subHeaderComponent = useMemo(
    () => (
      <div className="flex justify-between w-full mb-5">
        <FilterComponent
          filterText={filterText}
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
        />
        {/* <button className="h-full bg-blue-800 text-white rounded-xl px-6 hover:bg-transparent hover:border hover:border-blue-800 hover:text-blue-800">
          + Add Patient
        </button> */}
      </div>
    ),
    [filterText, resetPaginationToggle]
  );

  const columns = [
    {
      name: "Patient Name",
      sortable: true,
      selector: (row) => row.name,
      cell: (row) => (
        <p className="text-blue-600 font-semibold">
          {row?.name || <span className="text-gray-400 italic">No Name</span>}
        </p>
      ),
    },
    {
      name: "Date of Birth",
      sortable: true,
      selector: (row) => row?.dob,
      cell: (row) => (
        <p className="text-purple-600">
          {row?.dob ? formatDate(row?.dob) : <span className="text-gray-400 italic">No DOB</span>}
        </p>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2 items-center py-3">
          <Dialog>
            <DialogTrigger>
              <div className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition">
                <FiEye size={20} />
              </div>
            </DialogTrigger>
            <DialogContent className="p-8 bg-white shadow-xl rounded-2xl max-w-lg">
              <h2 className="text-2xl font-bold text-gray-800">Patient Details</h2>
              <p className="text-lg font-semibold text-gray-800">{row?.name}</p>
              <p className="text-gray-700">DOB: {formatDate(row?.dob)}</p>
            </DialogContent>
          </Dialog>
          <div
            onClick={() => {
              setRowData(row);
            }}
            className="cursor-pointer p-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            <FaRegEdit size={20} />
          </div>
          <div
            onClick={() => {
              setDeleteId(row?._id);
              handleDelete(row?._id);
            }}
            className="cursor-pointer p-3 bg-gradient-to-r from-red-100 to-red-200 text-red-700 rounded-full shadow-md hover:shadow-lg transition duration-200"
          >
            <Trash2 size={20} />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleGetPatientList();
  }, [reload]);

  return (
    <div className="w-full px-4 pb-8 ">
      <div className="bg-white w-full p-3 rounded-2xl shadow-xl">
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          paginationResetDefaultPage={resetPaginationToggle}
        />
      </div>
    </div>
  );
};

export default PatientList;
