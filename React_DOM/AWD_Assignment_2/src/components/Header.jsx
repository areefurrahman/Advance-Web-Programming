import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`p-4 ${isDarkMode ? 'bg-gray-700 border-b border-gray-700' : 'bg-white border-b border-gray-200'}`}>
      
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          TechSphere
        </h1>

        <nav className="flex items-center gap-6">
          <Link to="/" className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Home
          </Link>
          <Link to="/employees" className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Employees
          </Link>
        </nav>

        <button
          onClick={toggleTheme}
          className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} px-5 py-2 rounded cursor-pointer transition-colors duration-300`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

      </div>
    </header>
  );
}

export default Header;