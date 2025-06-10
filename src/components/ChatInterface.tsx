import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const callChatApi = async (data: { userMessage: string; prePrompt: string }): Promise<string> => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: data.userMessage, prePrompt: data.prePrompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'API request failed');
  }

  // The server directly returns the AI's text response as a string
  return response.text();
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [prePrompt] = useState<string>("You are a helpful AI assistant. Answer the user's questions clearly and concisely.");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const mutation = useMutation({
    mutationKey: ['chat'],
    mutationFn: callChatApi,
    onSuccess: (aiResponseText: string) => {
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    },
    onError: (error: Error) => {
      console.error("Error calling chat API:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: `Sorry, I couldn't connect to the assistant. Error: ${error.message}`,
        sender: 'ai',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    },
  });

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || mutation.isPending) {
      return;
    }

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputMessage.trim(),
      sender: 'user',
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    mutation.mutate({ userMessage: inputMessage.trim(), prePrompt });
    setInputMessage('');
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl rounded-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100">Gemini Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 border rounded-lg bg-slate-100 dark:bg-slate-800 shadow-sm">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            <span className="font-medium">Current Persona:</span> {prePrompt}
          </p>
        </div>
        <ScrollArea className="h-[350px] sm:h-[400px] w-full p-4 border rounded-lg bg-slate-50 dark:bg-slate-900 shadow-inner" ref={scrollAreaRef}>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-2 px-3 rounded-xl max-w-[85%] break-words shadow-md ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : message.id.startsWith('error-')
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 border border-red-300 dark:border-red-700'
                        : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          {mutation.isPending && (
            <div className="flex justify-center items-center pt-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-500 dark:border-slate-400"></div>
              <p className="ml-2 text-sm text-slate-500 dark:text-slate-400">AI is thinking...</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center space-x-3 p-4 border-t dark:border-slate-700">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !mutation.isPending) {
              handleSendMessage();
            }
          }}
          className="flex-grow rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          disabled={mutation.isPending}
        />
        <Button onClick={handleSendMessage} disabled={mutation.isPending} className="rounded-lg px-5">
          {mutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending
            </>
          ) : (
            'Send'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
