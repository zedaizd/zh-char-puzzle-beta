import { getGuessStatuses } from '../../lib/statuses'
import { getCharSymbols } from '../../lib/words'
import { Cell } from './Cell'
import { SymbolDisplay } from './SymbolDisplay'

type Props = {
  guess: string,
  validSymbols: number[]
}

export const CompletedRow = ({ guess, validSymbols }: Props) => {
  const statuses = getGuessStatuses(guess)
  const symbols = validSymbols.filter((v, i) => validSymbols.indexOf(v) === i)

  return (
    <div className="mb-1 items-center">
      <Cell value={guess} status={statuses[0]} />
      {symbols.map((symbol, i) => (
        <SymbolDisplay key={i} symbol={symbol} />
      ))}
    </div>
  )
}
