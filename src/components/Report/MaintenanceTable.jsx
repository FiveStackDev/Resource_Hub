import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import { BASE_URLS } from "../../services/api/config";
import { toast } from "react-toastify";
import SchedulePopup from "./SchedulePopup";

const MaintenanceTable = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URLS.maintenance}/details`)
      .then((response) => response.json())
      .then((data) => setMaintenanceData(data))
      .catch((error) => console.error("Error fetching maintenance data:", error));
  }, []);

  const handleDownloadPDF = () => {
    try {
      const element = document.getElementById("maintenance-table");
      const options = {
        margin: 1,
        filename: "MaintenanceReport.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      html2pdf().from(element).set(options).save();
      toast.success("Maintenance report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading maintenance report:", error);
      toast.error("Failed to download maintenance report.");
    }
  };

  const filteredData = maintenanceData.filter((item) => {
    return (
      (selectedPriority === "" || item.priorityLevel === selectedPriority) &&
      (selectedStatus === "" || item.status === selectedStatus)
    );
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "15px", marginBottom: 20 }}>
        {/* Priority Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>

        {/* Status Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Download PDF Button */}
        <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenSchedulePopup(true)}
        >
          Schedule PDF
        </Button>
      </div>

      <TableContainer component={Paper} id="maintenance-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Maintenance ID</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Priority Level</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Request Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.userId}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">{item.priorityLevel}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center">{item.requestDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {openSchedulePopup && (
        <SchedulePopup
          onClose={() => setOpenSchedulePopup(false)}
          table="Maintenance"
        />
      )}
    </div>
  );
};

export default MaintenanceTable;