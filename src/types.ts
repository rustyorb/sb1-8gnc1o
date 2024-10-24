export interface Message {
  role: 'assistant' | 'user';
  content: string;
  type?: 'message' | 'analysis' | 'system';
  id?: string;
}

export interface PromptTemplate {
  id: number;
  name: string;
  category: string;
  content?: string;
}