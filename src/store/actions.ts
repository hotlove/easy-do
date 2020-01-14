import { ActionContext } from "vuex";
import { State } from "@/types";
import * as types from "./mutation-types";

export {
    [types.SET_TOKEN]: (context: ActionContext<State, any>, token: string): void => {
        context.commit(types.SET_TOKEN, token);
    };
}
