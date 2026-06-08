const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { automationCapabilities, requestAutomation } = require('./automation')

const webUrl = process.env.WEB_URL || 'http://localhost:3000'

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    title: 'Hello Platform Desktop',
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') }
  })
  win.loadURL(webUrl)
}

ipcMain.handle('automation:capabilities', automationCapabilities)
ipcMain.handle('automation:request', (_event, request) => requestAutomation(request))

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
