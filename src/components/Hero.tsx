
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="text-center">
        <div 
          className={`mb-8 flex justify-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-white/20 curved-edges">
            <AvatarImage src="/placeholder.svg" alt="Workaferaw" />
            <AvatarFallback className="bg-white/10 text-white text-lg">
              W
            </AvatarFallback>
          </Avatar>
        </div>
        
        <h1 
          className={`text-8xl md:text-9xl font-bold tracking-wider transition-all duration-2000 ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          WORKAFERAW
        </h1>
        
        <div 
          className={`mt-8 w-64 h-px bg-white mx-auto transition-all duration-1500 delay-500 curved-edges ${
            isLoaded ? 'scale-x-100 opacity-70' : 'scale-x-0 opacity-0'
          }`}
        />
        
        <div 
          className={`mt-16 text-sm tracking-[0.3em] transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        >
          creative portfolio
        </div>
      </div>
    </div>
  );
};

export default Hero;
