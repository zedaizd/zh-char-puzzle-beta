import { createContext } from 'react'

export const AppContext = createContext({
  isDarkMode: false,
  setIsDarkMode: (isDarkMode: boolean) => {},
})
