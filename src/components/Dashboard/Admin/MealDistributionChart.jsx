import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Updated to accept dynamic data as props
export const MealDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: data.datasets || [
      {
        label: 'Breakfast',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'Lunch',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(239, 68, 68)',
        tension: 0.4,
      },
      {
        label: 'Dinner',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Meal Distribution</h2>
      <p className="text-gray-600 text-sm mb-6">Weekly meal service trends</p>
      <Line options={options} data={chartData} />
    </div>
  );
};
