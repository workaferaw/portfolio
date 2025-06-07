
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="text-center">
        <h1 
          className={`text-8xl md:text-9xl font-bold tracking-wider transition-all duration-2000 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          WORKAFERAW
        </h1>
        
        <div 
          className={`mt-8 w-64 h-px bg-white mx-auto transition-all duration-1500 delay-500 ${
            isLoaded ? 'scale-x-100 opacity-70' : 'scale-x-0 opacity-0'
          }`}
        />
        
        <div 
          className={`mt-16 text-sm tracking-[0.3em] uppercase transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        >
          Creative Portfolio
        </div>
      </div>
    </div>
  );
};

export default Hero;
