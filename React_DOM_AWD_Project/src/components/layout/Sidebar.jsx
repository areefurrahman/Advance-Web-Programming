import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import {
  Inbox, CircleDot, FolderKanban, LayoutGrid,
  MoreHorizontal, Zap, ChevronDown, GitBranch, Users,
  Sun,
  Moon,
  LayoutDashboard,
  Contact,
  Settings
} from "lucide-react";



// Reusable: small icon wrapper
const Icon = ({ component: C, size = 15 }) => (
  <C size={size} strokeWidth={1.9} />
);

//  Reusable: section label (e.g. "Workspace", "Your teams")
const SectionHeader = ({ label }) => (
  <div className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500
                  font-medium cursor-pointer hover:text-gray-300 select-none">
    {label}
    <Icon component={ChevronDown} size={12} />
  </div>
);

//  Reusable: nav row
const NavItem = ({ icon, label, active = false, indent = false }) => (
  <div className={` flex items-center gap-2.5 px-3 py-1.5 mx-1 rounded-md cursor-pointer text-sm transition-colors duration-100
    ${indent ? "pl-7" : ""}
    ${active
      ? "bg-gray-300 text-brand-text-light dark:bg-[#1b1b1b] dark:text-white"
      : " text-brand-text-light hover:bg-gray-300/50 dark:hover:bg-[#1b1b1b83] dark:text-brand-text-dark dark:hover:text-gray-100"}
  `}>
    <span className="shrink-0"><Icon component={icon} /></span>
    {label}
    
  </div>
);



const NavItemLink = ({ icon, label, link = "#", active = false, indent = false }) => (
  <div className={` flex items-center gap-2.5 px-3 py-1.5 mx-1 rounded-md cursor-pointer text-sm transition-colors duration-100
    ${indent ? "pl-7" : ""}
    ${active
      ? "bg-gray-300 text-brand-text-light dark:bg-[#1b1b1b] dark:text-white"
      : " text-brand-text-light hover:bg-gray-300/50 dark:hover:bg-[#1b1b1b83] dark:text-brand-text-dark dark:hover:text-gray-100"}
  `}>
    <span className="shrink-0"><Icon component={icon} /></span>
    <Link to={link}>{label}</Link>
  </div>
);

// Reusable: thin horizontal divider
const Divider = () => <div className="border-t border-transparent my-2 mx-3" />;





// Main Sidebar 
function Sidebar() {

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (    
    <div className="w-65 h-screen bg-gray-100 text-gray-900 flex flex-col py-7 pl-2.5 select-none 
                    dark:bg-black dark:text-white">

      {/* Workspace name + logo */}
      <div className="flex items-center gap-2 px-3 pb-3 cursor-pointer">
        <span className="w-6 h-6 rounded bg-emerald-500 flex items-center
                         justify-center text-xs font-bold ">F</span>
        <span className="text-sm font-semibold">FYP BPRIS</span>
        <Icon component={ChevronDown} size={13} />
      </div>

      <Divider />

      {/* Personal */}
      <NavItem icon={Inbox} label="Inbox" />
      <NavItem icon={CircleDot} label="My issues" />

      <Divider />

      {/* Workspace */}
      <SectionHeader label="Workspace" />
      <NavItem icon={FolderKanban} label="Projects" />
      <NavItem icon={LayoutGrid} label="Views" />
      <NavItem icon={MoreHorizontal} label="More" />

      <Divider />

      {/* Pages*/}
      <SectionHeader label="Pages" />

      <NavItemLink icon={LayoutDashboard} label="Dashboard" link="/" active={location.pathname === "/"} />
      <NavItemLink icon={CircleDot} label="Issues" link="/issues" active={location.pathname === "/issues"} />
      <NavItemLink icon={Contact} label="Contact" link="/contact" active={location.pathname === "/contact"} />
      <NavItemLink icon={Settings} label="Settings" link="/settings" active={location.pathname === "/settings"} />

      <Divider />

      {/* Try */}
      <SectionHeader label="Try" />
      <NavItem icon={Inbox} label="Import issues" />
      <NavItem icon={Users} label="Invite people" />
      <NavItem icon={GitBranch} label="Connect GitHub" />

      {/* Free plan badge — pushed to bottom */}
      <div className="flex-1" />
      <div className="mx-3 mb-2">

         <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-full border dark:border-white/25 border-black/25 bg-transparent  text-sm w-full cursor-pointer flex items-center justify-center gap-2.5 "
            >
                {theme === "light" ? <Icon component={Moon} /> : <Icon component={Sun} />}
                {theme === "light" ? "Dark Mode" : "Light Mode "}
            </button>


       
      </div>

    </div>
  );
}

export default Sidebar;