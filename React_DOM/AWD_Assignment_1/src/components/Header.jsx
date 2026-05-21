import React from "react";

function Header({isDarkMode, toggleDarkMode}) {
    const navLinks = [
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" }

    ];
    return (
        <>
            <header className={` p-4 ${isDarkMode ? 'bg-gray-700 border-b border-gray-700 ' : 'bg-white border-b border-gray-200'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Areef ur Rahman</h1>
                    <nav className="flex items-center justify-center gap-6">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                                {link.name}
                            </a>
                        ))}
                    </nav>
                    <button 
                    onClick={toggleDarkMode}
                    className={`${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} px-5 py-2 rounded cursor-pointer transition-colors duration-300`}
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                </div>
            </header>
        </>

    )
}

export default Header;