import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Employees from "./pages/Employees";

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      <Header />

      <main className='flex-1 max-w-7xl mx-auto w-full px-6 py-8'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;