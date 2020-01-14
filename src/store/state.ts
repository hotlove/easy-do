import {Profile, State} from '@/types';

// 登陆人员默认值
let defaultProfile: Profile = {
    userName: '',
    token: '',
};

let state: State = {
    token: '',
    profileInfo: defaultProfile,
};

export {state};
