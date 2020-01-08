<template>
    <div style="float: left">
        <div class="todo-home">
            <!-- todo导航 -->
            <div class="todo-home-nav">
                <close-navigation :height="25"></close-navigation>
                <div class="todo-home-nav-content">
                    <el-input v-model="todoItemSearch" placeholder="搜索" size="mini" prefix-icon="el-icon-search"
                              @focus="showRecentSearch">
                        <i v-if="!showDatePicker" slot="suffix" class="el-icon-circle-close el-input__icon"
                           style="cursor: pointer" @click="clearSearch">
                        </i>
                    </el-input>

                    <div v-if="!showDatePicker" style="margin-top: 10px">
                        <span class="recent-search">ceshide</span>
                    </div>

<!--                    <div style="margin-top: 10px">-->
<!--                        <mu-date-picker class="to-do-nav-picker" :date.sync="date"></mu-date-picker>-->
<!--                    </div>-->
                </div>

            </div>

            <!-- todo内容列表 -->
            <div class="todo-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>
                <div class="todo-home-body-content">
                    <!--内容标题 用于条件控制-->
                    <div class="todo-body-title">
                        <el-radio-group v-model="completedControl" size="mini">
                            <el-radio-button :label="false">Todo</el-radio-button>
                            <el-radio-button :label="true">Done</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="todo-body-content-list">
                        <div class="todo-uncompleted todo-container" v-if="!completedControl">
                            <todo-list></todo-list>
                        </div>
                        <div class="todo-completed todo-container" v-if="completedControl">

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter, Action} from "vuex-class";
    import CloseNavigation from "@/components/CloseNavigation.vue";
    import TodoList from "@/components/TodoList.vue";

    @Component({
        components: {
            CloseNavigation,
            TodoList
        }
    })
    export default class Home extends Vue {

        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter getToken !: string;
        @Action("setToken") setToken !: Function;

        todoItemSearch: string = ""; // todoitem搜索关键字
        date: any = new Date(); // 导航日期变量
        showDatePicker: boolean = true; // 展示日历
        completedControl: boolean = false; // 控制是否完成

        // 展示最近修改东西
        public showRecentSearch(): void {
            // 1.停止展示日历切换最近修改面板
            this.showDatePicker = false;
        }

        // 清除搜索值
        public clearSearch(): void {
            this.showDatePicker = true;
        }

    }
</script>
<style lang="scss">
    .todo-home {
        height: 100vh;
        width: 100%;

        .todo-home-nav {
            position: relative;
            width: 250px;
            height: 100%;
            float: left;
            background: #E6E5E5;
            /*background: #fffdff;*/
            padding: 25px 10px 0 10px;

            .todo-home-nav-content {
                height: calc(100vh - 25px);

            }

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
            width: calc(100vw - 310px);
            height: 100%;
            float: right;
            /*background: #F5F5F5;*/
            background: #f8f8f8;
            padding: 25px 0 0 0;

            .todo-home-body-content {
                height: calc(100vh - 20px);
                padding: 0px 10px;

                .todo-body-title {
                    height: 23px;
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
