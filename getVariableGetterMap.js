const astTypes = require('ast-types')
const { isNode, isVariable } = require('./utils')

function getVariableGetterMap(node, getterStr = 'path.node', cache = {}) {
  if (!isNode(node)) return cache
  if (isVariable(node)) {
    cache[node.name] = getterStr
    return cache
  }
  const fieldNames = astTypes.getFieldNames(node)
  fieldNames.forEach((name, i) => {
    const value = node[name]
    if (Array.isArray(value)) {
      value.forEach((node, i) => {
        getVariableGetterMap(node, `${getterStr}.${name}[${i}]`, cache)
      })
    } else {
      getVariableGetterMap(value, `${getterStr}.${name}`, cache)
    }
  })
  return cache
}

module.exports = getVariableGetterMap
