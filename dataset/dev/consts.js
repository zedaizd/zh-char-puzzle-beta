const path = require('path')

const folderNames = {
  DATASET: 'dataset',
  FULL: 'full',
  FREQUENTLY_USED: 'frequently-used-subset',

  SRC: 'src',
  CONSTS: 'constants'
}

const fileNames = {
  CHARACTER_TO_PARTS: 'char2components.yml',
  PART_TO_SYMBOL: 'component2group.yml',
  GROUP_TO_REPRESENTATIVE: 'group2representative.yml',
  CHARACTER_LIST: 'char-list.yml'
}

const pathConsts = {
  FULL_DATASET_PATH: path.resolve(folderNames.DATASET, folderNames.FULL),
  FREQUENTLY_USED_PATH: path.resolve(folderNames.DATASET, folderNames.FREQUENTLY_USED),

  WORD_LIST_PATH: path.resolve(folderNames.SRC, folderNames.CONSTS, 'wordlist.ts'),
  VALID_GUESS_PATH: path.resolve(folderNames.SRC, folderNames.CONSTS, 'validGuesses.ts'),
  CHARACTER_TO_SYMBOLS: path.resolve(folderNames.SRC, folderNames.CONSTS, 'charToGroups.ts'),
  SYMBOL_TO_PARTS: path.resolve(folderNames.SRC, folderNames.CONSTS, 'symbolToParts.ts'),
  SYMBOL_TO_REPRESENTATIVE: path.resolve(folderNames.SRC, folderNames.CONSTS, 'symbolToRepresentative.ts'),
}

module.exports.fileNames = fileNames
module.exports.pathConsts = pathConsts
