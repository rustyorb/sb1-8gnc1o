import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps extends Message {}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, type }) => {
  const isSystem = type === 'system';
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex gap-4 ${isSystem ? 'opacity-75' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
        ${isAssistant ? 'bg-red-950/30' : 'bg-gray-800'}`}>
        {isAssistant ? (
          <Bot className="w-5 h-5 text-red-400" />
        ) : (
          <User className="w-5 h-5 text-gray-400" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isAssistant ? 'Assistant' : 'User'}
        </div>
        <div className="prose prose-invert max-w-none">
          {content || (isAssistant && <span className="animate-pulse">▊</span>)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;