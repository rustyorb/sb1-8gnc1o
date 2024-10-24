import React, { useEffect, useState } from 'react';

interface StreamingTextProps {
  content: string;
  speed?: number;
  onComplete?: () => void;
}

function StreamingText({ content, speed = 20, onComplete }: StreamingTextProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [content, currentIndex, speed, onComplete]);

  return <span>{displayedContent}</span>;
}

export default StreamingText;