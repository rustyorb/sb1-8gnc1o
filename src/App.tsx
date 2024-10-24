import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Shield, Skull, Terminal } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import PromptWorkspace from './components/PromptWorkspace';
import { Message, PromptTemplate } from './types';
import { streamCompletion } from './services/ollama';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: 'Red Team Assistant initialized. Ready to assist with adversarial analysis and prompt engineering.',
    type: 'system'
  }]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(true);
  const [activePrompt, setActivePrompt] = useState<PromptTemplate | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isGenerating) return;

    const userMessage: Message = {
      role: 'user',
      content: message,
      type: 'message'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsGenerating(true);

    // Add initial assistant message
    const assistantMessageId = Date.now().toString();
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: '',
      type: 'message',
      id: assistantMessageId
    }]);

    try {
      let fullResponse = '';
      for await (const chunk of streamCompletion([...messages, userMessage])) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: fullResponse }
            : msg
        ));
      }
    } catch (error) {
      console.error('Streaming error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        type: 'system'
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <PromptWorkspace 
        showWorkspace={showWorkspace}
        activePrompt={activePrompt}
        setActivePrompt={setActivePrompt}
      />
      
      <main className="flex-1 flex flex-col">
        <header className="border-b border-red-900/30 p-4 bg-gray-900/95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center p-1.5 bg-red-950/30 rounded-lg">
                <Skull className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-red-50">Red Team Assistant</h1>
                <p className="text-xs text-red-400">Adversarial Analysis Mode</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowWorkspace(!showWorkspace)}
                className="p-2 hover:bg-red-950/30 rounded-lg transition-colors"
              >
                <Terminal className="w-5 h-5 text-red-400" />
              </button>
              <button className="p-2 hover:bg-red-950/30 rounded-lg transition-colors">
                <Shield className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 space-y-6">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="border-t border-red-900/30 p-4 bg-gray-900/95">
          <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your prompt or message..."
              className="w-full bg-gray-800 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 border border-red-900/30"
              disabled={isGenerating}
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-red-400" />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}

export default App;