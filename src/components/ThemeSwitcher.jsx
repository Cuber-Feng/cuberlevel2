/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../styles/themeswitcher.css";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );
  const options = [
    {
      value: "light",
      label: "Light",
      icon: (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "System",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="
            M12 8a4 4 0 1 0 0 8
            4 4 0 0 0 0-8Z

            M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06
            a2 2 0 1 1-2.83 2.83l-.06-.06
            a1.65 1.65 0 0 0-1.82-.33
            1.65 1.65 0 0 0-1 1.51V21
            a2 2 0 1 1-4 0v-.09
            a1.65 1.65 0 0 0-1-1.51
            1.65 1.65 0 0 0-1.82.33l-.06.06
            a2 2 0 1 1-2.83-2.83l.06-.06
            A1.65 1.65 0 0 0 4.6 15
            a1.65 1.65 0 0 0-1.51-1H3
            a2 2 0 1 1 0-4h.09
            a1.65 1.65 0 0 0 1.51-1
            1.65 1.65 0 0 0-.33-1.82l-.06-.06
            a2 2 0 1 1 2.83-2.83l.06.06
            a1.65 1.65 0 0 0 1.82.33
            1.65 1.65 0 0 0 1-1.51V3
            a2 2 0 1 1 4 0v.09
            a1.65 1.65 0 0 0 1 1.51
            1.65 1.65 0 0 0 1.82-.33l.06-.06
            a2 2 0 1 1 2.83 2.83l-.06.06
            A1.65 1.65 0 0 0 19.4 9
            1.65 1.65 0 0 0 21 10.4H21
            a2 2 0 1 1 0 4h-.09
            a1.65 1.65 0 0 0-1.51.6Z
          "/>
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg viewBox="0 0 24 24">
          <path
            d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-switcher">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`theme-option ${theme === option.value ? "active" : ""
            }`}
          onClick={() => setTheme(option.value)}
          aria-label={option.label}
          aria-pressed={theme === option.value}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}