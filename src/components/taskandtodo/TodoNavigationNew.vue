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
                        <span class="nav-item" :class="(currentNavIndex == index) ? 'nav-item-focus' : ''" @click="choseCurrentItem(item, index)">
                            <i class="iconfont" :class="item.className"></i>{{ item.label }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- 任务列表 -->
            <div class="todo-home-nav-task">
                <div class="nav-todo-title">
                    <i class="iconfont icon-notebook"></i>
                    <span>我的任务</span>
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

        private showDelTaskDialog: boolean = false; // 控制展示任务删除对话框
        private deleteTaskCode: string = '0'; // 需要删除任务code

        private taskList: Task[] = []; // 任务列表

        public mounted(): void {
            this.getAllTask();
        }

        // 选择当前nav导航
        public choseCurrentItem(navItem: any, index: number): void {
            this.currentNavIndex = index;
            // this.$emit('chose-nav', navItem.label);
            console.log(navItem);
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

        }

        .nav-todo-item {
            margin-top: 15px;
            padding-left: 20px;

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
                    color: #2360cd;
                }
            }

            .nav-item-focus {
                color: #2360cd;
            }
        }

        .nav-todo {
            height: 120px;
        }

    }
</style>
