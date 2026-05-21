import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreHorizontal,
  Circle,
  CircleDashed,
  CircleCheck,
  CircleX,
  Copy,
  Timer,
  User,
} from "lucide-react";

// Status config
const STATUSES = [
  { key: "backlog",     label: "Backlog",     Icon: CircleDashed, color: "text-gray-500" },
  { key: "todo",        label: "Todo",        Icon: Circle,       color: "text-gray-400" },
  { key: "in_progress", label: "In Progress", Icon: Timer,        color: "text-yellow-400" },
  { key: "done",        label: "Done",        Icon: CircleCheck,  color: "text-violet-500" },
  { key: "canceled",    label: "Canceled",    Icon: CircleX,      color: "text-red-400" },
  { key: "duplicate",   label: "Duplicate",   Icon: Copy,         color: "text-red-400" },
];

const getStatus = (issue) =>
  issue.status ?? (issue.completed ? "done" : "todo");

// Status popup
function StatusPopup({ currentStatus, onSelect, onClose }) {
  const ref = useRef(null);
  const [search, setSearch] = useState("");

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const filtered = STATUSES.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="absolute left-0 top-6 z-50 w-56 rounded-lg border border-white/10 bg-[#1c1c1c] shadow-2xl py-1"
    >
      {/* Search bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10">
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Change status..."
          className="bg-transparent text-sm text-gray-200 placeholder-gray-500 outline-none w-full"
        />
        <span className="text-xs text-gray-600 ml-2 shrink-0">S</span>
      </div>

      {/* Options */}
      {filtered.map(({ key, label, Icon, color }, i) => (
        <button
          key={key}
          onClick={() => { onSelect(key); onClose(); }}
          className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Icon size={15} className={color} />
            <span className="text-sm text-gray-200">{label}</span>
          </div>
          <div className="flex items-center gap-2">
            {key === currentStatus && <span className="text-gray-400 text-xs">✓</span>}
            <span className="text-gray-600 text-xs">{i + 1}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// Single status icon
function StatusIcon({ status }) {
  const s = STATUSES.find((x) => x.key === status) ?? STATUSES[1];
  return <s.Icon size={15} className={s.color} />;
}

// IssueRow 
function IssueRow({ issue, isSelected, onSelect, onStatusChange }) {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(false);
  const [hovered, setHovered] = useState(false);

  const status = getStatus(issue);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-white/5 transition-colors ${
        isSelected
          ? "bg-indigo-50 dark:bg-[#1e2045]"
          : "hover:bg-gray-50 dark:hover:bg-white/3"
      }`}
    >
      {/* ── Left side ── */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Drag handle — hover only */}
        <MoreHorizontal
          size={12}
          className={`rotate-90 shrink-0 text-gray-300 dark:text-gray-700 transition-opacity ${
            hovered || isSelected ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Checkbox */}
        <div
          onClick={(e) => { e.stopPropagation(); onSelect(issue.id); }}
          className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border cursor-pointer transition-all ${
            isSelected
              ? "bg-indigo-500 border-indigo-500"
              : hovered
              ? "border-gray-400 dark:border-gray-500"
              : "border-transparent"
          }`}
        >
          {isSelected && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Issue ID */}
        <span className="text-xs text-gray-400 dark:text-gray-600 font-mono shrink-0">
          {issue.identifier ?? `FYP-${issue.id}`}
        </span>

        {/* Status icon + popup */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); setShowStatus((v) => !v); }}
            className="hover:opacity-70 transition-opacity"
          >
            <StatusIcon status={status} />
          </button>
          {showStatus && (
            <StatusPopup
              currentStatus={status}
              onSelect={(s) => onStatusChange(issue.id, s)}
              onClose={() => setShowStatus(false)}
            />
          )}
        </div>

        {/* Title */}
        <p
          onClick={() => navigate(`/issues/${issue.id}`)}
          className="text-sm text-gray-800 dark:text-gray-200 truncate cursor-pointer"
        >
          {issue.title ?? issue.todo}
        </p>
      </div>

      {/* ── Right side ── */}
      <div className="flex items-center gap-3 shrink-0 ml-4">
        <User size={14} className="text-gray-400 dark:text-gray-600" />
        <span className="text-xs text-gray-400 dark:text-gray-600">
          {issue.dueDate ?? "Apr 30"}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className={`text-gray-400 dark:text-gray-600 transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
}

export default IssueRow;



// import { LoaderCircle, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function IssueRow({ issue }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate(`/issues/${issue.id}`)}
//       className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/5 
//                  cursor-pointer hover:bg-gray-100 dark:hover:bg-[#111] transition "
//     >

//       {/* Left */}
//       <div className="flex items-center gap-3">

//         {/* Status Circle */}
//         <span> 
         
//             {issue.completed ? <Check size={15} color="green" /> : <LoaderCircle size={15} color="orange" />}
//         </span>

//         {/* Issue Text */}
//         <p className="text-sm text-gray-800 dark:text-gray-200">
//           {issue.todo}
//         </p>
//       </div>

//       {/* Right */}
//       <div className="text-xs text-gray-500">
//         #{issue.id}
//       </div>

//     </div>
//   );
// }

// export default IssueRow;