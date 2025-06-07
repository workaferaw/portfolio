
import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Works from '@/components/Works';
import Experiments from '@/components/Experiments';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import BackgroundShapes from '@/components/BackgroundShapes';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <BackgroundShapes />
      <Navigation />
      
      <main className="relative z-10">
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>
        
        <section id="about" className="min-h-screen fade-in-section">
          <About />
        </section>
        
        <section id="works" className="min-h-screen fade-in-section">
          <Works />
        </section>
        
        <section id="experiments" className="min-h-screen fade-in-section">
          <Experiments />
        </section>
        
        <section id="contact" className="min-h-screen fade-in-section">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Index;
