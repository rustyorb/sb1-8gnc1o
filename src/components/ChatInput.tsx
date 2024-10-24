import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  onSubmit,
  isGenerating,
}) => {
  return (
    <form onSubmit={onSubmit} className="relative max-w-3xl mx-auto">
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
  );
};

export default ChatInput;