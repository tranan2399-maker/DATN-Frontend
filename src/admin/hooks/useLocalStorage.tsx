import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T): any {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue

      return initialValue
    }
  })

  // useEffect to update local storage when the state changes
  useEffect(() => {
    const valueToStore =
      typeof storedValue === 'function' ? storedValue(storedValue) : storedValue
    // Save state
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
