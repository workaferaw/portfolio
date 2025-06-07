import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Instagram, Send } from 'lucide-react';
import FAQSuggestions from './FAQSuggestions';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false); // Renamed from showSuggestions for clarity
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat history when it updates
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleAskWerqClick = () => {
    setShowChat(prev => !prev);
    setChatInput('');
    setChatHistory([]); // Clear chat history when toggling
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setChatInput(suggestion);
    handleSendMessage(suggestion); // Send suggestion directly
  };

  const handleSendMessage = async (messageToSend: string) => {
    if (!messageToSend.trim()) return;

    console.log('Attempting to send message to backend:', messageToSend);

    const newUserMessage: Message = { role: 'user', content: messageToSend };
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatInput('');
    setIsLoading(true);

    // IMPORTANT: Replace with your actual DeepSeek AI pre-prompt
    const prePrompt = `You are Werq, a 21-year-old Christian creator, designer, and programmer living in Koye Feche, a suburb of Addis Ababa. Originally from Sidama in southern Ethiopia, you're currently working full-time at Meri Podcast — one of Ethiopia's top business podcasts — where you handle everything from graphic design to photography and video production. You're skilled in tools like Photoshop and Illustrator, and you're actively leveling up in Premiere Pro and After Effects to sharpen your video editing game. Technically, you code in Python using VS Code and Cursor, while also learning JavaScript and diving deep into AI and machine learning. You're curious by nature, borderline addicted to learning, especially when it comes to tech, systems, and creative storytelling.

Time is your most limited resource — you only get around 1 hour on weekdays for personal projects, but you make up for it with 6 to 7 focused hours on weekends. Financially, you're currently earning 27k ETB/month, with 11k going to rent and about 8k saved monthly. Your short-term goal is to save up 100k to 150k ETB in the next six months so you can quit your job and fully invest your time into building and experimenting.

What you're building next is a sleek, faceless YouTube channel with voice narration — content focused on tech, football, and documentary-style storytelling. You're not trying to be a solo creator forever either — you want it to scale, with a team behind it. Long-term, your dream is to launch a global startup (ideally backed by something like Y Combinator), travel internationally, and at the same time run a serious export business with your dad — pushing kettles, beef, milk, fruits, and veggies from Ethiopia to the world.

You think fast, move intentionally, and value blunt, practical feedback over fluff. You want ChatGPT to be a partner who helps turn vague ideas into systems, breaks down ambitious goals into real steps, and constantly pushes you to execute smarter — not just dream bigger.

This is an experimental project to showcase your skills and aspirations. When answering questions, strictly use the information provided above. If a question is outside this scope, politely state that you can only provide information based on Werq's portfolio and professional details.`;

    try {
      const response = await fetch('http://localhost:3001/api/chat', { // Assuming your proxy runs on port 3001
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          prePrompt: prePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const aiResponse = await response.json();
      const newAiMessage: Message = { role: 'ai', content: aiResponse };
      setChatHistory(prev => [...prev, newAiMessage]);

    } catch (error) {
      console.error('Error sending message to DeepSeek AI:', error);
      setChatHistory(prev => [...prev, { role: 'ai', content: 'Oops! Something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="text-center">
        <div 
          className={`mb-8 flex justify-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <Avatar className="w-20 h-20 md:w-24 md:h-24 border-2 border-foreground/20 rounded-[1.5rem]">
            <AvatarImage src="/placeholder.svg" alt="workaferaw" />
            <AvatarFallback className="bg-foreground/10 text-foreground text-lg">
              w
            </AvatarFallback>
          </Avatar>
        </div>
        
        <h1 
          className={`tracking-wider transition-all duration-2000 lowercase ${
            isLoaded 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          }}
        >
          workaferaw
        </h1>
        
        <div 
          className={`mt-4 flex justify-center space-x-6 transition-all duration-1500 delay-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a 
            href="https://github.com/workaferaw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://instagram.com/workaferaw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://t.me/workaferaw" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground transition-colors"
          >
            <Send size={24} />
          </a>
        </div>

        <div 
          className={`mt-8 text-sm tracking-[0.3em] transition-all duration-1000 delay-1000 lowercase ${
            isLoaded ? 'opacity-60' : 'opacity-0'
          }`}
        >
          creative portfolio
        </div>

        <button
          onClick={handleAskWerqClick}
          className={`mt-8 px-6 py-3 border border-foreground/20 rounded-[1.5rem] text-sm lowercase tracking-wider hover:bg-foreground/10 transition-all duration-300 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
        >
          {showChat ? 'close chat' : 'ask werq'}
        </button>

        {showChat && (
          <div className="mt-8 max-w-2xl mx-auto p-4 bg-background/5 border border-foreground/10 rounded-[1.5rem] flex flex-col items-center justify-between min-h-[250px] transition-all duration-300">
            <div ref={chatHistoryRef} className="flex-grow w-full text-left overflow-y-auto pr-2 scrollbar-hide mb-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`mb-2 text-sm ${msg.role === 'user' ? 'text-foreground/80' : 'text-foreground'}`}>
                  <span className="font-bold">{msg.role === 'user' ? 'you: ' : 'werq: '}</span>{msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="text-sm text-foreground/60">werq is typing...</div>
              )}
            </div>
            <div className="w-full flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(chatInput);
                  }
                }}
                className="flex-grow bg-transparent text-foreground lowercase focus:outline-none focus:border-foreground/40"
                disabled={isLoading}
              />
              <button 
                onClick={() => handleSendMessage(chatInput)}
                className="p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors text-foreground/80"
                disabled={isLoading}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-4 w-full">
              <FAQSuggestions onSelectSuggestion={handleSelectSuggestion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
