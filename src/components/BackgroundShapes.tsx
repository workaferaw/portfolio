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
      {/* No more floating geometric shapes */}
    </div>
  );
};

export default BackgroundShapes;
