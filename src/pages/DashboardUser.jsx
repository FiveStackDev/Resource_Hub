import { Utensils, Box, Wrench } from 'lucide-react';
import { StatCard } from '../components/Dashboard/User/StatCard';
import { RecentActivities } from '../components/Dashboard/User/RecentActivities';
import { QuickActions } from '../components/Dashboard/User/QuickActions';

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

const recentActivities = [
  { date: '2024-02-20', action: 'Requested maintenance for laptop' },
  { date: '2024-02-19', action: 'Checked out office supplies' },
  { date: '2024-02-18', action: 'Booked lunch meal' },
];

function DashboardUser() {
  const monthLabels = getMonthLabels();

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="My Meals Today"
          value="2"
          icon={<Utensils className="text-green-500" />}
          chartData={{
            labels: monthLabels,
            data: [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2], // Sample data for meals
          }}
        />
        <StatCard
          title="My Assets"
          value="3"
          icon={<Box className="text-yellow-500" />}
          chartData={{
            labels: monthLabels,
            data: [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // Sample data for assets
          }}
        />
        <StatCard
          title="My Maintenance Requests"
          value="1"
          icon={<Wrench className="text-red-500" />}
          chartData={{
            labels: monthLabels,
            data: [0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Sample data for maintenance requests
          }}
        />
      </div>

      {/* Recent Activities */}
      <RecentActivities activities={recentActivities} />

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default DashboardUser;
