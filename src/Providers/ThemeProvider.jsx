import { useState, useEffect } from "react";

import { ThemeContext } from "../Context/ThemeContext";

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "LightTheme");

  useEffect(() => {
    document.body.classList.add(theme);
  }, [theme]);

  const handleTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
