import React from 'react';
import { PromptTemplate } from '../types';

interface PromptWorkspaceProps {
  showWorkspace: boolean;
  activePrompt: PromptTemplate | null;
  setActivePrompt: (prompt: PromptTemplate | null) => void;
}

const PromptWorkspace: React.FC<PromptWorkspaceProps> = ({
  showWorkspace,
  activePrompt,
  setActivePrompt,
}) => {
  if (!showWorkspace) return null;

  return (
    <aside className="w-80 border-r border-red-900/30 bg-gray-900/95 p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-red-50">Prompt Templates</h2>
        <div className="space-y-2">
          {/* Template categories will be added here */}
          <div className="text-sm text-red-400">No templates available</div>
        </div>
      </div>
    </aside>
  );
};

export default PromptWorkspace;