export enum  SystemSettingProperty {
    id = 'id',
    code = 'code',
    opcity = 'opcity', // 透明度
    quitType = 'quitType',
    remeberQuit = 'remeberQuit',
}

export interface SystemSetting {
    [ SystemSettingProperty.id ]: number; // id
    [ SystemSettingProperty.code ]: string; // code
    [ SystemSettingProperty.opcity ]: number; // 透明度
    [ SystemSettingProperty.quitType ]: number; // 退出方式 1.最小化到系统托盘 2.直接退出
    [ SystemSettingProperty.remeberQuit ]: boolean; // 记住我的选择
}
