import { State } from '@/types';
import * as types from './mutation-types';
import {SystemSetting} from '@/domain/SystemSetting';

// mutations 服务于 actions action提交的是mutations
const mutations =  {
    // [方法名] （入参） {方法体}
    [types.SET_TOKEN](state: State, token: string): void {
        state.token = token;
    },
    [types.SET_SYSTEM_SETTING](state: State, systemSetting: SystemSetting): void {
        state.systemSetting = systemSetting;
    },
};
export {mutations};
