# gen-codemod
> Generate codemods via initial -> desired JavaScript.

### Install
`npm i -g gen-codemod`

### Usage
```sh
echo "sinon.stub(A, B, C)" > initial.js
echo "sinon.stub(A, B).andCallFake(C)" > desired.js
gen-codemod initial.js desired.js
```
outputs:
```js
module.exports = function(file, api) {
  const j = api.jscodeshift;

  const rootProperties = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'sinon' },
      property: { type: 'Identifier', name: 'stub' },
      computed: false
    },
    arguments: [{}, {}, {}]
  };

  function getTransform(path) {
    return j.callExpression(
      j.memberExpression(
        j.callExpression(
          j.memberExpression(
            j.identifier('sinon'),
            j.identifier('stub'),
            false
          ),
          [j.identifier('A'), j.identifier('B')]
        ),
        j.identifier('andCallsFake'),
        false
      ),
      [j.identifier('C')]
    );
  }

  function getANode(path) {
    return path.node.arguments[0];
  }
  function getBNode(path) {
    return path.node.arguments[1];
  }
  function getCNode(path) {
    return path.node.arguments[2];
  }

  return j(file.source)
    .find(j.CallExpression, rootProperties)
    .replaceWith(getTransform)
    .toSource();
};
```

Variables are specified as single uppercase letters, such as `A`, `B`, `C`, etc

To save and run your codemod, use [jscodeshift](https://github.com/facebook/jscodeshift):
```
gen-codemod INITIAL.js DESIRED.js > my-transform.js
npx jscodeshift -t my-transform.js PATH_TO_TRANSFORM
```
