module.exports = {
    pages: {

    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile:  'src/main/main.js',
            mainProcessWatch: ['src/main'],
            mainProcessArgs: [],
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
                "extraFiles": ['./extensions/'],
                "asar":  false,
                "win": {//win相关配置
                    "icon": "./src/assets/icon/e-do256.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                "ia32"//32位
                            ]
                        }
                    ]
                }
            }
        }
    }
};
