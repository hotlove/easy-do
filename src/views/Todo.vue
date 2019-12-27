<template>
    <div style="float: left">
        <div class="todo-home">
            <div class="todo-home-nav">
                    <close-navigation :height="25"></close-navigation>


            </div>
            <div class="todo-home-body">
                    <close-navigation :height="25" :show-close="true"></close-navigation>

            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter, Action} from "vuex-class";
    import CloseNavigation from "@/components/CloseNavigation.vue";

    @Component({
        components:{
            CloseNavigation
        }
    })
    export default class Home extends Vue {

        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter getToken !: string;
        @Action("setToken") setToken !: Function;


    }
</script>
<style lang="scss">
    .todo-home {
        height: 100vh;
        width: 100%;

        .todo-home-nav {
            width: 250px;
            height: 100%;
            float: left;
            background: #E6E5E5;
            padding: 25px 0 0 0;
        }

        .todo-home-body {
            width: calc(100% - 250px);
            height: 100%;
            border: 1px solid red;
            float: right;
            background: #F5F5F5;
            padding: 25px 0 0 0;
        }
    }
</style>
