import { HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from '../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full bg-text-dark dark:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <HiSun className="text-xl text-white dark:text-text-dark" />
      ) : (
        <HiMoon className="text-xl text-white dark:text-text-dark" />
      )}
    </button>
  )
}

export default ThemeToggle
