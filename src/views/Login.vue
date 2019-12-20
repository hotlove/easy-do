<template>

</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "vuex-class";
    import {RequestParams} from "@/types";
    import * as types from "@/store/mutation-types"

    @Component
    export default class Login extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter(types.GET_TOKEN) getToken !: string;
        @Action(types.SET_TOKEN) setToken !: Function;

        // 登陆方法
        private login(userName: string, password: string): void {
            let param: RequestParams = {
                password: password,
                userName: userName
            };

            this.$http.post("/test/login", param).then((response: Response) => {
                let token = "";
                this.setToken(token);
                this.$router.push("/home");
            })
        }
    }
</script>
<style lang="scss">

</style>
