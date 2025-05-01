import { Utensils, Box, Wrench, CalendarDays, PackageCheck } from 'lucide-react';
import { StatCard } from '../../components/Dashboard/User/StatCard';
import { RecentActivities } from '../../components/Dashboard/User/RecentActivities';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getMonthLabels } from '../../utils/dateUtils';
import { QuickActionsAdminUser } from '../../components/Dashboard/User/QuickActionsAdminUser';

function DashboardUser() {
  const [stats, setStats] = useState({
    mealsToday: 0,
    assets: 0,
    maintenanceRequests: 0,
    mealsMonthlyData: [],
    assetsMonthlyData: [],
    maintenanceMonthlyData: [],
  });
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
        axios.get(`https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-user-033/v1.0/stats/${userId}`),
        axios.get(`https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-user-033/v1.0/activities/${userId}`),
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
    <div className="space-y-6 p-6">
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

      {/* Quick Actions - Render hardcoded cards */}
      <QuickActionsAdminUser />
    </div>
  );
}

export default DashboardUser;