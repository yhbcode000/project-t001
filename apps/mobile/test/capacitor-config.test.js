const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const source = fs.readFileSync(path.join(__dirname, '..', 'capacitor.config.ts'), 'utf8')

test('Capacitor config declares mobile identity and web output', () => {
  assert.match(source, /appId:\s*'com\.hello\.platform\.mobile'/)
  assert.match(source, /appName:\s*'Hello Platform'/)
  assert.match(source, /webDir:\s*'\.\.\/web\/out'/)
})

test('Capacitor dev server points at local Next.js when enabled', () => {
  assert.match(source, /CAPACITOR_DEV/)
  assert.match(source, /http:\/\/localhost:3000/)
  assert.match(source, /cleartext:\s*true/)
})
