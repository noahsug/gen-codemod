const config = require('./config')
const getRootNode = require('./getRootNode')
const getVariableGetterMap = require('./getVariableGetterMap')
const getProperties = require('./getProperties')
const getTransform = require('./getTransform')
const prettify = require('./prettify')
const { capitalize } = require('./utils')

function generateCodemod(config) {
  const rootNodeIn = getRootNode(config.inputSrc)
  const rootNodeOut = getRootNode(config.outputSrc)
  const variableGetterMap = getVariableGetterMap(rootNodeIn)

  const src = `
  module.exports = function(file, api) {
    const j = api.jscodeshift

    const rootProperties = ${JSON.stringify(getProperties(rootNodeIn))}

    function getTransform(path) {
      return ${getTransform(rootNodeOut, variableGetterMap)}
    }

    ${mapEachVariable(variableGetterMap, (getterFn, name) => {
      return `
    function get${capitalize(name)}Node(path) {
      return ${getterFn}
    }`
    })}

    return j(file.source)
      .find(j.${rootNodeIn.type}, rootProperties)
      .replaceWith(getTransform)
      .toSource()
  }
  `

  return prettify(src)
}

function mapEachVariable(variableGetterMap, fn) {
  return Object.keys(variableGetterMap)
    .map(name => {
      const getterFn = variableGetterMap[name]
      return fn(getterFn, name)
    })
    .join('')
}

module.exports = generateCodemod
