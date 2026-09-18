import { useTheme } from '@/components/theme-provider'
import useColorMode from '../../hooks/useColorMode'

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode()
  const { setTheme } = useTheme()
  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          colorMode === 'dark' ? 'bg-primary' : 'bg-stroke'
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setColorMode === 'function') {
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
              setTheme(colorMode === 'light' ? 'dark' : 'light')
            }
          }}
          checked={colorMode === 'dark'}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            colorMode === 'dark' ? 'right-[3px] translate-x-full' : ''
          }`}
        >
          <span
            className={`dark:inline-block ${colorMode === 'dark' ? 'hidden' : 'inline-block'}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... (Your light mode SVG code) */}
            </svg>
          </span>
          <span
            className={`dark:hidden ${colorMode === 'dark' ? 'inline-block' : 'hidden'}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ... (Your dark mode SVG code) */}
            </svg>
          </span>
        </span>
      </label>
    </li>
  )
}

export default DarkModeSwitcher
