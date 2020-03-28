<template>
    <div>
        <div class="todo-home-nav-content">
            <!-- 导航搜索 -->
            <div class="nav-todo">
                <div class="nav-todo-title">
                    <i class="iconfont icon-todo1 nav-todo-icon"></i>
                    <span>待办</span>
                </div>
                <div class="nav-todo-item">
                    <div v-for="(item, index) in todoNavs">
                        <span class="nav-item" :class="(currentNavIndex == index) ? 'nav-item-focus' : ''" @click.prevent.stop="choseCurrentItem(item, index)">
                            <i class="iconfont" :class="item.className"></i>{{ item.label }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- 任务列表 -->
            <div class="todo-home-nav-task">
                <div class="nav-todo-title">
                    <el-row>
                        <el-col :span="12" style="text-align: left">
                            <i class="iconfont icon-task"></i>
                            <span>我的任务</span>
                        </el-col>
                        <el-col :span="12" style="text-align: right; padding-right: 5px">
                            <i class="iconfont icon-plus task-add-style" @click="showAddTask = true"></i>
                        </el-col>
                    </el-row>
                </div>
                <div class="nav-task-item" v-if="taskList.length > 0">
                    <div class="nav-item  nav-task" v-for="(task, index) in taskList"
                         :class="(taskIndex === index) ? 'current-task-color':''"
                         :key="task.code"
                         @click.prevent.stop="showTaskInfo(task, index)">
                        <div style="position: relative">
                            <i class="task-dot" :class="'task-level-' + task.level"></i>
                            <span style="padding-left: 15px; display: inline-block;">{{ task.title }}</span>
                        </div>
                        <div class="task-date" v-if="task.endDate != null">
                            完成日期：{{ $moment(task.endDate).format("YYYY/MM/DD") }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增任务 -->
        <add-task :show.sync="showAddTask" @add-completed="addTaskCompleted"></add-task>

    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AddTask from '@/components/taskandtodo/AddTask.vue';
    import {Task, TaskProperty} from '@/domain/Task';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';
    import {taskMapper} from '@/dbutil/TaskMapper';

    @Component({
        components: {
            AddTask,
        },
    })
    export default class TodoNavigationNew extends Vue {
        private todoNavs: any[] = [
            {
                label: 'Todo',
                className: 'icon-maxmum',
            },
            {
                label: 'Done',
                className: 'icon-todo-completed',
            },
        ];
        private currentNavIndex: number = 0; // 当前导航默认值
        private showAddTask: boolean = false; // 控制显示添加任务对话框

        private taskList: Task[] = []; // 任务列表
        private taskIndex: number = -1; // 当前任务索引

        public mounted(): void {
            this.getAllTask();

            // 导航监听任务删除
            this.taskDeleteMonitor();
        }

        public taskDeleteMonitor(): void {
            this.$bus.$on('delete-task', (taskCode: string) => {
                this.taskList = this.taskList.filter(e => e.code !== taskCode);
                if (this.taskList.length > 0) {
                    let code = this.taskList[0].code;
                    this.goFirstTaskInfo(code)
                } else {
                    this.$router.push('todo-list').catch((err: Error) => err);
                }
            })
        }

        // 选择当前nav导航
        public choseCurrentItem(navItem: any, index: number): void {
            this.currentNavIndex = index;
            this.taskIndex = -1;
            if (navItem.label === 'Todo') {
                this.$router.push('todo-list').catch((err: Error) => err);
            } else {
                this.$router.push('todo-done-list').catch((err: Error) => err);
            }
        }

        // 获取所有的任务
        public getAllTask(): void {
            taskMapper.find().then((taskList: any) => {
                this.taskList = taskList.sort((a: Task, b: Task) => {
                    return (b.createdDate - a.createdDate);
                });
            });
        }

        // 新增任务
        public addTaskCompleted(task: Task): void {
            this.getAllTask();
            this.goFirstTaskInfo(task.code)
        }

        public goFirstTaskInfo(code: string): void {
            this.currentNavIndex = -1;
            this.taskIndex = 0;
            this.$router.push({name: 'task-info', query:{code: code}}).catch((err: Error) => err);
        }

        // 点击任务
        public showTaskInfo(task: Task, index: number): void {
            this.currentNavIndex = -1;
            this.taskIndex = index;
            this.$router.push({name: 'task-info', query:{code: task.code}}).catch((err: Error) => err);
        }
    }
</script>
<style lang="scss">
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

        .nav-todo-title {
            background: #f1f1f1;
            height: 32px;
            line-height: 32px;

            i {
                font-size: 20px;
                vertical-align: middle;
            }

            span {
                font-size: 12px;
                font-weight: 600;
                margin-left: 3px;
            }

            .task-add-style {
                cursor: pointer;
            }

            .task-add-style:hover {
                color: #1c7fcd;
            }

        }

        .nav-todo-item {
            margin-top: 15px;
            padding-left: 10px;

            div {
                margin: 5px 0;

                i {
                    font-size: 20px;
                    vertical-align: middle;
                }
            }

            .nav-item {
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }

            .nav-item-focus {
                color: #409EFF;
            }
        }

        .nav-todo {
            height: 120px;
        }

        /**
          *任务样式
         */
        .nav-task-item {
            margin-top: 15px;
            div {
                i {
                    font-size: 20px;
                    vertical-align: middle;
                }
            }

            .current-task-color {
                color: #409EFF;
            }

            .nav-item {
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }

            .nav-item-focus {
                color: #409EFF;
            }
        }

        .nav-task {
            padding: 5px 0 5px 10px;
            /*padding-left: 10px;*/
            background: #eef1f3;
            margin-top: 10px;
        }

        .task-dot {
            position: absolute;
            top: 5px;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            display: inline-block;
            margin-right: 5px;
        }

        /*1.普通 2.重要 3.紧急*/
        .task-level-1 {
           background: #409EFF;
        }
        .task-level-2 {
           background: #ff9e2a;
        }.task-level-3 {
           background: #ff5858;
        }

        .task-date {
            margin-left: 15px !important;
            font-size: 12px;
            color: #b1bac7;
        }

    }
</style>
