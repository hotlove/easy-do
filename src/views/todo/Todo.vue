<template>
    <div style="float: left">
        <div class="todo-home">
            <!-- todo导航 -->
            <div class="todo-home-nav">
                <close-navigation :height="25"></close-navigation>
                <todo-navigation-new></todo-navigation-new>
            </div>

            <!-- todo内容列表 -->
            <div class="todo-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>
                <div class="todo-home-body-content">
                    <!-- to-do未完成列表页 -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import TaskInfo from '@/views/todo/TaskInfo.vue';
    import TodoNavigationNew from '@/components/taskandtodo/TodoNavigationNew.vue';


    @Component({
        components: {
            CloseNavigation,
            TaskInfo,
            TodoNavigationNew,
        },
    })
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        // @Getter
        // public getToken !: string;
        //
        // @Action('setToken')
        // public setToken !: Function;
    }
</script>
<style lang="scss">
    .todo-home {
        height: 100vh;
        width: 100%;

        .todo-home-nav {
            position: relative;
            width: 210px;
            height: 100%;
            float: left;
            /*background: #fcfbfb;*/
            padding-top: 25px;

            /*.to-do-nav-picker {*/
            /*    width: 230px;*/

            /*    .mu-day-button-bg {*/
            /*        top: 0;*/
            /*        left: 0;*/
            /*        width: 24px;*/
            /*        height: 24px;*/
            /*        margin: 4px 3px;*/
            /*    }*/

            /*    .mu-datepicker-year-container {*/
            /*        width: 230px;*/
            /*    }*/
            /*}*/
        }

        .todo-home-body {
            position: relative;
            width: calc(100vw - 270px);
            height: 100%;
            float: right;
            background: #ffffff;
            padding: 25px 0 0 0;

            .todo-home-open-spin {
                background: #fcfcfc;
                position: absolute;
                display: inline-block;
                right: 0;
                top: 50%; /*偏移*/
                transform: translateY(-50%);

                width:20px;
                height:35px;
                border-radius: 50px 0 0 50px;
                line-height:35px;
                text-align: center;

                // width: 30px;
                // height: 30px;
                // line-height: 29px;
                // border-radius: 50px;
                // text-align: left;
                cursor: pointer;
                box-shadow:0 3px 10px -2px rgba(0, 0, 0, .8);

                // & i {
                //     margin-left: 3px;
                // }
            }

            .todo-home-body-content {
                height: calc(100vh - 20px);
                padding: 0px 10px;
                position: relative;

                .todo-body-title {
                    height: 23px;

                    .el-radio-button__inner {
                        border-radius: 0;
                    }
                }

                .todo-body-content-list {
                    margin-top: 15px;
                    .todo-container {
                        height: calc(100vh - 65px);
                    }
                }
            }
        }
    }
</style>
