<template>
    <div class="todo-home">
        todo
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue} from "vue-property-decorator";
    import {Getter, Action} from "vuex-class";

    @Component
    export default class Home extends Vue {

        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter getToken !: string;
        @Action("setToken") setToken !: Function;


        // 声明钩子
        mounted() {
            this.storeToken();
        }

        // 声明狗子
        created() {

        }

        // 计算属性
        get computedMsg() {
            return "test";
        }

        private storeToken(): void {
            this.setToken("testtoken123");
        }
    }
</script>
<style lang="scss">
    .todo-home {
        height: 100%;
        width: 100%;
    }
</style>
