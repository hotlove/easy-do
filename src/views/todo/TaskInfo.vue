<template>
    <div class="task-info-top">
        <div class="task-info">
            <el-row>
                <div style="font-size: 16px; padding-left: 15px;">
                    <el-row>
                        <el-col :span="22">{{ taskInfo.title }}</el-col>
                        <el-col :span="2" class="task-info-del">
                            <i class="el-icon-delete" @click="deleteTask"></i>
                        </el-col>
                    </el-row>
                </div>
                <el-divider></el-divider>
            </el-row>
            <el-row>
                <el-row style="padding-left: 15px;">
                    创建日期：{{ $moment(taskInfo.createdDate).format('YYYY-MM-DD HH:mm') }}
                </el-row>
                <el-row v-if="taskInfo.endDate !== null" class="task-info-item">
                    完成日期：{{ $moment(taskInfo.endDate).format('YYYY-MM-DD HH:mm') }}
                </el-row>
                <el-row class="task-info-item"> 
                    任务等级：
                    <span v-if="taskInfo.level === 3" >
                        <span class="task-level task-level-color-emergent"></span>
                        <span style="color: #ff5858;">紧急</span>
                    </span>
                    <span v-if="taskInfo.level === 2" >
                        <span class="task-level task-level-color-important"></span>
                        <span style="color: #ff9e2a;">重要</span>
                    </span>
                    <span v-if="taskInfo.level === 1" >
                        <span class="task-level"></span>正常
                    </span>
                </el-row>
                <el-row class="task-info-item">
                    任务详情：
                    <div v-html="taskInfo.content" style="margin-top: 6px;"></div>
                </el-row>
            </el-row>
        </div>

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
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import { taskMapper } from '@/dbutil/TaskMapper';
    import { NeDBExample } from '@/dbutil/nedbutil/NeDBExample';
    import { TaskProperty, Task } from '@/domain/Task';

    @Component
    export default class TaskInfo extends Vue {        

        public code: string | (string | null)[] = '0'; // 任务code

        private showDelTaskDialog: boolean = false; // 控制展示任务删除对话框

        public taskInfo: Task = { // 任务详情
            id: 0,
            code: '0',
            title: '',
            content: '',
            level: 1, // 1.普通 2.重要 3.紧急
            endDate: null,
            createdDate: null,
        };

        @Watch('$route')
        public routerMonitor() {
            console.log(this.$route)
            this.code = this.$route.query.code;
            this.getTaskInfo();
        }

        public mounted(): void {
            this.code = this.$route.query.code;
            this.getTaskInfo();
        }

        // 获取任务详细信息
        public getTaskInfo(): void {

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TaskProperty.code, this.code);

            taskMapper.find(neDBExample).then((taskList: any) => {
                if (taskList.length > 0) {
                    this.taskInfo = taskList[0];
                }
            });
        }

        // 弹出删除确确认框
        public deleteTask(): void {
            this.showDelTaskDialog = true;
        }

        // 确认删除任务
        public confirmDeleteTask(): void {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TaskProperty.code, this.code);
            taskMapper.delete(neDBExample).then( number => {
                if (number > 0) {
                    this.$bus.$emit('delete-task', this.code);
                    this.showDelTaskDialog = false;
                }
            });
        }
    }
</script>
<style lang="scss">
    .task-info-top {

        position: relative;
        width: 100%;
        height: 100%;

        .task-info {
            width: 100%;
            height: 100%;
            padding: 5px 10px;

            .task-info-del {
                text-align: right;
                padding-right: 20px;
                cursor: pointer;
                color: #409EFF;
            }

            .task-info-item {
                margin: 20px 0;
                padding-left: 15px;

                .task-level {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-radius: 50px;
                    vertical-align: text-bottom;
                }

                /* 紧急 */
                .task-level-color-emergent {
                    background: #ff5858;
                }
                /* 重要 */
                .task-level-color-important {
                    background: #ff9e2a;
                }
            }

            .el-divider--horizontal {
                margin: 12px 0;
            }

            .el-radio{
                margin-right: 15px;
                font-size: 12px;
            }

            .el-radio__label {
                font-size: 12px;
                padding-left: 5px;
            }

            .el-textarea__inner {
                border-radius: 0;
            }

            .level-font {
                font-size: 12px;
            }

            .level-font-important {
                color: #ff9e2a;
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #ffa63d;
                    background: #ffa63d;
                }
            }

            .level-font-emergency {
                color: #ff5858;
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #ff5858;
                    background: #ff5858;
                }
            }
        }

        .task-info-spin {
            background: #fcfcfc;
            position: absolute; 
            display: inline-block;
            left: 0;
            top: 50%; /*偏移*/
            transform: translateY(-50%);

            width:20px;
            height:35px;
            border-radius:0 50px 50px 0;
            line-height:35px;
            text-align: center;

            // width: 30px;
            // height: 30px;
            // line-height: 29px;
            // border-radius: 50px;
            // text-align: left;
            cursor: pointer;
            box-shadow:3px 0 10px -2px rgba(0, 0, 0, .5);
        }
    }
    
</style>