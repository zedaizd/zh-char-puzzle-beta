const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const { pathConsts, fileNames } = require('./consts')

const minComponents = 3

// Generates the following runtime assets
// 1. list of answer characters (also the valid character guesses)
// 2. a mapping from characters to their component groups
//   - A component group is a symbol to represent all the variants of a component
//     - For example, the group of ⾐ contains ⾐ and ⻂ (the form when it is a radical)
//   - This is an array of arrays of arrays
//     - The inner most array is a set of valid component groups.
//     - The middle layer array enumerates possible disassemble attempts. Some character has more than one valid disassemble attempts.
//     - The outer most array enumerates the collection of disassembles of each character.
//   - It is an array rather than dictionary to save spaces
// 3. a mapping from component group id to component image ID

let charToComponents, componentToGroup
try {
  charToComponents = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FREQUENTLY_USED_PATH, fileNames.CHARACTER_TO_COMPONENTS),
      'utf8'
    )
  )

  componentToGroup = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FULL_DATASET_PATH, fileNames.COMPONENT_TO_COMPONENT_GROUP),
      'utf8'
    )
  )
} catch (e) {
  console.log(e)
}

let validChars = 
  Object.keys(charToComponents)
  // Filtering out characters that have too few components. They are very hard to guess
  .filter(key => charToComponents[key].some(attempts => attempts.length >= minComponents))

let wordContent = `
export const WORDS: string[] = [
`

let charToComponentGroupContent = `
export const CHAR_TO_COMPONENT_GROUP: number[][][] = [
`

while (validChars.length !== 0) {
  let chars = validChars.splice(0, 10)

  wordContent += '  \'' + chars.join('\', \'') + '\''

  if (validChars.length !== 0)
    wordContent += ','

  wordContent += '\n'

  // eslint-disable-next-line no-loop-func
  chars.forEach(char => {
    let disassembleAttempts = charToComponents[char]

    let line = '[ ';
    
    disassembleAttempts.forEach(attempt => {
      let groups = attempt.map(comp => componentToGroup[comp])
      line += `[ ${groups.join(', ')} ], `
    })

    line += '],\n'

    charToComponentGroupContent += line
    
  })
  
}

wordContent += ']'
charToComponentGroupContent += ']'

try {
  fs.writeFileSync(
    pathConsts.WORD_LIST_PATH,
    wordContent)
  fs.writeFileSync(
    pathConsts.CHARACTER_TO_GROUPS,
    charToComponentGroupContent)
  
} catch (e) {
  console.log(e)
}