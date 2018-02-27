import './app.css'

import debounce from 'debounce'
import generateCodemod from '../api'

const nodes = {
  initial: document.querySelector('textarea.initial'),
  desired: document.querySelector('textarea.desired'),
  transform: document.querySelector('textarea.transform'),
}

nodes.initial.addEventListener('keydown', debounce(onInput))
nodes.desired.addEventListener('keydown', debounce(onInput))

function onInput() {
  if (!nodes.initial.value || !nodes.desired.value) return
  const config = {
    inputSrc: nodes.initial.value,
    outputSrc: nodes.desired.value,
  }
  const transform = generateCodemod(config)
  nodes.transform.value = transform
}
