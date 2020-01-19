<template>
    <div>
        <!-- 添加 -->
        <mu-dialog title="" width="55%"
                   :overlay="false"
                   :overlay-close="false"
                   :esc-press-close="false"
                   :open.sync="show">
            <div class="add-task-content" style="font-size: 12px;">
                <el-row>
                    <mu-text-field v-model="task.title" placeholder="任务标题" full-width></mu-text-field>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <mu-popover cover :open.sync="showDate" :trigger="trigger">
                            <mu-date-picker landscape :date.sync="task.endDate"></mu-date-picker>
                        </mu-popover>
                        <i class="el-icon-date" ref="endDateBtn"></i>完成日期
                    </el-col>
                    <el-col :span="16"></el-col>
                </el-row>
                <el-row></el-row>
            </div>
            <div slot="actions" style="padding: 0 16px">
                <el-button size="mini" type="text" @click="cancelAddTask">取消</el-button>
                <el-button size="mini" type="text">确认</el-button>
            </div>
        </mu-dialog>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {Task} from '@/domain/Task';

    @Component
    export default class AddTask extends Vue {
        @Prop({ default: false })
        public show: boolean = false;

        public task: Task = {
            id: 0,
            code: '',
            title: '',
            content: '',
            endDate: new Date(),
            createdDate: new Date(),
        };

        public showDate: boolean = false;

        public trigger: any;

        public mounted(): void {

            this.$nextTick(() => {
                console.log(this.$refs['endDateBtn']);
            });

            // this.trigger = this.$refs.button.$el;
        }

        public cancelAddTask(): void {
            this.show = false;
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
    }
</style>