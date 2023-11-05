import {useState} from 'react';

export type Theme = "dark-theme" | "light-theme";
export const useTheme = () => {
  const [currentTheme, setCurrentTheme] =  useState( (localStorage.getItem("theme") as Theme) || "light-theme");
  const switchTheme = () => {
    setCurrentTheme((prevTheme) => {
      const newTheme = prevTheme === "light-theme" ? "dark-theme" : "light-theme";
      document.documentElement.className = newTheme;
      localStorage.setItem("theme", newTheme);
      return newTheme;
    })
  };
  const themeIcon =  currentTheme === "dark-theme" ? "moon" : "sun"

  const isDarkMode = () => currentTheme === "dark-theme";

  const setTheme = () => {
    const theme = (localStorage.getItem("theme") as Theme) || "light-theme";
    document.documentElement.className = theme;
    setCurrentTheme(theme);
    localStorage.setItem("theme", currentTheme);
  };

  return {
    currentTheme,
    themeIcon,
    switchTheme,
    setTheme,
    setCurrentTheme,
    isDarkMode,
  };
};
