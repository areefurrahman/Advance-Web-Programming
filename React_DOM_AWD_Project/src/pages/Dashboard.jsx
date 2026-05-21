import StatCard from "../components/ui/StatCard";
import RecentIssues from "../components/issues/RecentIssues";


function Dashboard() {
  return (
    <div className="space-y-6 py-2.5 px-3">

      {/* Page Title */}
      <div className="border-b-[0.5px] dark:border-white/10 border-gray-200 flex flex-col gap-1  py-3 pb-4">
      
        <h1 className="text-xl font-semibold">Dashboard</h1>
      
      </div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Issues" value="120" change="+12 this week" />
        <StatCard title="Completed" value="80" change="+5 today" />
        <StatCard title="Pending" value="40" change="-2 today" />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Issues */}
        <RecentIssues />

        {/* Placeholder for future chart */}
        <div className="bg-gray-50 dark:bg-[#111] p-5 rounded-xl ">
          <h3 className="text-lg font-semibold mb-4">Activity</h3>

          <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
            Chart / Activity Graph (Coming Soon)
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;