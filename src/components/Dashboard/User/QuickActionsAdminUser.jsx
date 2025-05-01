import { Link } from 'react-router-dom';
import { CalendarDays, PackageCheck, Wrench } from 'lucide-react';

export const QuickActionsAdminUser = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Hardcoded Card 1: View Meal Calendar */}
      <Link
        to="/AdminUser-MealCalander"
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full flex flex-col items-start"
      >
        <CalendarDays className="text-blue-500 mb-2" size={24} />
        <h3 className="font-medium mb-1 text-base">View Meal Calendar</h3>
        <p className="text-sm text-gray-600">Check your booked meals</p>
      </Link>

      {/* Hardcoded Card 2: Check Due Assets */}
      <Link
        to="/AdminUser-DueAssets"
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full flex flex-col items-start"
      >
        <PackageCheck className="text-purple-500 mb-2" size={24} />
        <h3 className="font-medium mb-1 text-base">Check Due Assets</h3>
        <p className="text-sm text-gray-600">View assets nearing return date</p>
      </Link>

      {/* Hardcoded Card 3: Report Issue */}
      <Link
        to="/AdminUser-maintenanceDetails"
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full flex flex-col items-start"
      >
        <Wrench className="text-red-500 mb-2" size={24} />
        <h3 className="font-medium mb-1 text-base">Report Issue</h3>
        <p className="text-sm text-gray-600">Submit maintenance request</p>
      </Link>
    </div>
  );
};