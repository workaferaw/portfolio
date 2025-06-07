
import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-4xl">
        <h2 className="text-6xl font-bold mb-16 tracking-wider">ABOUT</h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-xl leading-relaxed opacity-80">
              Workaferaw operates at the intersection of digital art and experimental design, 
              crafting immersive experiences that challenge conventional boundaries.
            </p>
            
            <p className="text-lg leading-relaxed opacity-60">
              Through motion, interaction, and abstract visual language, each project becomes 
              a unique exploration of form, function, and the spaces between them.
            </p>
            
            <div className="flex space-x-8 pt-8">
              <div>
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm opacity-60">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm opacity-60">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold">∞</div>
                <div className="text-sm opacity-60">Experiments</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full h-64 border border-white opacity-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-5" />
              <div className="absolute top-4 left-4 w-16 h-16 border border-white opacity-30" />
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-white opacity-40 rotate-45" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl opacity-20">
                W
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
