const j = require('jscodeshift')

function getRootNode(src) {
  const collection = j(src)
    .find(j.ExpressionStatement)
    .get()
  return collection.value.expression
}

module.exports = getRootNode
