import State from "@/store/type";

const getters = {
    getToken: (state: State): string => {
        return state.token;
    }
};

export default getters;
