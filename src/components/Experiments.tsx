
import React from 'react';

const Experiments = () => {
  const experiments = [
    { title: "GENERATIVE PATTERNS", type: "Code" },
    { title: "PARTICLE SYSTEM", type: "WebGL" },
    { title: "SOUND VISUALIZATION", type: "Audio" },
    { title: "MICRO INTERACTIONS", type: "Motion" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-6xl w-full">
        <h2 className="text-6xl font-bold mb-16 tracking-wider">EXPERIMENTS</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <div
              key={index}
              className="group border border-white border-opacity-20 p-8 cursor-pointer transition-all duration-500 hover:border-opacity-60 hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{experiment.title}</h3>
                <span className="text-sm opacity-40 font-mono">{experiment.type}</span>
              </div>
              
              <div className="h-32 bg-gradient-to-br from-white to-transparent opacity-5 transition-all duration-500 group-hover:opacity-10 relative overflow-hidden">
                <div className="absolute inset-0 border border-white opacity-0 transition-all duration-500 group-hover:opacity-20" />
                <div className="absolute top-2 left-2 w-4 h-4 bg-white opacity-20" />
                <div className="absolute bottom-2 right-2 w-2 h-16 bg-white opacity-30" />
              </div>
              
              <div className="mt-4 text-sm opacity-0 transition-all duration-500 group-hover:opacity-60">
                View Experiment →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
