import { Users, Utensils, Box, Wrench } from "lucide-react";
import { StatCard } from "../../components/Dashboard/Admin/StatCard";
import { ResourceCard } from "../../components/Dashboard/Admin/ResourceCard";
import { MealDistributionChart } from "../../components/Dashboard/Admin/MealDistributionChart";
import { ResourceAllocation } from "../../components/Dashboard/Admin/ResourceAllocation";
import { useEffect, useState } from "react";
import axios from "axios";

const getMonthLabels = () => {
  const monthLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth(); // Get the current month index (0 for Jan, 11 for Dec)

  // Reorder the month labels so the current month is first
  const reorderedLabels = [
    ...monthLabels.slice(currentMonth),
    ...monthLabels.slice(0, currentMonth),
  ];

  return reorderedLabels;
};

// Updated to fetch and pass meal distribution and resource allocation data dynamically
function Dashboard() {
  const [stats, setStats] = useState([]);
  const [resources, setResources] = useState([]);
  const [mealData, setMealData] = useState([]); // State for meal distribution data
  const [resourceData, setResourceData] = useState([]); // State for resource allocation data
  const monthLabels = getMonthLabels();

  useEffect(() => {
    // Fetch stats data
    axios
      .get("http://localhost:9090/dashboard/admin/stats")
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching stats:", error));

    // Fetch resources data
    axios
      .get("http://localhost:9090/dashboard/admin/resources")
      .then((response) => setResources(response.data))
      .catch((error) => console.error("Error fetching resources:", error));

    // Fetch meal distribution data
    axios
      .get("http://localhost:9090/dashboard/admin/mealdistribution")
      .then((response) => setMealData(response.data))
      .catch((error) => console.error("Error fetching meal distribution data:", error));

    // Fetch resource allocation data
    axios
      .get("http://localhost:9090/dashboard/admin/resourceallocation")
      .then((response) => setResourceData(response.data))
      .catch((error) => console.error("Error fetching resource allocation data:", error));
  }, []);

  return (
    <div className="min-h-screen space-y-6 p-6">
      {/* Heading */}
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            chartData={{
              labels: monthLabels,
              data: stat.monthlyData,
            }}
          />
        ))}
      </div>

      {/* Rest of the dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MealDistributionChart takes up 2 columns on large screens, ResourceAllocation takes up 1 column */}
        <div className="lg:col-span-2">
          <MealDistributionChart data={mealData} />
        </div>
        <div className="lg:col-span-1">
          <ResourceAllocation data={resourceData} />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            total={resource.total}
            highPriority={resource.highPriority}
            progress={resource.progress}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
