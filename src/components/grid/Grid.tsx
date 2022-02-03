import { CompletedRow } from './CompletedRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  validGuessedSymbols: number[][]
  currentGuess: string
}

export const Grid = ({ guesses, validGuessedSymbols, currentGuess }: Props) => {
  const empties =
    guesses.length < 6 ? Array.from(Array(6 - guesses.length)) : []

  return (
    <div className="flex w-80 mx-auto items-top pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} validSymbols={validGuessedSymbols[i]} />
      ))}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
