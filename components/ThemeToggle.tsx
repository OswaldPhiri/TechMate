"use client";
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const pref = (typeof window !== 'undefined' && localStorage.getItem('techmate-theme')) || 'light';
    document.documentElement.setAttribute('data-theme', pref);
    setChecked(pref === 'dark');
  }, []);

  function onChange(next: boolean) {
    setChecked(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('techmate-theme', theme);
  }

  return (
    <label className="toggle" title="Toggle dark mode">
      <span>Dark mode</span>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    </label>
  );
}


