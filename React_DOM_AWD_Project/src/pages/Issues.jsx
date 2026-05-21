import { useEffect, useState, useCallback } from "react";
import { getIssues } from "../services/api";
import IssueRow from "../components/issues/IssueRow";
import { ChevronDown, ChevronRight, Command, X, Plus } from "lucide-react";

// ── Scrollbar CSS (injected once)
const scrollbarCss = `
  .issues-scroll { scrollbar-width: thin; scrollbar-color: transparent transparent; }
  .issues-scroll:hover { scrollbar-color: rgba(120,120,120,0.3) transparent; }
  .issues-scroll::-webkit-scrollbar { width: 5px; }
  .issues-scroll::-webkit-scrollbar-track { background: transparent; }
  .issues-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 4px; }
  .issues-scroll:hover::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.3); }
`;

// ── Group header
function GroupHeader({ label, count, isOpen, onToggle }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 sticky top-0 bg-white dark:bg-black border-b border-gray-100 dark:border-white/5 z-10">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
      >
        {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <span>{label}</span>
        <span className="text-gray-400 dark:text-gray-600 font-normal ml-0.5">{count}</span>
      </button>
      <button className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
        <Plus size={13} />
      </button>
    </div>
  );
}

// ── Bottom selection bar 
function SelectionBar({ count, onClear }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 dark:bg-[#1c1c1e] text-white rounded-xl shadow-2xl px-4 py-2.5 border border-white/10 transition-all duration-200 ${
        count > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="text-sm text-gray-200">{count} selected</span>
      <button onClick={onClear} className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
        <X size={13} />
      </button>
      <div className="w-px h-4 bg-white/20" />
      <button className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
        <Command size={12} />
        Actions
      </button>
    </div>
  );
}

// ── Issues page 
const TABS = ["all", "active", "backlog"];

const GROUP_CONFIG = [
  { key: "todo",        label: "Todo",        filter: (i) => !i.completed && i.status !== "in_progress" && i.status !== "backlog" && i.status !== "done" && i.status !== "canceled" },
  { key: "in_progress", label: "In Progress", filter: (i) => i.status === "in_progress" },
  { key: "done",        label: "Done",        filter: (i) => i.completed || i.status === "done" },
];

function Issues() {
  const [issues, setIssues]       = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading]     = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [openGroups, setOpenGroups]   = useState({ todo: true, in_progress: true, done: true });

  useEffect(() => {
    (async () => {
      try {
        const data = await getIssues();
        setIssues(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Tab filter
  const filtered = issues.filter((i) => {
    if (activeTab === "active")  return !i.completed && i.status !== "backlog";
    if (activeTab === "backlog") return i.status === "backlog";
    return true;
  });

  // Checkbox toggle
  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  // Status change
  const handleStatusChange = useCallback((id, status) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status, completed: status === "done" } : i))
    );
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <style>{scrollbarCss}</style>

      {/* ── Header ── */}
      <div className="px-3 py-2.5 border-b border-gray-200 dark:border-white/10 shrink-0">
        <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Issues</h1>

        {/* Tabs — original style kept */}
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-sm capitalize transition-colors ${
                activeTab === tab
                  ? "bg-gray-300 dark:bg-[#1b1b1b] text-black dark:text-white"
                  : "bg-gray-200/50 dark:bg-[#111] text-gray-600 dark:text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Issues list ── */}
      <div className="flex-1 overflow-y-auto issues-scroll bg-white dark:bg-black border-t-0 border border-gray-200 dark:border-white/10 rounded-b-xl">
        {loading ? (
          <div className="flex items-center justify-center h-24">
            <div className="w-5 h-5 border-2 border-gray-200 dark:border-gray-800 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No issues found</p>
        ) : (
          GROUP_CONFIG.map(({ key, label, filter }) => {
            const group = filtered.filter(filter);
            if (group.length === 0) return null;
            return (
              <div key={key}>
                <GroupHeader
                  label={label}
                  count={group.length}
                  isOpen={openGroups[key]}
                  onToggle={() => setOpenGroups((p) => ({ ...p, [key]: !p[key] }))}
                />
                {openGroups[key] &&
                  group.map((issue) => (
                    <IssueRow
                      key={issue.id}
                      issue={issue}
                      isSelected={selectedIds.has(issue.id)}
                      onSelect={toggleSelect}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            );
          })
        )}
      </div>

      {/* ── Selection bar ── */}
      <SelectionBar count={selectedIds.size} onClear={() => setSelectedIds(new Set())} />
    </div>
  );
}

export default Issues;



// import { useEffect, useState } from "react";
// import { getIssues } from "../services/api";
// import IssueRow from "../components/issues/IssueRow";

// function Issues() {
//   // Scrollbar styling for both light and dark themes
//   const scrollbarStyles = `
//     .issues-scroll::-webkit-scrollbar {
//       width: 6px;
//     }
//     .issues-scroll::-webkit-scrollbar-track {
//       background: transparent;
//     }
//     /* Light mode scrollbar */
//     .issues-scroll::-webkit-scrollbar-thumb {
//       background: rgba(0, 0, 0, 0.2);
//       border-radius: 3px;
//     }
//     .issues-scroll::-webkit-scrollbar-thumb:hover {
//       background: rgba(0, 0, 0, 0.4);
//     }
//     /* Dark mode scrollbar */
//     .dark .issues-scroll::-webkit-scrollbar-thumb {
//       background: rgba(255, 255, 255, 0.2);
//       border-radius: 3px;
//     }
//     .dark .issues-scroll::-webkit-scrollbar-thumb:hover {
//       background: rgba(255, 255, 255, 0.4);
//     }
//   `;
//   const [issues, setIssues] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [activeTab, setActiveTab] = useState("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const data = await getIssues();
//         setIssues(data);
//         setFiltered(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIssues();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     if (activeTab === "all") {
//       setFiltered(issues);
//     } else if (activeTab === "active") {
//       setFiltered(issues.filter((i) => !i.completed));
//     } else if (activeTab === "completed") {
//       setFiltered(issues.filter((i) => i.completed));
//     }
//   }, [activeTab, issues]);

//   return (
//     <div className="space-y-4 py-2.5 px-3">
//       <style>{scrollbarStyles}</style>

//       {/* Header */}
//       <div className="border-b-[0.5px] dark:border-white/10 border-gray-200 flex flex-col gap-1  py-3 pb-4">
//         <h1 className="text-xl font-semibold">Issues</h1>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2">
//         {["all", "active", "completed"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-3 py-1.5 rounded-full text-sm capitalize
//               ${activeTab === tab
//                 ? "bg-gray-300 dark:bg-[#1b1b1b] text-black dark:text-white"
//                 : "bg-gray-200/50 dark:bg-[#111] text-gray-600 dark:text-gray-400"}
//             `}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Issues List */}
//       <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden max-h-[calc(100vh-210px)] overflow-y-auto issues-scroll">

//         {loading ? (
//           <div className="p-4 text-sm text-gray-500">Loading...</div>
//         ) : (
//           filtered.map((issue) => (
//             <IssueRow key={issue.id} issue={issue} />
//           ))
//         )}

//         {!loading && filtered.length === 0 && (
//           <div className="p-4 text-sm text-gray-500">
//             No issues found
//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Issues;