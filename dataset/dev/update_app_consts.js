const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const { pathConsts, fileNames } = require('./consts')
const { assert } = require('console')

const minComponents = 3

// Generates the following runtime assets
// 1. list of answer characters (also the valid character guesses)
// 2. a mapping from characters to their component symbols
//   - A component symbol represents all the variants of a component
//     - For example, the symbol of ⾐ contains ⾐ and ⻂ (the form when it is a radical)
//   - This is an array of arrays
//     - The inner array is a set of valid component groups.
//     - The outer most array enumerates the collection of disassembles of each character.
//   - It is an array rather than dictionary to save spaces
// 3. a mapping from component symbol id to parts
// 4. a mapping from component symbol id to representative part id

let charToComponents, componentToSymbol
try {
  charToComponents = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FREQUENTLY_USED_PATH, fileNames.CHARACTER_TO_PARTS),
      'utf8'
    )
  )

  componentToSymbol = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FULL_DATASET_PATH, fileNames.PART_TO_SYMBOL),
      'utf8'
    )
  )
} catch (e) {
  console.log(e)
}

let validSolutions = 
  Object.keys(charToComponents)
  // Filtering out characters that have too few components. They are very hard to guess
  .filter(key => {
    let attempts = charToComponents[key]
    return attempts.length === 1 && attempts[0].length >= minComponents
  })

let validGuesses =
  Object.keys(charToComponents)
  // Filtering out characters that have too few components. They are very hard to guess
  .filter(key => {
    return !validSolutions.includes(key)
  })

let wordContent = `
export const WORDS: string[] = [
`

let solutionCharToSymbolContent = `
export const SOLUTION_CHAR_TO_SYMBOLS: number[][] = [
`

while (validSolutions.length !== 0) {
  let chars = validSolutions.splice(0, 10)

  wordContent += '  \'' + chars.join('\', \'') + '\''

  if (validSolutions.length !== 0)
    wordContent += ','

  wordContent += '\n'

  // eslint-disable-next-line no-loop-func
  chars.forEach(char => {
    let disassembleAttempts = charToComponents[char]

    assert(disassembleAttempts.length === 1)

    let symbols = disassembleAttempts[0].map(comp => componentToSymbol[comp])
    let line = `  [ ${symbols.join(', ')} ],\n`

    solutionCharToSymbolContent += line
    
  })
  
}

wordContent += ']'
solutionCharToSymbolContent += ']'

try {
  fs.writeFileSync(
    pathConsts.WORD_LIST_PATH,
    wordContent)
  fs.writeFileSync(
    pathConsts.CHARACTER_TO_SYMBOLS,
    solutionCharToSymbolContent)
  
} catch (e) {
  console.log(e)
}

// Updates the mapping from character to symbols
let guessContent = `
export const VALIDGUESSES: string[] = [
`

let validGuessCharToSymbolContent = `
export const VALIDGUESS_CHAR_TO_SYMBOLS: number[][] = [
`

while (validGuesses.length !== 0) {
  let chars = validGuesses.splice(0, 10)

  guessContent += '  \'' + chars.join('\', \'') + '\''

  if (validGuesses.length !== 0)
    guessContent += ','

  guessContent += '\n'

  // eslint-disable-next-line no-loop-func
  chars.forEach(char => {
    let disassembleAttempts = charToComponents[char]

    let symbols = disassembleAttempts[0].map(comp => componentToSymbol[comp])
    let line = `  [ ${symbols.join(', ')} ],\n`

    validGuessCharToSymbolContent += line
    
  })
  
}

guessContent += ']'
validGuessCharToSymbolContent += ']'

try {
  fs.writeFileSync(
    pathConsts.VALID_GUESS_PATH,
    guessContent)

  fs.appendFileSync(
    pathConsts.CHARACTER_TO_SYMBOLS,
    validGuessCharToSymbolContent)
} catch (e) {
  console.log(e)
}

// Updates the mapping from symbol to components

let partToSymbol
let symbolToRepresentative
try {
  partToSymbol = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FULL_DATASET_PATH, fileNames.PART_TO_SYMBOL),
      'utf8'
    )
  )

  symbolToRepresentative = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FULL_DATASET_PATH, fileNames.GROUP_TO_REPRESENTATIVE),
      'utf8'
    )
  )
} catch (e) {
  console.log(e)
}

const symbolToParts =
  Object.keys(partToSymbol)
  .reduce(
    (prev, current) => {
      let symbol = partToSymbol[current]
      
      if (symbol in prev) {
        prev[symbol].push(Number(current))
      }
      else {
        prev[symbol] = [Number(current)]
      }

      return prev
    },
    {}
  )

let symbolToPartsContent = `
export const SYMBOL_TO_PARTS: { [key: number]: number[] } = ${JSON.stringify(symbolToParts)}
`

let symbolToRepresentativeContent = `
export const SYMBOL_TO_REPRESENTATIVE: { [key: number]: number } = ${JSON.stringify(symbolToRepresentative)}
`

try {
  fs.writeFileSync(
    pathConsts.SYMBOL_TO_PARTS,
    symbolToPartsContent)

  fs.writeFileSync(
    pathConsts.SYMBOL_TO_REPRESENTATIVE,
    symbolToRepresentativeContent)
} catch (e) {
  console.log(e)
}
