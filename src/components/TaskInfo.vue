<template>
    <div>
        <transition appear :appear-active-class="direction">
            <div v-if="show" :style="widthAndHeight" class="task-info">
                测试的
            </div>
        </transition>
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
    }
</script>
<style lang="scss">
    .task-info {
        position: absolute;
    }
</style>