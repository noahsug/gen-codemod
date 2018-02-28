const recast = require('recast')

function prettify(src) {
  return recast.prettyPrint(recast.parse(src), { tabWidth: 2, quote: 'single' })
    .code
}

module.exports = prettify
