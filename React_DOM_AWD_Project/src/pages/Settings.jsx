import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: "Areef Rahman",
    email: "areef@example.com",
  });

  const [notifications, setNotifications] = useState(true);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" py-2.5 px-3">

      {/* Title */}
      <div className="border-b-[0.5px] dark:border-white/10 border-gray-200 flex flex-col gap-1  py-3 pb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your preferences and account settings
        </p>
      </div>


      <div className="max-w-3xl space-y-6 pt-8 mx-auto">



        {/* Profile Card */}
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold">Profile</h2>

          <div className="space-y-3">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 
                         dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-md border border-gray-300 
                         dark:border-white/10 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h2 className="text-lg font-semibold">Preferences</h2>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-1.5 rounded-full border border-gray-300 dark:border-white/20 text-sm"
            >
              {theme === "light" ? "Enable" : "Disable"}
            </button>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Email Notifications</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition
              ${notifications ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}
            `}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition
                ${notifications ? "translate-x-5" : ""}
              `}
              />
            </button>
          </div>

        </div>

        {/* Save Button (UI only) */}
        <div>
          <button
            className="px-5 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;