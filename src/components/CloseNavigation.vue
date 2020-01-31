<template>
    <div class="dragger-element" :style="heigthValue">
        <div class="dragger-element-no-drag"></div>
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

        <mu-dialog title="" width="280"
                   transition="fade"
                   :overlay="false"
                   :overlay-close="false"
                   :esc-press-close="false"
                   :open.sync="showQuitChose">
            <div style="font-size: 14px;">
                <div>
                    <el-radio v-model="quitChose" :label="1">最小化到系统托盘</el-radio>
                </div>
                <div style="margin-top: 10px">
                    <el-radio v-model="quitChose" :label="2">直接退出</el-radio>
                </div>
            </div>
            <div slot="actions" style="width: 100%; padding: 0 16px">
                <div style="display: inline-block; float: left; font-size: 12px; padding-top: 3px;">
                    <el-checkbox v-model="remeberChose" class="adjust-font-size">记住我的选择</el-checkbox>
                </div>
                <div style="display: inline-block; float: right">
                    <el-button size="mini" type="text" @click="showQuitChose = false">取消</el-button>
                    <el-button size="mini" type="text" @click="confirmQuitChose">确认</el-button>
                </div>

            </div>
        </mu-dialog>
    </div>
</template>
<script lang="ts">
    import { ipcRenderer } from 'electron';
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {APP_CLOSE_EVENT, APP_MAX_EVENT, APP_MIN_EVENT} from '@/common/EventType';
    import {systemSettingMapper} from '@/dbutil';
    import {SystemSetting, SystemSettingProperty} from '@/domain/SystemSetting';
    import {Action, Getter} from 'vuex-class';
    import {GET_SYSTEM_SETTING, SET_SYSTEM_SETTING} from '@/store/mutation-types';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';

    @Component
    export default class CloseNavigation extends Vue {
        // 设置高度
        @Prop({ default: 20 })
        public height !: number;

        // 是否展示关闭按钮
        @Prop( {default: false})
        public showClose !: boolean;

        @Prop({default: ''})
        public text !: string;

        @Prop({default: 16})
        public textSize !: number;

        @Getter(GET_SYSTEM_SETTING)
        public getSystemSetting !: SystemSetting;

        @Action(SET_SYSTEM_SETTING)
        public setSystemSetting !: Function;

        // 是否暂时关闭时询问对话框
        public showQuitChose: boolean = false;

        // model值 1最小化到系统托盘 2直接退出
        public quitChose: number = 1;

        // 记住我的选择
        public remeberChose: boolean = false;

        // 计算属性
        get heigthValue() {
            return {
                'height': this.height + 'px',
                'line-height': this.height + 'px',
            };
        }

        get textFontSize() {
            return {
                'font-size': this.textSize + 'px',
            };
        }

        public mounted() {
            if (this.showClose) {
                this.quitChose = this.getSystemSetting.quitType;
            }
        }

        // 关闭事件处理
        public closeHandle(eventType: string): void {
            if (eventType === 'close') {
                if (this.getSystemSetting.remeberQuit) {
                    this.showQuitChose = false;
                    // 增加延时是为了防止在次激活窗口时 dialog对话框再次显示出来 闪烁
                    setTimeout(
                        () => {
                            ipcRenderer.send(APP_CLOSE_EVENT, this.getSystemSetting.quitType);
                        },
                        130,
                    );
                } else {
                    this.showQuitChose = true;
                }
            }
            if (eventType === 'min') {
                ipcRenderer.send(APP_MIN_EVENT);
            }
            if (eventType === 'max') {
                ipcRenderer.send(APP_MAX_EVENT);
            }
        }

        // 确认退出
        public confirmQuitChose(): void {
            let sysncQuitType: boolean = (this.quitChose !== this.getSystemSetting.quitType);
            let sysncRember: boolean = (this.remeberChose !== this.getSystemSetting.remeberQuit);

            if (sysncQuitType || sysncRember) {
                // 说明有变需要尽心给修改
                let systemSetting = this.getSystemSetting;
                systemSetting.quitType = this.quitChose;
                systemSetting.remeberQuit = this.remeberChose;

                let neDBExample = new NeDBExample();
                neDBExample.createCriteria().eq(SystemSettingProperty.code, systemSetting.code);
                systemSettingMapper.update(neDBExample, systemSetting).then((result: any) => {
                    if (result > 0) {
                        this.setSystemSetting(systemSetting);
                        this.showQuitChose = false;
                        setTimeout(
                            () => {
                                ipcRenderer.send(APP_CLOSE_EVENT, this.getSystemSetting.quitType);
                            },
                            130,
                        );
                    }
                });
            } else {
                this.showQuitChose = false;
                setTimeout(
                    () => {
                        ipcRenderer.send(APP_CLOSE_EVENT, this.getSystemSetting.quitType);
                    },
                    130,
                );
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

        .dragger-element-no-drag {
            position: absolute;
            width: 100%;
            height: 3px;
            -webkit-app-region: no-drag;
        }

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

    .adjust-font-size {
        .el-checkbox__label {
            font-size: 12px !important;
        }
    }
</style>
