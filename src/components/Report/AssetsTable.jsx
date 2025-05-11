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

const AssetsTable = () => {
  const [assets, setAssets] = useState([]);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  useEffect(() => {
    fetch(`${BASE_URLS.asset}/details`)
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  const handleDownloadPDF = () => {
    try {
      const element = document.getElementById("asset-table");
      const options = {
        filename: "AssetsReport.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(options).save();
      toast.success("Assets report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading assets report:", error);
      toast.error("Failed to download assets report.");
    }
  };

  const filteredAssets = assets.filter((asset) => {
    return (
      (selectedCategory === "" || asset.category === selectedCategory) &&
      (selectedCondition === "" || asset.condition_type === selectedCondition)
    );
  });

  return (
    <div>
      <div style={{ display: "flex", gap: "15px", marginBottom: 20 }}>
        {/* Category Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(assets.map((asset) => asset.category))].map(
              (category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        {/* Condition Type Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Condition</InputLabel>
          <Select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            label="Condition"
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(assets.map((asset) => asset.condition_type))].map(
              (condition, index) => (
                <MenuItem key={index} value={condition}>
                  {condition}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadPDF}
        >
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

      <TableContainer component={Paper} id="asset-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset ID</TableCell>
              <TableCell>Asset Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Condition Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Availability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.asset_id}</TableCell>
                  <TableCell>{asset.asset_name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.quantity}</TableCell>
                  <TableCell>{asset.condition_type}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>
                    {asset.is_available ? "Available" : "Not Available"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
          table="Assets"
        />
      )}
    </div>
  );
};

export default AssetsTable;