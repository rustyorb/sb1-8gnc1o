import { Message } from '../types';

const OLLAMA_URL = 'http://127.0.0.1:11434';

export class OllamaError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'OllamaError';
  }
}

export async function* streamCompletion(messages: Message[]) {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new OllamaError(
        errorData.error || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const reader = response.body?.getReader();
    if (!reader) throw new OllamaError('No reader available');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim()) {
          try {
            const data = JSON.parse(line);
            if (data.error) {
              throw new OllamaError(data.error);
            }
            yield data.response;
          } catch (e) {
            if (e instanceof OllamaError) throw e;
            if (e instanceof SyntaxError) {
              console.error('Failed to parse JSON:', line);
              continue;
            }
            throw e;
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof OllamaError) {
      throw error;
    }
    throw new OllamaError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}