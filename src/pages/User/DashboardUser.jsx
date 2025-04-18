import { Utensils, Box, Wrench } from 'lucide-react';
import { StatCard } from '../../components/Dashboard/User/StatCard';
import { RecentActivities } from '../../components/Dashboard/User/RecentActivities';
import { QuickActions } from '../../components/Dashboard/User/QuickActions';
import { useState, useEffect } from 'react';
import axios from 'axios';

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

function DashboardUser() {
  const [stats, setStats] = useState({ mealsToday: 0, assets: 0, maintenanceRequests: 0 });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:9090/dashboard/user/user-stats');
        const activitiesResponse = await axios.get('http://localhost:9090/dashboard/user/user-activities');

        setStats(statsResponse.data);
        setRecentActivities(activitiesResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const monthLabels = getMonthLabels();

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="My Meals Today"
          value={stats.mealsToday}
          icon={<Utensils className="text-green-500" />}
          chartData={{
            labels: monthLabels,
            data: stats.mealsMonthlyData || [],
          }}
        />
        <StatCard
          title="My Assets"
          value={stats.assets}
          icon={<Box className="text-yellow-500" />}
          chartData={{
            labels: monthLabels,
            data: stats.assetsMonthlyData || [],
          }}
        />
        <StatCard
          title="My Maintenance Requests"
          value={stats.maintenanceRequests}
          icon={<Wrench className="text-red-500" />}
          chartData={{
            labels: monthLabels,
            data: stats.maintenanceMonthlyData || [],
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
