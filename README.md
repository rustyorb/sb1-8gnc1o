# Red Team Assistant

A modern React-based chat interface designed for adversarial analysis and prompt engineering. This application provides an intuitive interface for interacting with AI models through Ollama, specifically tailored for red team security analysis workflows.

## Features

- **Modern Chat Interface**: Clean, responsive design optimized for security analysis workflows
- **Ollama Integration**: Connects to local Ollama instance for AI model interactions
- **Prompt Workspace**: Dedicated sidebar for managing prompt templates (expandable)
- **Red Team Theme**: Dark theme with red accents appropriate for security tooling
- **Error Handling**: Robust error handling for network and AI service issues

## Prerequisites

- Node.js 18+ 
- Ollama running locally on port 11434
- An Ollama model installed (e.g., `ollama pull llama2`)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Ollama (in separate terminal):**
   ```bash
   ollama serve
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

Built with:
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience  
- **Vite** - Fast development and build tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library

## Usage

1. Ensure Ollama is running with a model installed
2. Type your prompts in the chat interface
3. The assistant will stream responses in real-time
4. Use the workspace sidebar for prompt template management (future feature)

## Development

The application follows modern React patterns with TypeScript for type safety. The chat interface supports real-time streaming from Ollama models and includes proper error handling for network issues.

[Edit in StackBlitz ⚡️](https://stackblitz.com/~/github.com/rustyorb/sb1-8gnc1o)