import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import { SOLUTION_CHAR_TO_SYMBOLS } from '../constants/charToGroups'
import { VALIDGUESS_CHAR_TO_SYMBOLS } from '../constants/charToGroups'
import seedrandom from 'seedrandom'

type prng = ReturnType<typeof seedrandom>

const charToSymbols: { [key: string]: number[] } =
  WORDS.reduce<{ [key: string]: number[] }>(
    (prev, current, index) => {
      const symbols = SOLUTION_CHAR_TO_SYMBOLS[index]
      prev[current] = symbols

      return prev
    },
    {}
  )

VALIDGUESSES.forEach((c, i) => {

  const symbols = VALIDGUESS_CHAR_TO_SYMBOLS[i]

  charToSymbols[c] = symbols
})

const symbolToChars = new Map<number, string[]>()
Object.keys(charToSymbols)
.forEach(char => {

  let symbols = charToSymbols[char]

  symbols.forEach(s => {
    if (symbolToChars.has(s)) {
      symbolToChars.get(s)?.push(char)
    }
    else {
      symbolToChars.set(s, [char])
    }
  })
})

const getRandomRange = <T>(rng: prng, start: number, range: number) => {
  return Math.abs(rng.int32() % range) + start
}

const getRandomIndex = <T>(rng: prng, arr: T[]) => {
  return getRandomRange(rng, 0, arr.length)
}

const getRandomElement = <T>(rng: prng, arr: T[]) => {
  return arr[getRandomIndex(rng, arr)]
}

const getNeighborSymbols = (rng: prng, symbol: number) => {
  let neighborChars = symbolToChars.get(symbol)
  if (neighborChars === undefined) {
    return [] as number[]
  }

  return charToSymbols[getRandomElement(rng, neighborChars)]
}

const dedup = <T>(arr: T[]) => {
  return arr.filter((v, i) => arr.indexOf(v) === i)
}

const randomSort = <T>(rng: prng, arr: T[]) => {
  const swap = <T>(arr: T[], a: number, b: number) => {
    let tmp = arr[a]
    arr[a] = arr[b]
    arr[b] = tmp
  }

  let ret = arr.map(v => v)
  for (let i = 0; i < ret.length; i++) {
    swap(ret, i, getRandomRange(rng, i, ret.length - i))
  }

  return ret
}

const getPossibleSymbols = (rng: prng, solutionSymbols: number[]) => {
  let ret: number[] = []

  ret = ret.concat(solutionSymbols)

  let iteration = 0
  while (ret.length < solutionSymbols.length + 8 && iteration < 100) {
    let solutionSymbolIndex = iteration % solutionSymbols.length
    let possibleSymbols = getNeighborSymbols(rng, solutionSymbols[solutionSymbolIndex])
    ret = dedup(ret.concat(possibleSymbols))

    iteration++
  }

  return randomSort(rng, ret)
}

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

  const rng = seedrandom(index.toString() + 11)
  const solIndex = Math.abs(rng.int32())
  
  const solution = WORDS[solIndex % WORDS.length].toUpperCase()
  const solutionSymbols = getCharSymbols(solution)

  const possibleSymbols = getPossibleSymbols(rng, solutionSymbols)

  return {
    solution: solution,
    solutionIndex: solIndex,
    solutionSymbols: solutionSymbols,
    possibleSymbols: possibleSymbols,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, solutionSymbols, possibleSymbols, tomorrow } = getWordOfDay()
