const config = require('./config')
const generateCodemod = require('../api')

if (config.inputSrc && config.outputSrc) {
  console.log(generateCodemod(config))
} else {
  console.log('Usage: gen-codemod INPUT.js OUTPUT.js')
}
