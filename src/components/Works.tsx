
import React from 'react';

const Works = () => {
  const projects = [
    {
      title: "MOTION SERIES 01",
      description: "Experimental animation study exploring fluid dynamics",
      year: "2024",
    },
    {
      title: "IDENTITY SYSTEM",
      description: "Brand evolution through geometric transformation",
      year: "2023",
    },
    {
      title: "INTERACTIVE INSTALLATION",
      description: "Touch-responsive digital environment",
      year: "2023",
    },
    {
      title: "TYPOGRAPHIC EXPERIMENT",
      description: "Deconstructed letterforms in motion",
      year: "2024",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-bold mb-16 tracking-wider">WORKS</h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border-b border-white border-opacity-20 pb-8 cursor-pointer transition-all duration-500 hover:border-opacity-60"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 transition-all duration-300 group-hover:tracking-wider">
                    {project.title}
                  </h3>
                  <p className="text-lg opacity-60 transition-all duration-300 group-hover:opacity-80">
                    {project.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-mono opacity-40">{project.year}</div>
                  <div className="w-12 h-px bg-white opacity-0 transition-all duration-500 group-hover:opacity-60 mt-2" />
                </div>
              </div>
              
              <div className="mt-6 h-32 bg-gradient-to-r from-white to-transparent opacity-0 transition-all duration-500 group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
