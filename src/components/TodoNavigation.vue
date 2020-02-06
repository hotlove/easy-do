<template>
    <div>
        <div class="todo-home-nav-content">
            <!-- 导航搜索 -->
            <div style="width: 100%; height: 30px; line-height: 30px;padding: 0 10px">
                <el-row :gutter="10">
                    <el-col :span="20">
                        <el-input v-model="todoItemSearch"
                                  placeholder="搜索" size="mini"
                                  prefix-icon="el-icon-search"
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
                <div v-for="(item, index) in taskList" class="task-item"
                     :class="(index === currentTaskIndex) ? 'current-chose-task' : 'task-item-hover'"
                     :key="item._id" @click="choseTask(item, index)">
                    <!-- 任务图片 -->
                    <span class="task-img">
                        <el-avatar shape="square" :size="45" fit="fill" :src="url"></el-avatar>
                    </span>
                    <!-- 任务内容 -->
                    <span class="task-content">
                    <!-- 标题 时间-->
                    <div class="task-detail-common">
                        <el-row>
                            <el-col :span="21" class="task-title-container">
                                <span class="task-title">{{ item.title }}</span>
                            </el-col>
                            <el-col :span="3" class="task-title-right">
                                <span v-if="item.level === 3" class="task-level task-level-color-emergent"></span>
                                <span v-if="item.level === 2" class="task-level task-level-color-important"></span>
                                <span v-if="item.level === 1" class="task-level"></span>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 日期 -->
                    <div class="task-detail-common">
                        <el-row>
                            <el-col :span="21" class="task-title-container">
                                <span class="task-date" v-if="item.endDate !== null">
                                    结束日期：{{ $moment(item.endDate).format('YY/MM/DD  HH:hh') }}
                                </span>
                            </el-col>
                            <el-col :span="3" class="task-title-right">
                                <span class="task-delete el-icon-delete" @click.stop.prevent="deleteTask(item)"></span>
                            </el-col>
                        </el-row>
                    </div>
                </span>
                </div>
            </div>
        </div>

        <!-- 新增任务 -->
        <add-task :show.sync="showAddTask" @add-completed="addTaskCompleted"></add-task>

        <!-- 删除任务确认框 -->
        <mu-dialog width="40%" max-width="80%"
                   transition="fade"
                   :esc-press-close="false"
                   :overlay-close="false"
                   :overlay="false"
                   :open.sync="showDelTaskDialog">
            <div slot="title" style="font-size: 18px;">删除任务</div>
            是否要删除该任务？
            <div slot="actions" style="padding: 0 16px" >
                <el-button size="mini" type="text" @click="showDelTaskDialog = false">取消</el-button>
                <el-button size="mini" type="text" @click="confirmDeleteTask">确认</el-button>
            </div>
        </mu-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AddTask from '@/components/AddTask.vue';
    import {Task, TaskProperty} from '@/domain/Task';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';
    import {taskMapper} from '@/dbutil/TaskMapper';

    @Component({
        components: {
            AddTask,
        },
    })
    export default class TodoNavigation extends Vue {
        private showAddTask: boolean = false; // 控制显示添加任务对话框
        private currentTaskIndex: number = -1; // 默认选择的任务索引
        private showDelTaskDialog: boolean = false; // 控制展示任务删除对话框
        private deleteTaskCode: string = '0'; // 需要删除任务code
        private todoItemSearch: string = ''; // todoitem搜索关键字
        private showDatePicker: boolean = true; // 展示日历
        private taskList: Task[] = []; // 任务列表
        // 默认项目头像
        private url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';

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

        // 选择任务
        public choseTask(taskInfo: Task, index: number): void {
            this.currentTaskIndex = index;
            this.$emit('chose-task', taskInfo.code);
        }

        // 弹出删除确确认框
        public deleteTask(taskInfo: Task): void {
            this.deleteTaskCode = taskInfo.code;
            this.showDelTaskDialog = true;
        }

        // 确认删除任务
        public confirmDeleteTask(): void {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TaskProperty.code, this.deleteTaskCode);
            taskMapper.delete(neDBExample).then( number => {
                if (number > 0) {
                    this.getAllTask();
                    this.showDelTaskDialog = false;
                    this.$emit('task-delete');
                }
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

            .current-chose-task {
                background: #d4d3d3;
            }
            .task-item-hover:hover {
                cursor: pointer;
                background: #e5e5e6;
            }
            .task-item {
                /*float: left;*/
                /*width: 100%;*/
                height: 65px;
                padding: 10px;

                &:hover {
                    // cursor: pointer;
                    // background: #e5e5e6;


                    .task-delete {
                        cursor: pointer;
                        display: inline-block !important;
                    }
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

                        .task-title-container {
                            text-align: left;
                            height: 22.5px;

                            .task-title {
                                width: 100%;
                                display: inline-block;
                                font-size: 12px;
                                overflow: hidden;/*超出部分隐藏*/
                                white-space: nowrap;/*不换行*/
                                text-overflow: ellipsis;/*超出部分文字以...显示*/
                            }
                        }



                        .task-title-right {
                            text-align: right;
                            height: 22.5px;

                            .task-level {
                                display: inline-block;
                                width: 13px;
                                height: 13px;
                                border-radius: 50px;
                            }
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
                            font-size: 11px;
                            color: #8c939d;
                        }

                        .task-delete {
                            display: none;
                            line-height: 22.5px;
                        }
                    }
                }
            }
        }
    }
</style>