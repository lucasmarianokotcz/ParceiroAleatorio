import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "parceiro-aleatorio-theme"

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === "light" || stored === "dark") {
      return stored
    }
  } catch {
    // Ignore storage access failures.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Ignore storage access failures.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  return { theme, setTheme, toggleTheme }
}
