import React from "react";

function Skills({ isDarkMode }) {
  const skillsList = ["NodeJS", "Express", "React", "Graphic Designing"];

  return (
    <section className="py-10">
      {/* Small, bold heading to match a professional portfolio style */}
      <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'} uppercase tracking-[0.2em] mb-6`}>
        Technical Skills
      </h3>

      {/* flex-wrap ensures it looks good on mobile; gap-3 keeps them close */}
      <div className="flex flex-wrap gap-3">
        {skillsList.map((skill) => (
          <span 
            key={skill} 
            className={`px-5 py-2 border text-sm font-medium transition-all duration-200 cursor-default ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:border-white hover:text-white' 
                : 'border-gray-200 text-gray-700 hover:border-black hover:text-black'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;