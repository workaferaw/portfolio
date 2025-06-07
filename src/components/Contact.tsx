import React from 'react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-6xl w-full text-center">
        <h2 className="mb-8 tracking-wider lowercase">contact</h2>
        
        <p className="text-xl md:text-2xl mb-12 text-foreground/80 lowercase">
          have a project in mind or just want to chat? <br />feel free to reach out.
        </p>
        
        <div className="space-y-4">
          <a 
            href="mailto:hello@workaferaw.com"
            className="inline-block text-2xl md:text-3xl font-light text-foreground hover:text-foreground/80 transition-colors lowercase"
          >
            hello@workaferaw.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;
