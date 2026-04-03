import { useState, useEffect } from 'react'

const THEME_KEY = 'theme'

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem(THEME_KEY, 'dark')
    } else {
      root.removeAttribute('data-theme')
      localStorage.setItem(THEME_KEY, 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return { isDarkMode, toggleTheme }
}
