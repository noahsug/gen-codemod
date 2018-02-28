function trimNullOrUndefinedFromEnd(arr) {
  for (i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === undefined || arr[i] === null) continue
    return arr.slice(0, i + 1)
  }
  return []
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1)
}

// Coppied from https://github.com/benjamn/ast-types/blob/master/lib/types.js
function getNodeBuilderName(typeName) {
  return typeName.replace(/^[A-Z]+/, upperCasePrefix => {
    var len = upperCasePrefix.length
    switch (len) {
      case 0:
        return ''
      // If there's only one initial capital letter, just lower-case it.
      case 1:
        return upperCasePrefix.toLowerCase()
      default:
        // If there's more than one initial capital letter, lower-case
        // all but the last one, so that XMLDefaultDeclaration (for
        // example) becomes xmlDefaultDeclaration.
        return (
          upperCasePrefix.slice(0, len - 1).toLowerCase() +
          upperCasePrefix.charAt(len - 1)
        )
    }
  })
}

function isNode(node) {
  return node && typeof node === 'object'
}

function isVariable(node) {
  return node && node.name && node.name.match(/^[A-Z]$/)
}

function objToString(obj) {
  return JSON.stringify(obj).replace(/"(\w+)":/g, '$1:')
}

module.exports = {
  trimNullOrUndefinedFromEnd,
  capitalize,
  getNodeBuilderName,
  isNode,
  isVariable,
  objToString,
}
