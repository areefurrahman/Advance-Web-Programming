function StatCard({ title, value, change }) {
  return (
    <div className="bg-gray-50 dark:bg-[#111] p-5 rounded-xl ">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <h2 className="text-2xl font-semibold mt-2">{value}</h2>

      {change && (
        <p className="text-xs mt-1 text-green-500">
          {change}
        </p>
      )}
    </div>
  );
}

export default StatCard;