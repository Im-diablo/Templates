import { useState, useEffect } from 'react';
import { Button3D } from '@/components/ui/Button3D';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.add('light');
    } else {
      setIsDark(true);
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button3D
      variant="cyber"
      size="md"
      onClick={toggleTheme}
      className="w-12 h-12 p-0"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 transition-transform duration-500">
        {isDark ? (
          // Moon icon (currently in dark mode)
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Sun icon (currently in light mode)
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"/>
            <path d="m12 1-3 6 3-6zm0 18-3 6 3-6zm11-5-6-3 6 3zM1 12l6-3-6 3zm15.5-6.5-4.2 4.2 4.2-4.2zM6.7 17.7l4.2-4.2-4.2 4.2zm10.6 0-4.2-4.2 4.2 4.2zM6.7 6.3l4.2 4.2-4.2-4.2z"/>
          </svg>
        )}
      </div>
    </Button3D>
  );
};