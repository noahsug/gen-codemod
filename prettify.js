const prettier = require('prettier')

function prettify(src) {
  console.log(src)
  return prettier.format(src, { singleQuote: true })
}

module.exports = prettify
