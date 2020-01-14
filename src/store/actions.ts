import { State } from '@/types';
import { ActionContext } from 'vuex';
import * as types from './mutation-types';

interface ActionInter {
    [propName: string]: (context: ActionContext<State, any>, token: string) => void;
}

let actions: ActionInter = {
    [types.SET_TOKEN]: (context: ActionContext<State, any>, token: string): void => {
        context.commit(types.SET_TOKEN, token);
    },
};

export {actions};
