<template>
    <div style="float: left">
        <div class="todo-home">
            <div class="todo-home-nav">
                <close-navigation :height="25"></close-navigation>
                <div class="todo-home-nav-content">
                    <el-input v-model="todoItemSearch" placeholder="搜索" size="mini" prefix-icon="el-icon-search"
                              @focus="showRecentSearch">
                        <i v-if="!showDatePicker" slot="suffix" class="el-icon-circle-close el-input__icon" style="cursor: pointer" @click="clearSearch">
                        </i>
                    </el-input>

                    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                        <div style="margin-top: 10px" v-if="showDatePicker">
                            <mu-date-picker class="todo-nav-picker" :date.sync="date"></mu-date-picker>
                        </div>
                    </transition>

                    <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                        <div v-if="!showDatePicker" style="margin-top: 10px">
                            <span>ceshide</span>
                        </div>
                    </transition>

                </div>

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

        todoItemSearch: string = "";
        date: any = new Date();
        showDatePicker: boolean = true; // 展示日历

        // 展示最近修改东西
        private showRecentSearch(): void {
            // 1.停止展示日历切换最近修改面板
            this.showDatePicker = false;
        }

        private clearSearch(): void {
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

            .todo-nav-picker {
                width: 230px;

                .mu-day-button-bg {
                    top: 0;
                    left: 0;
                    width: 24px;
                    height: 24px;
                    margin: 4px 3px;
                }

                .mu-datepicker-year-container {
                    width: 230px;
                }
            }
        }

        .todo-home-body {
            position: relative;
            width: calc(100vw - 310px);
            height: 100%;
            border: 1px solid red;
            float: right;
            background: #F5F5F5;
            padding: 25px 0 0 0;
        }
    }
</style>
