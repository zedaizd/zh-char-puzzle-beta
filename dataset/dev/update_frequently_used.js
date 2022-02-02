const yaml = require('js-yaml')
const path = require('path')
const fs = require('fs')
const { pathConsts, fileNames } = require('./consts')

// Get document, or throw exception on error
let frequentlyUsedChars, charToComponents
try {
  frequentlyUsedChars = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FREQUENTLY_USED_PATH,  fileNames.CHARACTER_LIST),
      'utf8'
    )
  )
  charToComponents = yaml.load(
    fs.readFileSync(
      path.resolve(pathConsts.FULL_DATASET_PATH, fileNames.CHARACTER_TO_COMPONENTS),
      'utf8'
    )
  )
} catch (e) {
  console.log(e)
}

const filteredCharToComponents = 
  Object.keys(charToComponents)
  .filter(key => frequentlyUsedChars.includes(key))
  .reduce((ret, key) => {
    ret[key] = charToComponents[key]
    return ret
  }, {})

try {
  fs.writeFileSync(
    path.resolve(pathConsts.FREQUENTLY_USED_PATH, fileNames.CHARACTER_TO_COMPONENTS),
    yaml.dump(filteredCharToComponents))
} catch (e) {
  console.log(e)
}
