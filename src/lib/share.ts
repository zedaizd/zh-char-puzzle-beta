import { getGuessStatuses, getSymbolStatus } from './statuses'
import { getCharSymbols, solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  let checkedInvalidSymbols: number[] = []

  return guesses
    .map((guess) => {
      if (getGuessStatuses(guess)[0] === 'correct') {
        return '⭐'
      }

      const symbols = getCharSymbols(guess)

      return symbols
        .map((s) => {
          // Intentionally reporting absent parts only.
          // Because we don't want to leak any information about the answer
          if (
            !checkedInvalidSymbols.includes(s) &&
            getSymbolStatus(s) === 'absent'
          ) {
            checkedInvalidSymbols.push(s)
            return '🟥'
          } else return '⬜'
        })
        .join('')
    })
    .join('\n')
}
