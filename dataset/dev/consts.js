const { constants } = require('crypto')
const path = require('path')

const folderNames = {
  DATASET: 'dataset',
  FULL: 'full',
  FREQUENTLY_USED: 'frequently-used-subset',

  SRC: 'src',
  CONSTS: 'constants'
}

const fileNames = {
  CHARACTER_TO_COMPONENTS: 'char2components.yml',
  COMPONENT_TO_COMPONENT_GROUP: 'component2group.yml',
  GROUP_TO_REPRESENTATIVE: 'group2representative.yml',
  CHARACTER_LIST: 'char-list.yml'
}

const pathConsts = {
  FULL_DATASET_PATH: path.resolve(folderNames.DATASET, folderNames.FULL),
  FREQUENTLY_USED_PATH: path.resolve(folderNames.DATASET, folderNames.FREQUENTLY_USED),

  WORD_LIST_PATH: path.resolve(folderNames.SRC, folderNames.CONSTS, 'wordlist.ts'),
  CHARACTER_TO_GROUPS: path.resolve(folderNames.SRC, folderNames.CONSTS, 'charToGroups.ts'),
}

module.exports.fileNames = fileNames
module.exports.pathConsts = pathConsts
