'use client';

import { useLayoutEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      localStorage.getItem('theme') === 'dark',
    );
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer transition-colors hover:text-foreground"
      aria-label="Toggle dark mode"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  );
}
