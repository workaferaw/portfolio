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
        <h2 className="mb-16 tracking-wider lowercase">works</h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group border border-foreground/10 rounded-[1.5rem] p-8 cursor-pointer transition-all duration-500 hover:border-foreground/20"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="mb-2 transition-all duration-300 group-hover:tracking-wider lowercase">
                    {project.title}
                  </h3>
                  <p className="text-foreground/60 transition-all duration-300 group-hover:text-foreground/80 lowercase">
                    {project.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground/40">{project.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
