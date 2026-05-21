function RecentIssues() {
  const dummyIssues = [
    { id: 1, title: "Fix login bug", status: "In Progress" },
    { id: 2, title: "Update dashboard UI", status: "Completed" },
    { id: 3, title: "API integration", status: "Pending" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#111] p-5 rounded-xl ">
      <h3 className="text-lg font-semibold mb-4">Recent Issues</h3>

      <div className="space-y-3">
        {dummyIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2"
          >
            <p className="text-sm">{issue.title}</p>
            <span className="text-xs text-brand-text-dark">{issue.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentIssues;