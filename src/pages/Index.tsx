import React, { useEffect, useRef } from 'react';
import Hero from '@/components/Hero';
import Works from '@/components/Works';
import Contact from '@/components/Contact';
import ChatInterface from '@/components/ChatInterface'; // Added import
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
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <BackgroundShapes />
      <Navigation />
      
      <main className="relative z-10">
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>
        
        <section id="works" className="min-h-screen fade-in-section">
          <Works />
        </section>
        
        <section id="contact" className="min-h-screen fade-in-section">
          <Contact />
        </section>

        {/* New Chat Section */}
        <section id="chat" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 fade-in-section">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
              Chat with Gemini
            </h2>
            <ChatInterface />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
