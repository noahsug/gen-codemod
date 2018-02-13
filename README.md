# gen-codemod
> Generate codemods by comparing your initial JavaScript to your desired JavaScript.

### Usage
`gen-codemod INITIAL.js DESIRED.js > my-transform.js`

`INITIAL.js` is a JavaScript file containing the initial, pre-codemod JavaScript that you'd like to change.

`DESIRED.js` is a JavaScript file containing the desired, post-codemod JavaScript that you'd like to have.

`gen-codemod` compares these two files and creates a codemod to get from `INITIAL.js` to `DESIRED.js`.

### Example

When upgrading from sinon.js v1 -> v2, every instance of `sinon.stub(obj, method, fn)` is changed to `sinon.stub(obj, method).andCallsFake(fn)`. We can generate this codemod as follows:

```sh
echo "sinon.stub(A, B, C)" > sinon-v1.js
echo "sinon.stub(A, B).andCallFake(C)" > sinon-v2.js
gen-codemod sinon-v1.js sinon-v2.js
```
**Note:** Single uppercase letters, such as `A`, `B`, `C`, etc, are used as variables and match anything.

This outputs:
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
          [getANode(path), getBNode(path)]
        ),
        j.identifier('andCallsFake'),
        false
      ),
      [getCNode(path)]
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

To run your codemod, use [jscodeshift](https://github.com/facebook/jscodeshift):

```sh
gen-codemod sinon-v1.js sinon-v2.js > my-transform.js
npx jscodeshift -t my-transform.js PATH_TO_TRANSFORM
```

### Install
`npm i -g gen-codemod`

### Limitations
Can't change multiple AST expressions at once (only reads the first AST node from the initial / desired JavaScript files).
