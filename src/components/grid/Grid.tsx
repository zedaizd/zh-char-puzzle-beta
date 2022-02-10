import { getCharSymbols } from '../../lib/words'
import { CompletedRow } from './CompletedRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
}

export const Grid = ({ guesses }: Props) => {
  const empties =
    guesses.length < 6 ? Array.from(Array(6 - guesses.length)) : []

  return (
    <div className="flex w-80 h-60 mx-auto items-top justify-center pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} symbols={getCharSymbols(guess)} />
      ))}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
