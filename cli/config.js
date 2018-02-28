const fs = require('fs')
const prettify = require('./prettify')

const jsFileIn = process.argv[2]
const jsFileOut = process.argv[3]

const inputSrc = fs.readFileSync(jsFileIn, 'utf8')
const outputSrc = fs.readFileSync(jsFileOut, 'utf8')

const config = {
  inputSrc,
  outputSrc,
  prettify,
}

module.exports = config
