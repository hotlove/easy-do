import * as types from '@/store/mutation-types';
import { State } from '@/types';

interface GettersInter {
    [propName: string]: (state: State) => string;
}

const getters: GettersInter = {
    [types.GET_TOKEN]: (state: State): string => {
        return state.token;
    },
};

export {getters};
