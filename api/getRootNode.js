const j = require('jscodeshift')

function getRootNode(src) {
  const firstBlock = j(src).get().value.program.body[0]
  return firstBlock.expression || firstBlock
}

module.exports = getRootNode
