module.exports = {
    pluginOptions: {
        electronBuilder: {
            mainProcessFile:  'src/background.ts',
            builderOptions: {
                "appId": "com.guo.app",
                "productName": "edo",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2019",//版权信息
                "directories": {
                    // "app": "./dist_electron/bundled",
                    "output": "./dist"//输出文件路径
                },
                "files": [
                    // "**/*",
                    // "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
                    // "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
                    // "!**/node_modules/*.d.ts",
                    // "!**/node_modules/.bin",
                    // "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
                    // "!.editorconfig",
                    // "!**/._*",
                    // "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
                    // "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
                    // "!**/{appveyor.yml,.travis.yml,circle.yml}",
                    // "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json,.yarnclean}",
                    {
                        'filter': ['**/*']
                    }
                ],
                // "extraFiles": ['./extensions/'],
                "asar":  true, // 设置为 true 可以把自己的代码合并并加密
                "compression": "maximum", // 压缩级别，如果要打包成安装包的话建议设为 maximum 可以使安装包体积更小，当然打包时间会长一点点
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
                    ],
                    "legalTrademarks": "easy-do"
                },
                "linux": {
                    "icon": "./static/e-do-blue.png"
                },
                "nsis": {
                    "perMachine": true, // 安装的时候是否为所有用户安装
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./static/e-do-blue256.ico",// 安装图标
                    "uninstallerIcon": "./static/e-do16.ico",//卸载图标
                    "installerHeaderIcon": "./static/e-do16.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "edo", // 图标名称
                },
            }
        }
    }
};

// package.json remove
//    "postinstall": "electron-builder install-app-deps",
//    "postuninstall": "electron-builder install-app-deps"
