'use strict'

const electron = require('electron')
const app = electron.app
const ipc = electron.ipcMain
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

// const appMenu = require('./menus/app.menu')

const path = require('path')
const url = require('url')

const debug = /--debug/.test(process.argv[2])

let mainWindow,
  aboutDialog,
  licenseDialog

function showMainWindow (debug) {
  mainWindow = createMainWindow()

  // Maybe open the DevTools.
  if (debug) {
    mainWindow.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
    // Also close the (modeless) dialogs
    if (aboutDialog) aboutDialog.close()
    if (licenseDialog) licenseDialog.close()
  })
  Menu.setApplicationMenu(null)
}

function createMainWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600, frame: 'hidden' })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  return mainWindow
}

function showAboutWindow () {
  aboutDialog = createDialog('/windows/about/about.html', 350, 200)
  if (debug) aboutDialog.webContents.openDevTools()
  aboutDialog.on('closed', () => { aboutDialog = null })
}
const showLicenseWindow = () => {
  licenseDialog = createDialog('/windows/license/license.html', 600, 450)
  licenseDialog.on('closed', () => { licenseDialog = null })
}
const createDialog = (filePath, width, height) => {
  // These are modeless dialogs
  let modalWindow = new BrowserWindow({ width, height, resizable: false, minimizable: false, maximizable: false, skipTaskbar: true, alwaysOnTop: true })
  modalWindow.setMenu(null)
  modalWindow.loadURL(path.join('file://', __dirname, filePath))
  return modalWindow
}

app.on('ready', () => showMainWindow(debug))

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    showMainWindow(debug)
  }
})

// IPC Handlers
ipc.on('show-about', showAboutWindow)
ipc.on('show-license', showLicenseWindow)
ipc.on('exit-app', () => { app.quit() })
