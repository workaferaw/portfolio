import React, { useEffect, useRef, useState } from 'react';

interface FAQSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
}

const FAQSuggestions: React.FC<FAQSuggestionsProps> = ({ onSelectSuggestion }) => {
  const suggestions = [
    "What technologies do you use?",
    "Can you tell me about your experience?",
    "What's your design philosophy?",
    "How do you approach new projects?",
    "What are your rates?",
    "Can I see more of your work?",
  ];

  // Duplicate suggestions to create a seamless loop for continuous scrolling
  const loopedSuggestions = [...suggestions, ...suggestions];

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return; // Ensure ref is available

    const animate = () => {
      if (!scrollContainer) return; // Double check inside loop

      // Only scroll if content overflows and not currently dragging
      if (!isDragging && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        const contentWidth = scrollContainer.scrollWidth / 2; 
        scrollContainer.scrollLeft += 0.2; // Auto-scroll speed

        if (scrollContainer.scrollLeft >= contentWidth) {
          scrollContainer.scrollLeft = 0; // Reset for seamless loop
        }
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start the animation loop when component mounts
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function for useEffect
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, [isDragging]); // Re-run effect when isDragging changes (to pause/resume animation)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1; 
    scrollRef.current.scrollLeft = scrollLeftState - walk;

    if (Math.abs(walk) > 5) { 
      setHasDragged(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent, suggestion: string) => {
    if (hasDragged) {
      e.preventDefault();
    } else {
      onSelectSuggestion(suggestion);
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="w-full overflow-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div className="inline-flex space-x-4 px-8 whitespace-nowrap">
        {loopedSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={(e) => handleClick(e, suggestion)} 
            className="bg-foreground/5 border border-foreground/10 px-4 py-2 rounded-[1.5rem] text-sm text-foreground/80 hover:bg-foreground/10 hover:text-foreground transition-colors lowercase flex-shrink-0"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAQSuggestions; 