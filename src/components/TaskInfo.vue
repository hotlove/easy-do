<template>
    <div class="task-info-top" v-if="show" >
        <div class="task-info">
            <el-row>
                <div style="font-size: 20px;">测试标题</div>
            </el-row>
            <el-row>

            </el-row>
        </div>
        <span class="task-info-spin" @click="closeTaskInfo">
            <i class="el-icon-d-arrow-right"></i>
        </span>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Ref, Vue} from 'vue-property-decorator';

    @Component
    export default class TaskInfo extends Vue {
        @Prop({default: false})
        public show: boolean = false;

        @Prop({default: '50px'})
        public width: string = '50px';

        @Prop({default: '50px'})
        public height: string = '50px';

        // 根据不同的条件呢获取不同的动画方向
        get direction() {
            return this.show ? 'animated fadeInRight' : 'animated fadeInLeft';
        }

        // 获取宽高样式
        get widthAndHeight() {
            // return 'width:' + this.width + ';height:' + this.height;
            return 'width: 100vw; height: 100vh; border: 1px soid red;';
        }

        public closeTaskInfo(): void {
            this.$emit('update:show', false);
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