'use strict';

import {app, BrowserWindow, ipcMain, protocol, globalShortcut } from 'electron';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}]);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false,
        width: 825,
        height: 581,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.once('ready-to-show', () => {
        if (win != null) {
            win.show();
        }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) { win.webContents.openDevTools(); }
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }

    }
    globalShortcut.register('CommandOrControl+o', () => {
        console.log('CommandOrControl+o is pressed');
        if (win !== null) {

        }
    });
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}

// 进程通信
import {APP_CLOSE_EVENT, APP_MAX_EVENT, APP_MIN_EVENT, APP_SET_OPACITY, PUT_DATA_STORE} from '@/common/EventType';

// app 关闭时间
ipcMain.on(APP_CLOSE_EVENT, (event) => {
    if (win != null) {
        win.close();
    }
});

// 最小化
ipcMain.on(APP_MIN_EVENT, (event) => {
    if (win != null) {
        win.minimize();
    }
});

// 最大化
ipcMain.on(APP_MAX_EVENT, (event) => {
    if (win != null) {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    }
});

ipcMain.on(APP_SET_OPACITY, (event, opacity) => {
    if (win != null) {
        win.setOpacity(opacity);
    }
});

// 45 * 45   15 * 15

