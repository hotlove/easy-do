import { ActionContext } from "vuex";
import State from "@/store/type";
import * as types from "./mutation-types";

export default {
    setToken: (context: ActionContext<State, any>, token: string): void => {
        context.commit(types.SET_TOKEN, token);
    }
}
