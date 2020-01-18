import { State } from '@/types';
import { ActionContext } from 'vuex';
import * as types from './mutation-types';
import {SystemSetting} from '@/domain/SystemSetting';

interface ActionInter {
    [propName: string]: (context: ActionContext<State, any>, param: any) => void;
}

// let actions: ActionInter = {};
// for (let key in types) {
//     let methodKey: any = [types.key];
//     actions[methodKey] = (context: ActionContext<State, any>, token: string): void => {
//         context.commit(methodKey, token);
//     };
// }

let actions: ActionInter = {
    [types.SET_TOKEN]: (context: ActionContext<State, any>, token: string): void => {
        context.commit(types.SET_TOKEN, token);
    },
    [types.SET_SYSTEM_SETTING]: (context: ActionContext<State, any>, systemSetting: SystemSetting): void => {
        context.commit(types.SET_SYSTEM_SETTING, systemSetting);
    },
};

export {actions};
