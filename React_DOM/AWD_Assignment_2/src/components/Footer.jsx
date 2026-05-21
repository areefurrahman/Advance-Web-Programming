import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <footer className={`border-t px-6 py-4 mt-8 ${isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}>
            <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                © 2025 TechSphere
            </p>
        </footer>
    );
}

export default Footer;