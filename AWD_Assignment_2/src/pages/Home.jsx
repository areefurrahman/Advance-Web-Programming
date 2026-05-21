import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function Home() {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <>
            <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                Welcome to TechSphere
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your one-stop solution for all tech-related needs. Explore our employee directory to find the best talent in the industry.
            </p>
        </>
    );
}

export default Home;