// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getIssueById } from "../services/api";

// import { LoaderCircle, Check } from "lucide-react";


// function IssueDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchIssue = async () => {
//       try {
//         const data = await getIssueById(id);
//         setIssue(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIssue();
//   }, [id]);

//   if (loading) {
//     return <div className="text-sm text-gray-500">Loading issue...</div>;
//   }

//   if (!issue) {
//     return <div className="text-sm text-red-500">Issue not found</div>;
//   }

//   return (
//     <div className="space-y-6 max-w-3xl pt-2.5">

//       {/* Back Button */}
//       <button
//         onClick={() => navigate("/issues")}
//         className="text-sm text-gray-500 hover:underline"
//       >
//         ← Back to Issues
//       </button>

//       {/* Header */}
//       <div className="flex items-center gap-3">

//         {/* Status */}
//         <span> 
//        {issue.completed ? <Check size={15} color="green" /> : <LoaderCircle size={15} color="orange" />}
//         </span>

//         <h1 className="text-xl font-semibold">
//           {issue.todo}
//         </h1>

//       </div>

//       {/* Meta Info */}
//       <div className="flex gap-4 text-sm text-gray-500">

//         <span>ID: #{issue.id}</span>

//         <span>
//           Status:{" "}
//           <span className={`font-medium ${
//             issue.completed ? "text-green-500" : "text-yellow-500"
//           }`}>
//             {issue.completed ? "Completed" : "Active"}
//           </span>
//         </span>

//       </div>

//       {/* Description Card */}
//       <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5">
//         <h3 className="text-sm font-semibold mb-2 text-gray-500">
//           Description
//         </h3>

//         <p className="text-sm text-gray-800 dark:text-gray-300">
//           {issue.todo}
//         </p>
//       </div>

//       {/* Activity Section (UI only) */}
//       <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5">
//         <h3 className="text-sm font-semibold mb-4 text-gray-500">
//           Activity
//         </h3>

//         <div className="text-sm text-gray-400">
//           No activity yet
//         </div>
//       </div>

//     </div>
//   );
// }

// export default IssueDetail;




// IssueDetail.jsx — Linear-style issue detail page
// Layout: two-column (main content | properties panel)

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIssueById } from "../services/api";

import { LoaderCircle, Check, ArrowLeft } from "lucide-react";

function IssueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await getIssueById(id);
        setIssue(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading issue...</div>;
  }

  if (!issue) {
    return <div className="text-sm text-red-500">Issue not found</div>;
  }

  return (
    <div className="space-y-6 pt-2.5">

      {/* Header */}
      <div className="flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <button
            onClick={() => navigate("/issues")}
            className="flex items-center gap-1 hover:text-gray-800 dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            Issues
          </button>

          <span>/</span>
          <span>#{issue.id}</span>
        </div>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title */}
          <div className="flex items-center gap-3">

            <span>
              {issue.completed ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <LoaderCircle size={16} className="text-yellow-500" />
              )}
            </span>

            <h1 className="text-xl font-semibold">
              {issue.todo}
            </h1>

          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-3 text-gray-500">
              Description
            </h3>

            <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">
              {issue.todo}
            </p>
          </div>

          {/* Activity */}
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4 text-gray-500">
              Activity
            </h3>

            <div className="text-sm text-gray-400">
              No activity yet
            </div>

            {/* Comment Box */}
            <div className="mt-4">
              <input
                placeholder="Leave a comment..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 
                           dark:border-white/10 bg-transparent text-sm focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          {/* Properties */}
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-500">
              Properties
            </h3>

            <div className="space-y-3 text-sm">

              {/* Status */}
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className={`font-medium ${
                  issue.completed ? "text-green-500" : "text-yellow-500"
                }`}>
                  {issue.completed ? "Completed" : "Todo"}
                </span>
              </div>

              {/* Priority (fake) */}
              <div className="flex justify-between">
                <span className="text-gray-500">Priority</span>
                <span className="text-gray-400">Medium</span>
              </div>

              {/* Assign */}
              <div className="flex justify-between">
                <span className="text-gray-500">Assign</span>
                <span className="text-gray-400">Unassigned</span>
              </div>

            </div>
          </div>

          {/* Labels */}
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-500">
              Labels
            </h3>

            <div className="text-sm text-gray-400">
              No labels
            </div>
          </div>

          {/* Project */}
          <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-500">
              Project
            </h3>

            <div className="text-sm text-gray-400">
              Not assigned
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default IssueDetail;