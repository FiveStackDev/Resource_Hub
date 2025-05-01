import { Utensils, Box, Wrench, CalendarDays, PackageCheck, Link } from 'lucide-react'; // Import any needed icons
import { StatCard } from '../../components/Dashboard/User/StatCard';
import { RecentActivities } from '../../components/Dashboard/User/RecentActivities';
import { QuickActions } from '../../components/Dashboard/User/QuickActions';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getMonthLabels } from '../../utils/dateUtils'; // Import the utility function

// Define actions for the user dashboard outside the component
const customUserActions = [
  {
    icon: CalendarDays, // Example: Use a different icon
    title: "View Meal Calendar",
    description: "Check your booked meals",
    iconColor: "text-blue-500", // Example: Different color
  }
 ,
  {
    icon: PackageCheck, // Example: Another icon
    title: "Check Due Assets",
    description: "View assets nearing return date",
    iconColor: "text-purple-500",
    path: "/user/due-assets" // Example: New path
  },
  {
    icon: Wrench,
    title: "Report Issue",
    description: "Submit maintenance request",
    iconColor: "text-red-500",
    path: "/user/maintenance"
  }
];

function DashboardUser() {
  const [stats, setStats] = useState({ mealsToday: 0, assets: 0, maintenanceRequests: 0, mealsMonthlyData: [], assetsMonthlyData: [], maintenanceMonthlyData: [] });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const monthLabels = getMonthLabels();


  const fetchData = useCallback(async () => {
    const userId = localStorage.getItem('Userid');
    setLoading(true);
    setError(null);
    try {
      const [statsResponse, activitiesResponse] = await Promise.all([
        axios.get(`http://localhost:9090/dashboarduser/stats/${userId}`), // Replace with actual user ID
        axios.get(`http://localhost:9090/dashboarduser/activities/${userId}`)
      ]);

      setStats(statsResponse.data);
      setRecentActivities(activitiesResponse.data);
    } catch (err) {
      console.error('Error fetching user dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6"> {/* Added padding consistent with Admin Dashboard */}
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

      {/* Quick Actions - Pass the custom actions defined outside */}
      <QuickActions actions={customUserActions} />
    </div>
  );
}

export default DashboardUser;
