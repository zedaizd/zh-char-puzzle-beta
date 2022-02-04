import { SYMBOL_TO_REPRESENTATIVE } from '../../constants/symbolToRepresentative'
import { PartDisplay } from './PartDisplay'

type Props = {
  symbol: number
}

export const SymbolDisplay = ({ symbol }: Props) => {
  const representative = SYMBOL_TO_REPRESENTATIVE[symbol]
  // const parts = SYMBOL_TO_PARTS[symbol].filter(v => v !== representative)

  return (
    <div>
      <PartDisplay value={representative} />
      {/* {parts.length > 0
      ? (<div>
          <a></a> 
            {parts.map(p => <PartDisplay value={p} />)}
        </div>)
      : <div></div>} */}
    </div>
  )
}
