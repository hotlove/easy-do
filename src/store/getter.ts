import { State } from "@/types";
import * as types from "@/store/mutation-types"

const getters = {
    [types.GET_TOKEN]: (state: State): string => {
        return state.token;
    }
};

export default getters;
