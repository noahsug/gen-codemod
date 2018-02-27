// const prettier = require('prettier')
const recast = require('recast')

function prettify(src) {
  // return prettier.format(src, { singleQuote: true })
  return recast.prettyPrint(recast.parse(src), { tabWidth: 2 }).code;
}

module.exports = prettify
