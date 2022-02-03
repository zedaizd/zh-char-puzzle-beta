import { getCharSymbols } from '../../lib/words'
import { CompletedRow } from './CompletedRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  solutionSymbols: number[]
}

export const Grid = ({ guesses, solutionSymbols }: Props) => {
  const empties =
    guesses.length < 6 ? Array.from(Array(6 - guesses.length)) : []

  const guessedSymbols: number[][] =
    guesses.map(g => getCharSymbols(g).filter(s => solutionSymbols.includes(s)))

  return (
    <div className="flex w-80 mx-auto items-top pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} validSymbols={guessedSymbols[i]} />
      ))}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
