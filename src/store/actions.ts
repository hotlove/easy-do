import { State } from '@/types';
import { ActionContext } from 'vuex';
import * as types from './mutation-types';

interface ActionInter {
    [propName: string]: (context: ActionContext<State, any>, token: string) => void;
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
};

export {actions};
