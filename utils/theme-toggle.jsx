import { Lightbulb, LightbulbOff, Sun, SunDim } from 'lucide-react';
import React, { useEffect, useState } from 'react';


const KEYS = ['ctrl+u', 'meta+u'];

export function ModeToggle() {
  const [theme, setTheme] = useState(
    (localStorage.getItem('theme') ) || 'light'
  );

  const handleChangeTheme = (newTheme) => {
    if (theme === newTheme) return;

    const applyTheme = () => {
      document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    };

    if (!document.startViewTransition) return applyTheme();
    document.startViewTransition(applyTheme);
  };

  const toggleTheme = () => {
    handleChangeTheme(theme === 'light' ? 'dark' : 'light');
  };


  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 fixed top-0 left-0 z-50 "
    >
      {theme === 'light' ? 
      <Sun />
       : 
       <SunDim/>
       }
    </button>
  );
}
