<template>
    <div style="float: left">
        <div class="todo-home">
            <!-- todo导航 -->
            <div class="todo-home-nav">
                <close-navigation :height="25"></close-navigation>
                <div class="todo-home-nav-content">
                    <!-- 导航搜索 -->
                    <div style="width: 100%; height: 30px; line-height: 30px;padding: 0 10px">
                        <el-row :gutter="10">
                            <el-col :span="20">
                                <el-input v-model="todoItemSearch" placeholder="搜索" size="mini" prefix-icon="el-icon-search"
                                              @focus="showRecentSearch">
                                    <i v-if="!showDatePicker" slot="suffix" class="el-icon-circle-close el-input__icon"
                                       style="cursor: pointer" @click="clearSearch">
                                    </i>
                                </el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button icon="el-icon-plus" circle size="mini" @click="showAddTask = true"></el-button>
                            </el-col>
                        </el-row>

                    </div>

                    <!-- 任务列表 -->
                    <div class="todo-home-nav-task">
                        <div v-for="(item) in taskList" class="task-item" :key="item._id">
                            <!-- 任务图片 -->
                            <span class="task-img">
                                <el-avatar shape="square" :size="45" fit="fill" :src="url"></el-avatar>
                            </span>
                            <!-- 任务内容 -->
                            <span class="task-content">
                                <!-- 标题 时间-->
                                <div class="task-detail-common">
                                    <span class="task-title">{{ item.title }}</span>
                                    <span v-if="item.level === 3" class="task-level task-level-color-emergent"></span>
                                    <span v-if="item.level === 2" class="task-level task-level-color-important"></span>
                                    <span v-if="item.level === 1" class="task-level"></span>
                                </div>

                                <!-- 日期 -->
                                <div class="task-detail-common">
                                    <span class="task-date" v-if="item.endDate !== null">结束日期：{{ $moment(item.endDate).format('YY/MM/DD  HH:hh') }}</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- todo内容列表 -->
            <div class="todo-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>
                <div class="todo-home-body-content" v-if="!openDrawer">
                    <!--内容标题 用于条件控制-->
                    <div class="todo-body-title">
                        <el-radio-group v-model="completedControl" size="mini">
                            <el-radio-button :label="false">Todo</el-radio-button>
                            <el-radio-button :label="true">Done</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="todo-body-content-list">
                        <div class="todo-uncompleted todo-container" v-if="!completedControl">
                            <!-- to-do未完成列表页 -->
                            <todo-list></todo-list>
                        </div>
                        <div class="todo-completed todo-container" v-if="completedControl">
                            <!-- 已完成列表页 -->
                        </div>
                    </div>

                    <span v-if="!openDrawer" class="todo-home-open-spin" @click="openDrawer = true">
                        <i class="el-icon-d-arrow-left"></i>
                    </span>
                </div>
                
                <task-info :show.sync="openDrawer"></task-info>
            </div>
        </div>

        <add-task :show.sync="showAddTask" @add-completed="addTaskCompleted"></add-task>    
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Getter, Action} from 'vuex-class';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import TodoList from '@/components/TodoList.vue';
    import AddTask from '@/components/AddTask.vue';
    import TaskInfo from '@/components/TaskInfo.vue';
    import { NeDBExample } from '../dbutil/nedbutil/NeDBExample';
    import { TaskProperty, Task } from '../domain/Task';
    import { taskMapper } from '../dbutil/TaskMapper';

    @Component({
        components: {
            CloseNavigation,
            TodoList,
            AddTask,
            TaskInfo,
        },
    })
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter
        public getToken !: string;

        @Action('setToken')
        public setToken !: Function;

        private showAddTask: boolean = false; // 控制显示添加任务对话框
        private url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
        private todoItemSearch: string = ''; // todoitem搜索关键字
        private date: any = new Date(); // 导航日期变量
        private showDatePicker: boolean = true; // 展示日历
        private completedControl: boolean = false; // 控制是否完成
        private openDrawer: boolean =  false;

        private taskList: Task[] = [];

        public mounted(): void {
            this.getAllTask();
        }
        // 获取所有的任务
        public getAllTask(): void {
            taskMapper.find().then((taskList: any) => {
                this.taskList = taskList.sort((a: Task, b: Task) => {
                    return (b.createdDate - a.createdDate);
                });
            });
        }

        // 展示最近修改东西
        public showRecentSearch(): void {
            // 1.停止展示日历切换最近修改面板
            this.showDatePicker = false;
        }

        // 清除搜索值
        public clearSearch(): void {
            this.showDatePicker = true;
        }

        public addTaskCompleted(): void {
            this.getAllTask();
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
            /*background: #fcfbfb;*/
            padding-top: 25px;

            .todo-home-nav-content {

                .el-input__inner {
                    border-radius: 0;
                }

                .el-button.is-circle {
                    border-radius: 0;
                }

                .el-button--mini, .el-button--small {
                    border-radius: 0;
                }

                .el-button {
                    border-radius: 0;
                }

                height: calc(100vh - 25px);

                .todo-home-nav-task {
                    overflow-y: auto;
                    height: calc(100vh - 63px);
                    margin-top: 15px;
                    padding-bottom: 8px;

                    .task-item {
                        /*float: left;*/
                        /*width: 100%;*/
                        height: 65px;
                        padding: 10px;

                        &:hover {
                            cursor: pointer;
                            background: #e5e5e6;
                        }

                        .task-img {
                            /*position: relative;*/
                            /*top: 50%;*/
                            /* transform: translateY(-50%);*/
                            float: left;
                            width: 45px;
                            height: 45px;
                            display: inline-block;

                            .el-avatar--square {
                                border-radius: 0;
                            }
                        }

                        .task-content {
                            float: left;
                            width: 180px;
                            height: 45px;
                            display: inline-block;

                            .task-detail-common {
                                float: left;
                                width: 100%;
                                height: 22.5px;
                                line-height: 22.5px;
                                padding-left: 10px;

                                .task-title {
                                    display: inline-block;
                                    float: left;
                                    font-size: 12px;
                                    overflow: hidden;/*超出部分隐藏*/
                                    white-space: nowrap;/*不换行*/
                                    text-overflow: ellipsis;/*超出部分文字以...显示*/
                                }

                                .task-level {
                                    float: right;
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 50px;
                                }

                                /* 紧急 */
                                .task-level-color-emergent {
                                    background: #ff5858;
                                }
                                /* 重要 */
                                .task-level-color-important {
                                    background: #ff9e2a;
                                }

                                .task-date {
                                    display: inline-block;
                                    float: left;
                                    font-size: 11px;
                                    color: #8c939d;
                                }
                            }
                        }
                    }
                }
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
            background: #fcfcfc;
            padding: 25px 0 0 0;

            .todo-home-open-spin {
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
