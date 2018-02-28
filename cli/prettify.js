const prettier = require('prettier')

function prettify(src) {
  return prettier.format(src, { singleQuote: true })
}

module.exports = prettify
