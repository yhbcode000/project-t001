const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('helloDesktop', {
  platform: process.platform,
  automationCapabilities: () => ipcRenderer.invoke('automation:capabilities'),
  requestAutomation: (command, payload = {}) => ipcRenderer.invoke('automation:request', { command, payload })
})
