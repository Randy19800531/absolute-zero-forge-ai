
import { useEffect } from 'react';

interface FontLoaderProps {
  fontFamily: string;
}

const FontLoader = ({ fontFamily }: FontLoaderProps) => {
  useEffect(() => {
    // Don't load system fonts
    const systemFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia'];
    if (systemFonts.includes(fontFamily)) {
      return;
    }

    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
    if (existingLink) {
      return;
    }

    // Create and append Google Fonts link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Cleanup function
    return () => {
      const linkToRemove = document.querySelector(`link[href*="${fontFamily.replace(/\s+/g, '+')}"]`);
      if (linkToRemove && linkToRemove.parentNode) {
        linkToRemove.parentNode.removeChild(linkToRemove);
      }
    };
  }, [fontFamily]);

  return null;
};

export default FontLoader;
