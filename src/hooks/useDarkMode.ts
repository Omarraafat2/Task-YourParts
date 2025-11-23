'use client';

import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get saved mode or detect system preference
    const darkMode =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(darkMode);

    // Set HTML data-theme
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    localStorage.setItem("darkMode", String(newDarkMode));

    // Apply theme
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
  };

  return { isDark, toggleDarkMode, mounted };
};
