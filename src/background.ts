'use strict';

import {app, BrowserWindow, ipcMain, protocol, globalShortcut, Menu, Tray } from 'electron';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';

import path from 'path';

// 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
// 托盘对象
let appTray = null;


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

    let trayMenuTemplate = [
        // {
        //     label: 'todo',
        //     click: () => {}, // 打开相应页面
        // },
        // {
        //     label: '帮助',
        //     click: () => {},
        // },
        // {
        //     label: '关于',
        //     click: () => {},
        // },
        {
            label: '退出',
            click: () => {
                app.quit();
            },
        },
    ];

    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    if (isDevelopment) {
        // 系统托盘图标目录
        let trayIcon = path.join(__dirname, '/bundled'); // app是选取的目录
        appTray = new Tray(path.join(trayIcon, 'e-do16.ico')); // app.ico是app目录下的ico文件
    } else {
        // 系统托盘图标目录
        let trayIcon = path.join(__dirname, '/'); // app是选取的目录
        appTray = new Tray(path.join(trayIcon, 'e-do16.ico')); // app.ico是app目录下的ico文件
    }
    // 设置此托盘图标的悬停提示内容
    appTray.setToolTip('edo');

    // 设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    // 单击右下角小图标显示应用
    appTray.on('click', () => {
        if (win !== null) {
            win.show();
        }
    });


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

// 关闭到系统图标
function hideToTray(browserWindow: BrowserWindow) {

    if (browserWindow.isMinimized()) {
        browserWindow.setSkipTaskbar(true);
    } else {
        browserWindow.setSkipTaskbar(true);
        browserWindow.minimize();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
    }
    // 设定打开界面快捷键
    globalShortcut.register('CommandOrControl+o', () => {
        if (win !== null) {
            win.show();
        }
    });

    globalShortcut.register('CommandOrControl+m', () => {
        if (win !== null) {
            win.hide();
            // hideToTray(win);
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
import {APP_CLOSE_EVENT, APP_MAX_EVENT, APP_MIN_EVENT, APP_SET_OPACITY} from '@/common/EventType';

// app 关闭时间
ipcMain.on(APP_CLOSE_EVENT, (event, args) => {
    console.log(args);
    if (win != null) {
        if (args === 1) {
            // 最小化到系统托盘
            win.hide();
            // hideToTray(win);
        } else {
            // 直接退出
            app.quit();
        }
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

