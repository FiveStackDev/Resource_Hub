export const RecentActivities = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const formattedDate = new Date(activity.timestamp).toLocaleDateString(); // Format only the date
          return (
            <div key={index} className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">{activity.title}</span>
              <span className="text-sm text-gray-400">{formattedDate}</span> {/* Display only the date */}
            </div>
          );
        })}
      </div>
    </div>
  );
};