import path from 'node:path'
import { fileURLToPath } from 'node:url'
import remoteMain from '@electron/remote/main/index.js'
import { BrowserWindow } from 'electron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line node/prefer-global/process
const NODE_ENV = process.env.NODE_ENV

let aboutWindow

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 450,
    height: 350,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../../../dist/logo.png'),
    vibrancy: 'menu',
    titleBarStyle: 'hidden',
    maximizable: false,
    minimizable: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  aboutWindow.setAlwaysOnTop(true)
  if (NODE_ENV === 'development')
    aboutWindow.loadURL('http://localhost:3000/electronWindows/about/')
  else
    aboutWindow.loadFile(path.join(__dirname, '../../../dist/electronWindows/about/index.html'))

  remoteMain.enable(aboutWindow.webContents)
  return aboutWindow
}

export default createAboutWindow
