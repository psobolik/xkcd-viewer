(() => {
  const electron = require('electron')
  const Menu = electron.Menu
  const app = electron.app

  const { version: appVersion, productName: appName } = require('../../package.json')

  const fileTemplate = {
    label: 'File',
    submenu: [{
      label: 'Exit',
      role: 'close'
    }]
  }
  const editTemplate = {
    label: 'Edit',
    submenu: [{
      label: (() => { return (process.platform === 'win32') ? 'View in Explorer' : (process.platform === 'darwin') ? 'View in Finder' : 'View' })(),
      click (menuItem, browserWindow) { browserWindow.webContents.send('view-selected') }
    }, {
      type: 'separator'
    }, {
      label: 'Copy Selected',
      click (menuItem, browserWindow) { browserWindow.webContents.send('copy-selected') }
    }, {
      label: 'Copy All',
      click (menuItem, browserWindow) { browserWindow.webContents.send('copy-all') }
    }]
  }
  const viewTemplate = {
    label: 'View',
    submenu: [{
      label: 'Toggle Full Screen',
      accelerator: (() => { return (process.platform === 'darwin') ? 'Ctrl+Command+F' : 'F11' })(),
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }]
  }
  const windowTemplate = {
    label: 'Window',
    role: 'window',
    submenu: [{
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    }, {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }, {
      type: 'separator'
    }, {
      label: 'Bring All to Front',
      role: 'front'
    }]
  }
  const helpTemplate = {
    label: 'Help',
    role: 'help',
    submenu: [{
      label: 'View License',
      click (menuItem, browserWindow) { browserWindow.webContents.send('show-license') }
    }]
  }

  const macTemplate = {
    label: appName,
    submenu: [{
      label: `About ${appName}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${appName}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click () { app.quit() }
    }]
  }

  let template = []

  switch (process.platform) {
    case 'darwin':
      template = Array.prototype.concat(macTemplate, editTemplate, viewTemplate, windowTemplate, helpTemplate)
      break
    default:
      helpTemplate.submenu.push({
        type: 'separator'
      }, {
        label: `Version ${appVersion}`,
        enabled: false
      }, {
        label: 'About',
        click (menuItem, browserWindow) { browserWindow.webContents.send('show-about') }
      })
      template = Array.prototype.concat(fileTemplate, editTemplate, viewTemplate, helpTemplate)
      break
  }

  module.exports = Menu.buildFromTemplate(template)
})()
