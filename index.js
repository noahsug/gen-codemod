const config = require('./config')
const generateCodemod = require('./generateCodemod')

if (config.inputSrc && config.outputSrc) {
  console.log(generateCodemod(config))
} else {
  console.log('Usage: gen-codemod INPUT.js OUTPUT.js')
}
