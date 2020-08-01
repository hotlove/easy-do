import {app, BrowserWindow, ipcMain} from 'electron';
// 进程通信
import {APP_CLOSE_EVENT, APP_MAX_EVENT, APP_MIN_EVENT, APP_SET_OPACITY, APP_SET_WINDOW_SIZE,LOAD_SYSTEM_SETTING} from '@/common/EventType';

interface Listener {
    listen(win: BrowserWindow): void;
}
class SystemListener implements Listener {
    public listen(win: BrowserWindow): void {
        // 加载系统文件
        ipcMain.on(LOAD_SYSTEM_SETTING, (event, systemSetting) => {
            if (win != null) {
                console.log(systemSetting);
                // win.setSize(w, h);
                let width = systemSetting.width;
                let height = systemSetting.height;

                let realOppcity = systemSetting.opcity / 100;
                let opcity = realOppcity == 0 ? 0.3 : realOppcity; // 透明度最低也是3

                // 设置宽高
                win.setSize(Number(width), Number(height));
                // 设置不透明度
                win.setOpacity(opcity);
            }
        });
        // app 关闭事件
        ipcMain.on(APP_CLOSE_EVENT, (event, args) => {
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

        // 修改透明度
        ipcMain.on(APP_SET_OPACITY, (event, opacity) => {
            if (win != null) {
                console.log(opacity);
                let realOppcity = opacity / 100;
                let opcityT = realOppcity == 0 ? 0.3 : realOppcity; // 透明度最低也是3
                console.log(opcityT);
                win.setOpacity(Number(opcityT));
            }
        });

        // 监控窗口大小
        ipcMain.on(APP_SET_WINDOW_SIZE, (event, w, h) => {
            if (win != null) {
                win.setSize(Number(w), Number(h))
                // let bounds = win.getBounds();
                // win.setBounds({ x: bounds.x, y: bounds.y, width: w, height: h })
            }
        });
    };
}
export default new SystemListener();
