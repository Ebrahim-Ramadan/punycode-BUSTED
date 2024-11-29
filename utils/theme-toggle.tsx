import {  Sun, SunDim } from 'lucide-react';
import  { useEffect, useState } from 'react';


export function ModeToggle() {
  const [theme, setTheme] = useState(
    (localStorage.getItem('theme') ) || 'light'
  );

// @ts-ignore
  const handleChangeTheme = (newTheme) => {
    if (theme === newTheme) return;

    const applyTheme = () => {
      document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      setTheme(newTheme);
    };
// @ts-ignore
    if (!document.startViewTransition) return applyTheme();
// @ts-ignore
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
      className="p-4 fixed top-0 left-0 z-50 "
    >
      {theme === 'light' ? 
      <Sun />
       : 
       <SunDim/>
       }
    </button>
  );
}
