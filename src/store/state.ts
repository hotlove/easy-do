import {Profile, State} from '@/types';
import {SystemSetting} from '@/domain/SystemSetting';

// 登陆人员默认值
let defaultProfile: Profile = {
    userName: '',
    token: '',
};

let defaultSystemSetting: SystemSetting = {
    id: 0,
    code: '',
    opcity: 1,
    quitType: 1,
    remeberQuit: false,
};

let state: State = {
    token: '',
    profileInfo: defaultProfile,
    systemSetting: defaultSystemSetting,
};

export {state};
