
import React from 'react';
import { Github, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-6xl font-bold mb-16 tracking-wider">CONTACT</h2>
        
        <div className="space-y-12">
          <p className="text-2xl opacity-80 leading-relaxed">
            Ready to create something extraordinary together?
          </p>
          
          <div className="text-xl">
            <a 
              href="mailto:hello@workaferaw.com"
              className="hover:tracking-wider transition-all duration-300 border-b border-white border-opacity-20 hover:border-opacity-60 pb-1"
            >
              hello@workaferaw.com
            </a>
          </div>
          
          <div className="flex justify-center space-x-8 pt-8">
            <a 
              href="https://behance.net/workaferaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-wider uppercase opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              Behance
            </a>
            
            <a 
              href="https://github.com/workaferaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm tracking-wider uppercase opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://instagram.com/workaferaw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm tracking-wider uppercase opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              <Instagram size={16} />
              <span>Instagram</span>
            </a>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white border-opacity-20">
          <p className="text-sm opacity-40">
            © 2024 Workaferaw. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
