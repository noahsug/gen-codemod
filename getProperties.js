const astTypes = require('ast-types')
const { isVariable } = require('./utils')

function getProperties(node) {
  if (isVariable(node)) return {}

  const properties = {}
  const fieldNames = astTypes.getFieldNames(node)
  fieldNames.forEach(name => {
    const value = getPropertyValue(node[name])
    if (value === undefined || value === null) return
    properties[name] = getPropertyValue(node[name])
  })
  return properties
}

function getPropertyValue(value) {
  if (!value) {
    return value
  } else if (Array.isArray(value)) {
    return value.map(getPropertyValue)
  } else if (typeof value === 'object') {
    return getProperties(value)
  } else {
    return value
  }
}

module.exports = getProperties
