const astTypes = require('ast-types')
const { getNodeBuilderName, trimNullOrUndefinedFromEnd } = require('./utils')

function getTransform(node, varCache = {}) {
  if (varCache[node.name]) {
    return `get${capitalize(node.name)}Node(path)`
  }

  const builderName = getNodeBuilderName(node.type)
  const args = []
  const fieldNames = astTypes.getFieldNames(node).slice(1)
  fieldNames.forEach(name => {
    args.push(getTransformValue(node[name]))
  })
  const argStr = trimNullOrUndefinedFromEnd(args).join(', ')
  return `j.${builderName}(${argStr})`
}

function getTransformValue(value) {
  if (!value) {
    return value
  } else if (Array.isArray(value)) {
    const values = value.map(getTransformValue)
    const trimmedValues = trimNullOrUndefinedFromEnd(values)
    return `[${trimmedValues.join(', ')}]`
  } else if (typeof value === 'object') {
    return getTransform(value)
  } else if (typeof value === 'string') {
    return `'${value}'`
  } else {
    return value
  }
}

module.exports = getTransform
