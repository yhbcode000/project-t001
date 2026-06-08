const automationCapabilities = () => ['screen capture', 'mouse move', 'mouse click', 'keyboard type']

const requestAutomation = (request) => ({
  accepted: true,
  request,
  status: 'desktop-adapter-placeholder'
})

module.exports = { automationCapabilities, requestAutomation }
