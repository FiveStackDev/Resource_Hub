import { Line } from "react-chartjs-2";
import { X } from "lucide-react";
import { Dialog } from "@mui/material";

export const StatCardPopup = ({
  open,
  onClose,
  title,
  subtitle,
  value,
  chartData,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: chartData?.labels || [],
    datasets: [
      {
        data: chartData?.data || [],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          display: 'flex',              // Use flexbox to center the content
          flexDirection: 'column',      // Stack the content vertically
          justifyContent: 'center',     // Center content vertically
          alignItems: 'center',         // Center content horizontally
          width: '90vw',                // Width is 90% of the viewport width
          maxWidth: '1000px',           // Optional: Limit the max width
          height: 'auto',               // Auto height to fit content
          maxHeight: '90vh',            // Optional: Limit the max height
          overflow: 'hidden',           // Prevent scrolling
        },
      }}
    >
      <div className="p-6 w-full">
        <div className="flex justify-between items-start mb-6 w-full">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-8 text-center">
          <div className="text-sm text-gray-600 mb-2">Current Value</div>
          <div className="text-3xl font-bold">{value}</div>
        </div>

        {chartData && (
          <div className="w-full flex justify-center items-center h-64">
            <Line options={options} data={data} />
          </div>
        )}
      </div>
    </Dialog>
  );
};
