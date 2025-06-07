import React, { useEffect, useState, useRef } from 'react';
import { X, Sun, Moon } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 32, y: 32 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'works', label: 'works' },
    { id: 'contact', label: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRestore = () => {
    setIsVisible(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!isVisible) {
    return (
      <button
        onClick={handleRestore}
        className="fixed top-4 left-4 z-50 w-8 h-8 bg-foreground/20 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/30 transition-all duration-300"
      >
        <span className="text-xs lowercase">nav</span>
      </button>
    );
  }

  return (
    <nav 
      ref={navRef}
      className="fixed z-50 transition-all duration-300"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="bg-background/20 backdrop-blur-sm rounded-[1.5rem] select-none">
        {/* Header with controls */}
        <div 
          className="flex items-center justify-between p-2 border-b border-foreground/10"
          onMouseDown={handleMouseDown}
        >
          <span className="text-xs text-foreground/60 lowercase">navigation</span>
          <div className="flex space-x-1">
            <button
              onClick={toggleTheme}
              className="w-4 h-4 bg-foreground/20 rounded-[1.5rem] flex items-center justify-center hover:bg-foreground/30 transition-colors"
            >
              {isDarkMode ? <Sun size={8} className="text-foreground/80" /> : <Moon size={8} className="text-foreground/80" />}
            </button>
            <button
              onClick={handleClose}
              className="w-4 h-4 bg-foreground/20 rounded-[1.5rem] flex items-center justify-center hover:bg-red-500/50 transition-colors"
            >
              <X size={8} className="text-foreground/80" />
            </button>
          </div>
        </div>
        
        {/* Navigation items */}
        <div className="flex flex-col space-y-2 p-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left text-xs tracking-wider transition-all duration-300 hover:scale-105 rounded-[1.5rem] px-2 py-1 ${
                activeSection === item.id 
                  ? 'text-foreground opacity-100 bg-foreground/10' 
                  : 'text-foreground opacity-40 hover:opacity-70 hover:bg-foreground/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
