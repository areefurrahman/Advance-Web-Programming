import { useEffect, useState } from "react";
import { getIssues } from "../../services/api";

function KanbanBoard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await getIssues();

        // Simulate 3 states
        const mapped = data.slice(0, 15).map((item, index) => ({
          ...item,
          status: item.completed
            ? "done"
            : index % 2 === 0
            ? "inprogress"
            : "todo",
        }));

        setIssues(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const columns = {
    todo: issues.filter((i) => i.status === "todo"),
    inprogress: issues.filter((i) => i.status === "inprogress"),
    done: issues.filter((i) => i.status === "done"),
  };

  if (loading) {
    return <div className="text-sm text-gray-500">Loading board...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Column */}
      {[
        { key: "todo", label: "Todo" },
        { key: "inprogress", label: "In Progress" },
        { key: "done", label: "Done" },
      ].map((col) => (
        <div
          key={col.key}
          className="bg-gray-50 dark:bg-[#111] rounded-xl p-4 border border-gray-200 dark:border-white/10"
        >
          {/* Column Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {col.label}
            </h3>

            <span className="text-xs text-gray-400">
              {columns[col.key].length}
            </span>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {columns[col.key].map((issue) => (
              <div
                key={issue.id}
                className="bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-white/10 
                           hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer transition"
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  {issue.todo}
                </p>

                <div className="mt-2 text-xs text-gray-400">
                  #{issue.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}

export default KanbanBoard;