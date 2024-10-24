import React from 'react';
import { Plus, MessageSquare, Zap, Terminal } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-800 p-4 flex flex-col">
      <button className="flex items-center gap-2 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
        <Plus className="w-5 h-5" />
        <span>New Chat</span>
      </button>

      <nav className="mt-8 flex-1">
        <div className="space-y-2">
          <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Previous Chat 1</span>
          </button>
          <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span>Previous Chat 2</span>
          </button>
        </div>
      </nav>

      <div className="border-t border-gray-800 pt-4 space-y-2">
        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Zap className="w-5 h-5" />
          <span>Upgrade to Pro</span>
        </button>
        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Terminal className="w-5 h-5" />
          <span>API Access</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;