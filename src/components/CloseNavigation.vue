<template>
    <div class="dragger-element" :style="heigthValue">
        <div class="dragger-text" :style="textFontSize">
            {{ text }}
        </div>
        <div v-if="showClose" class="dragger-close">
            <span class="dragger-close-item" @click="closeHandle('min')">
                <i class="iconfont icon-minimum"></i>
            </span>
            <span class="dragger-close-item" @click="closeHandle('max')">
                <i class="iconfont icon-maxmum "></i>
            </span>
            <span class="dragger-close-item" @click="closeHandle('close')">
                <i class="iconfont icon-close "></i>
            </span>
        </div>
    </div>
</template>
<script lang="ts">
    import { ipcRenderer } from 'electron';
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {APP_CLOSE_EVENT, APP_MAX_EVENT, APP_MIN_EVENT} from "@/common/EventType";

    @Component
    export default class CloseNavigation extends Vue {
        // 设置高度
        @Prop({ default: 20 })
        height !: number;

        // 是否展示关闭按钮
        @Prop( {default: false})
        showClose !: boolean;

        @Prop({default: ""})
        text !: string;

        @Prop({default: 16})
        textSize !: number;

        // 计算属性
        get heigthValue() {
            return {
                'height': this.height + 'px',
                'line-height': this.height + 'px'
            }
        }

        get textFontSize() {
            return {
                'font-size': this.textSize + 'px'
            }
        }

        closeHandle(eventType: string):void {
            if (eventType == 'close') {
                ipcRenderer.send(APP_CLOSE_EVENT);
            }
            if (eventType == 'min') {
                ipcRenderer.send(APP_MIN_EVENT);
            }
            if (eventType == 'max') {
                ipcRenderer.send(APP_MAX_EVENT);
            }
        }
    }
</script>
<style lang="scss">
    .dragger-element {
        -webkit-app-region: drag;
        width: 100%;
        position: absolute;
        text-align: right;
        top: 0;
        background: transparent;

        .dragger-text {
            height: 100%;
            display: inline-block;
            float: left;
            margin-left: 10px;
        }
        .dragger-close {
            -webkit-app-region: no-drag;
            height: 100%;
            text-align: center;
            float: right;

            .dragger-close-item {
                height: 100%;
                width: 30px;
                text-align: center;
                display: inline-block;
            }

            .dragger-close-item:hover {
                background: #E3E3E3;
                cursor: pointer;
            }
            .dragger-close-item:last-child:hover {
                background: #F45454;
            }
        }
    }
</style>
