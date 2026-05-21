import React from "react";
function Projects({ isDarkMode }) {
    const projectsList = [
        {
            name: "Project 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "Project Comming Soon"
        },
        {
            name: "Project 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            link: "Project Comming Soon"
        }
    ]
    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 py-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                {projectsList.map((project) => (
                    <div
                        key={project.name}
                        className={`group flex flex-col justify-between p-6 border rounded shadow-sm hover:shadow-xl transition-all duration-300 ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 hover:border-gray-500'
                                : 'bg-white border-gray-200 hover:border-black'
                            }`}
                    >
                        <div>
                            {/* Project Name */}
                            <h3 className={`text-xl font-bold mb-2 uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-black'
                                }`}>
                                {project.name}
                            </h3>

                            {/* Project Description */}
                            <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => { alert(project.link) }}
                            className={`w-full py-3 border-2 font-semibold rounded transition-colors duration-300 text-sm cursor-pointer ${isDarkMode
                                    ? 'border-white text-white hover:bg-white hover:text-gray-900'
                                    : 'border-black text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            View Project
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Projects;