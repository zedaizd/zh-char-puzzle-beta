import { KeyValue } from '../../lib/keyboard'
import { getStatuses, CharStatus, getSymbolStatus } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { getCharSymbols, solutionSymbols } from '../../lib/words'
import { HintKey } from './HintKey'

type Props = {
  guesses: string[]
  solution: string
  possibleSymbols: number[]
}

export const HintPanel = ({ guesses, solution, possibleSymbols }: Props) => {
  let usedSymbols = guesses.reduce<number[]>(
    (prev, current) => {
      return prev.concat(getCharSymbols(current))
    },
    []
  )
  usedSymbols = usedSymbols.filter((v, i) => usedSymbols.indexOf(v) === i)

  const validSymbols = getCharSymbols(solution)

  const symbolStatuses = 
    possibleSymbols.map(s => getSymbolStatus(usedSymbols, validSymbols, s))

  const possibleSymbolIndexGroups: number[][] = []
  const groupSize = 6
  const groupNums = possibleSymbols.length / groupSize
  
  let index = 0
  for (let g = 0; g < groupNums; g++) {
    let row = [] as number[]
    for (let i = 0 ; i < groupSize; i++) {
      index = i + 6 * g

      if (index === possibleSymbols.length)
        break;

      row.push(index)
    }

    possibleSymbolIndexGroups.push(row)

    if (index === possibleSymbols.length)
      break;
  }

  return (
    <div>
      {possibleSymbolIndexGroups.map((v, i) => 
      <div key={i} className="flex justify-center mb-1">
        {v.map(index => <HintKey key={index} symbol={possibleSymbols[index]} status={symbolStatuses[index]}/>)}
      </div>)}
    </div>
  )
}
