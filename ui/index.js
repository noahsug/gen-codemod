const prettify = require('./prettify')

import debounce from 'debounce'
import generateCodemod from '../api'

let firstRun = true

const nodes = {
  initial: document.querySelector('textarea.initial'),
  desired: document.querySelector('textarea.desired'),
  transform: document.querySelector('textarea.transform'),
}

nodes.initial.value = `// Initial, pre-codemod, JavaScript goes here.
// Use single uppercase letters such as 'A', 'B', etc as variables.

sinon.stub(A, B, C);
`

nodes.desired.value = `// Desired, post-codemod, JavaScript goes here.

sinon.stub(A, B).andCallFake(C);
`

onInput()

nodes.initial.addEventListener('keydown', debounce(onInput))
nodes.desired.addEventListener('keydown', debounce(onInput))

function onInput() {
  if (!nodes.desired.value || !nodes.initial.value) {
    nodes.transform.value = ''
    return
  }

  const config = {
    inputSrc: nodes.initial.value,
    outputSrc: nodes.desired.value,
    prettify,
  }
  let transform
  try {
    transform = generateCodemod(config)
  } catch (e) {
    transform = e.message
  }

  if (firstRun) {
    nodes.transform.value = `// Generated codemod that creates your desired JS.
// Run using jscodeshift:  npx jscodeshift -t this-transform.js PROJECT_PATH

${transform}`
    firstRun = false
  } else {
    nodes.transform.value = transform
  }
}
