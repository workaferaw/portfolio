
import React, { useEffect, useRef } from 'react';

const BackgroundShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      
      const shapes = containerRef.current.children;
      Array.from(shapes).forEach((shape, index) => {
        const element = shape as HTMLElement;
        const speed = (index + 1) * 0.1;
        element.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x * 0.5}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-white opacity-10 transform rotate-45 transition-transform duration-1000" />
      <div className="absolute top-40 right-32 w-16 h-16 bg-white opacity-5 rounded-full transition-transform duration-1000" />
      <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-white opacity-15 transition-transform duration-1000" />
      <div className="absolute top-1/3 right-20 w-20 h-1 bg-white opacity-20 transition-transform duration-1000" />
      <div className="absolute bottom-20 right-40 w-28 h-28 border border-white opacity-8 transform rotate-12 transition-transform duration-1000" />
      <div className="absolute top-1/2 left-10 w-2 h-40 bg-white opacity-15 transition-transform duration-1000" />
    </div>
  );
};

export default BackgroundShapes;
