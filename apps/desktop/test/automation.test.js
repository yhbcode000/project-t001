const assert = require('node:assert/strict')
const test = require('node:test')

const { automationCapabilities, requestAutomation } = require('../src/automation')

test('desktop automation exposes screen, mouse, and keyboard capabilities', () => {
  assert.deepEqual(automationCapabilities(), ['screen capture', 'mouse move', 'mouse click', 'keyboard type'])
})

test('desktop automation requests return accepted placeholder payloads', () => {
  assert.deepEqual(requestAutomation({ command: 'screenshot', payload: { hello: true } }), {
    accepted: true,
    request: { command: 'screenshot', payload: { hello: true } },
    status: 'desktop-adapter-placeholder'
  })
})
