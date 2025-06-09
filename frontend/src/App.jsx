import { useState, useEffect, useRef } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to the Tech Support Bot! How can I assist you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();

      const botMessages = Array.isArray(data.messages) ? data.messages : [data.messages];

      const newBotMessages = botMessages.map((text) => ({
        sender: 'bot',
        text,
      }));

      setMessages((prev) => [...prev, ...newBotMessages]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <header className="bg-gradient-to-r from-black to-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Tech Support Bot</h1>
      </header>
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} isLoading={isLoading} chatEndRef={chatEndRef} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
