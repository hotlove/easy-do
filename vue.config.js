module.exports = {
    pluginOptions: {
        electronBuilder: {
            // chainWebpackMainProcess: config => {
            //     // Chain webpack config for electron main process only
            // },
            // chainWebpackRendererProcess: config => {
            //     // Chain webpack config for electron renderer process only
            //     // The following example will set IS_ELECTRON to true in your app
            //     config.plugin('define').tap(args => {
            //         args[0]['IS_ELECTRON'] = true;
            //         return args
            //     })
            // },
            mainProcessFile:  'src/background.ts',
            builderOptions: {
                "appId": "com.guo.app",
                "productName": "e-do",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2019",//版权信息
                "directories": {
                    "output": "./dist"//输出文件路径
                },
                "files": [
                    {
                        'filter': ['**/*']
                    }
                ],
                // "extraFiles": ['./extensions/'],
                "asar":  false,
                "win": {//win相关配置
                    "icon": "./static/e-do-blue.png",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./static/e-do-blue256.ico",// 安装图标
                    "uninstallerIcon": "./static/e-do16.ico",//卸载图标
                    "installerHeaderIcon": "./static/e-do16.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "e-do", // 图标名称
                },
            }
        }
    }
};
