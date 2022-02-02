import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { CHAR_TO_SYMBOLS } from '../constants/charToGroups'

const charToSymbols: { [key: string]: number[] } =
  WORDS.reduce<{ [key: string]: number[] }>(
    (prev, current, index) => {
      prev[current] = CHAR_TO_SYMBOLS[index]
      return prev
    },
    {}
  )

export const getCharSymbols = (char: string) => {
  return charToSymbols[char]
}

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const solution = WORDS[index % WORDS.length].toUpperCase()

  return {
    solution: solution,
    solutionIndex: index,
    solutionSymbols: getCharSymbols(solution),
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, solutionSymbols, tomorrow } = getWordOfDay()
