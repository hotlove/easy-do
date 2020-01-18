import * as types from '@/store/mutation-types';
import { State } from '@/types';
import {SystemSetting} from '@/domain/SystemSetting';

interface GettersInter {
    [propName: string]: (state: State) => any;
}

const getters: GettersInter = {
    [types.GET_TOKEN]: (state: State): string => {
        return state.token;
    },
    [types.GET_SYSTEM_SETTING]: (state: State): SystemSetting => {
        return state.systemSetting;
    },
};

export {getters};
