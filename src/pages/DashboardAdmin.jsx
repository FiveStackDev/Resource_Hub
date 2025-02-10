import { Users, Utensils, Box, Wrench } from 'lucide-react';
import { StatCard } from '../components/Dashboard/Admin/StatCard';
import { ResourceCard } from '../components/Dashboard/Admin/ResourceCard';
import { MealDistributionChart } from '../components/Dashboard/Admin/MealDistributionChart';
import { ResourceAllocation } from '../components/Dashboard/Admin/ResourceAllocation';


const getMonthLabels = () => {
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth(); // Get the current month index (0 for Jan, 11 for Dec)
  
  // Reorder the month labels so the current month is first
  const reorderedLabels = [
    ...monthLabels.slice(currentMonth),
    ...monthLabels.slice(0, currentMonth),
  ];

  return reorderedLabels;
};

function Dashboard() {
  const monthLabels = getMonthLabels();

  return (
    <div className="min-h-screen space-y-6 p-6">
      {/* Heading */}
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="452"
          icon={<Users className="text-blue-500" />}
          chartData={{
            labels: monthLabels,
            data: [420, 435, 440, 448, 452, 450, 445, 440, 435, 430, 425, 420],
          }}
        />
        <StatCard
          title="Today Total meals"
          value="360"
          icon={<Utensils className="text-green-500" />}
          chartData={{
            labels: monthLabels,
            data: [380, 410, 425, 440, 460, 450, 440, 430, 420, 410, 400, 390],
          }}
        />
        <StatCard
          title="Due Assets"
          value="30"
          icon={<Box className="text-yellow-500" />}
          chartData={{
            labels: monthLabels,
            data: [25, 28, 32, 35, 30, 28, 27, 30, 32, 35, 30, 28],
          }}
        />
        <StatCard
          title="New Maintenance"
          value="10"
          icon={<Wrench className="text-red-500" />}
          chartData={{
            labels: monthLabels,
            data: [8, 12, 15, 11, 10, 9, 10, 11, 12, 13, 14, 10],
          }}
        />
      </div>

      {/* Rest of the dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MealDistributionChart takes up 2 columns on large screens, ResourceAllocation takes up 1 column */}
        <div className="lg:col-span-2">
          <MealDistributionChart />
        </div>
        <div className="lg:col-span-1">
          <ResourceAllocation />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          title="Materials And IT"
          total={50}
          highPriority={12}
          progress={75}
        />
        <ResourceCard
          title="Stationary"
          total={30}
          highPriority={8}
          progress={60}
        />
        <ResourceCard
          title="Wellness"
          total={40}
          highPriority={15}
          progress={85}
        />
        <ResourceCard
          title="Facilities"
          total={25}
          highPriority={5}
          progress={45}
        />
        <ResourceCard
          title="Maintenance Tools"
          total={60}
          highPriority={20}
          progress={70}
        />
        <ResourceCard
          title="Extra Items"
          total={15}
          highPriority={3}
          progress={30}
        />
      </div>
    </div>
  );
}

export default Dashboard;
