import { getGuessStatuses } from '../../lib/statuses'
import { getCharSymbols } from '../../lib/words'
import { Cell } from './Cell'
import { SymbolDisplay } from './SymbolDisplay'

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)
  let symbols = getCharSymbols(guess)
  symbols = symbols.filter((v, i) => symbols.indexOf(v) === i)

  return (
    <div className="flex justify-center mb-1">
      <Cell value={guess} status={statuses[0]} />
      {symbols.map((symbol, i) => (
        <SymbolDisplay key={i} symbol={symbol} />
      ))}
    </div>
  )
}
