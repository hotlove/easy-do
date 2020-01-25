<template>
    <div>
        <!-- 添加 -->
        <mu-dialog  width="55%"
                    :overlay="false"
                    :overlay-close="false"
                    :esc-press-close="false"
                    :open.sync="show">
            <div class="add-task-content" v-loading="loading" style="font-size: 12px;">
                <el-row>
                    <mu-text-field v-model="task.title" placeholder="输入任务标题" full-width></mu-text-field>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <mu-popover cover :open.sync="showDate" :trigger="trigger">
                            <mu-date-picker landscape
                                            @change="confirmChoseEndDate"></mu-date-picker>
                        </mu-popover>
                        <span id="endDateBtn" style="cursor: pointer;"  @click="showChoseEndDate">
                            <i class="el-icon-date"></i>&nbsp;&nbsp;
                            <span v-if="!showChoseDateValue">完成日期</span>
                            <span v-else>
                                {{ $moment(task.endDate).format('YYYY-MM-DD') }}
                                <i class="el-icon-circle-close" style="cursor: pointer" @click.stop.prevent="clearChosedDate"></i>
                            </span>
                        </span>
                    </el-col>
                    <el-col :span="16">
                        <el-radio-group v-model="task.level" fill="red">
                            <el-radio :label="1"><span class="level-font">正常</span></el-radio>
                            <el-radio :label="2" class="level-font-important"><span class="level-font level-font-important">重要</span></el-radio>
                            <el-radio :label="3" class="level-font-emergency"><span class="level-font level-font-emergency">紧急</span></el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="margin-top: 20px">
                    <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入任务描述"
                            maxlength="600"
                            show-word-limit
                            v-model="task.content">
                    </el-input>
                </el-row>
            </div>
            <div slot="actions" style="padding: 0 16px" v-if="!loading">
                <el-button size="mini" type="text" @click="cancelAddTask">取消</el-button>
                <el-button size="mini" type="text" @click="confirmAddTask">添加</el-button>
            </div>
        </mu-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';
    import {Task} from '@/domain/Task';
    import {CommonUtil} from "@/common/CommonUtil";
    import {taskMapper} from "@/dbutil/TaskMapper";

    @Component
    export default class AddTask extends Vue {
        @Prop({ default: false })
        public show: boolean = false;

        // @Ref('endDateBtn')
        // public readonly endDateBtnRef!: any;
        // 任务对象
        public task: Task = {
            id: 0,
            code: '',
            title: '',
            content: '',
            level: 1, // 1.普通 2.重要 3.紧急
            endDate: null,
            createdDate: null,
        };

        // 控制展示日期选择弹窗
        public showDate: boolean = true;

        // 控制popover
        public trigger: any = {};

        // 展示选择后的日期值
        public showChoseDateValue: boolean = false;

        // 添加任务时进度
        public loading: boolean = false;

        public mounted(): void {
            this.$nextTick(() => {
                let elem = document.getElementById('endDateBtn');
                this.trigger = elem;
            });
        }

        // 添加任务
        public confirmAddTask(): void {
            this.task.createdDate = new Date();
            this.task.code = CommonUtil.getUUID();

            this.loading = true;
            taskMapper.insert(this.task).then((result: any) => {
                if (result._id) {
                    this.$emit('update:show', false);
                    this.$emit('add-completed', (result as Task));
                } else {
                    // 添加失败

                }

                this.loading = false;
            }, (err) => {
                this.loading = false;
            });
        }

        // 界面操作----------------------------------------------------------
        // 选择任务结束日期
        public showChoseEndDate(): void {
            this.$nextTick(() => {
                let elem = document.getElementById('endDateBtn');
                this.trigger = elem;
            });
            this.showDate = true;
        }

        // 确认选择结束日期
        public confirmChoseEndDate(date: Date): void {
            setTimeout(
                () => {
                    this.showDate = false;
                },
                350,
            );
            this.task.endDate = date;
            this.showChoseDateValue = true;
        }

        // 清理选择的结束日期
        public clearChosedDate(): void {
            this.showChoseDateValue = false;
            this.task.endDate = null;
        }

        // 取消添加任务
        public cancelAddTask(): void {
            this.$emit('update:show', false);
        }
    }
</script>
<style lang="scss">
    .add-task-content {
        .mu-input {
            font-size: 14px;
            margin-bottom: 0;
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
</style>
