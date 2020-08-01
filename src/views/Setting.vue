<template>
    <div class="setting-home">
        <close-navigation :height="25" :show-close="true"></close-navigation>
        <div class="setting-module">
            <el-row class="module-row">
                <el-col :span="3">
                    <span class="setting-module-item" style="text-align: right">不透明度：</span>
                </el-col>
                <el-col :span="21">
                    <span class="setting-module-item" style="padding: 0 400px 0 10px;">
                        <el-slider v-model="capcityValue" :min="50" @change="chanageOpacity"></el-slider>
                    </span>
                </el-col>
            </el-row>
            <el-row class="module-row">
                <el-col :span="3">
                    <span class="setting-module-item" style="text-align: right">宽高：</span>
                </el-col>
                <el-col :span="21">
                    <span class="setting-module-item">
                        <span style="display: inline-block; width: 80px;">
                            <el-input v-model="width" @change="changeWidth"></el-input>
                        </span>
                        X
                        <span style="display: inline-block; width: 80px;">
                            <el-input v-model="height" @change="changeHeight"></el-input>
                        </span>
                    </span>
                </el-col>
            </el-row>
            <el-row class="module-row">
                <el-col :span="4" style="height: 56px; line-height: 56px; text-align: right">
                    <el-button @click="resetSetting" size="small">重置设置</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { ipcRenderer, remote } from 'electron';
    import {APP_SET_OPACITY, APP_SET_WINDOW_SIZE, LOAD_SYSTEM_SETTING, WINDOW_RESIZE} from '@/common/EventType';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import {Action, Getter} from "vuex-class";
    import {GET_SYSTEM_SETTING, SET_SYSTEM_SETTING} from "@/store/mutation-types";
    import {SystemSetting, defaultSystemSetting, SystemSettingProperty} from "@/domain/SystemSetting";
    import {systemSettingMapper} from "@/dbutil";
    import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";
    import {CommonUtil} from "@/common/CommonUtil";

    @Component({
        components: {
            CloseNavigation,
        },
    })
    export default class Home extends Vue {
        // 透明度默认100
        public capcityValue: number = 100;

        public active: number = 0;

        public width: number = 1200;

        public height: number = 800;

        public settingCode: string = '0';

        @Getter(GET_SYSTEM_SETTING)
        public getSystemSetting !: SystemSetting;

        @Action(SET_SYSTEM_SETTING)
        public setSystemSetting !: Function;

        public mounted() {
            this.settingCode = this.getSystemSetting.code;
            this.width = this.getSystemSetting.width || 1200;
            this.height = this.getSystemSetting.height || 800;
            this.capcityValue = this.getSystemSetting.opcity || 100;
        }

        // 监听不透明度变化
        public chanageOpacity(opacity: number): void {
            ipcRenderer.send(APP_SET_OPACITY, opacity);

            let systemSetting = this.$_.cloneDeep(this.getSystemSetting);
            systemSetting.code = this.settingCode;
            systemSetting.opcity = opacity;

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(SystemSettingProperty.code, this.settingCode);
            systemSettingMapper.update(neDBExample, systemSetting);
            // 保存重置后设置到vuex
            this.setSystemSetting(systemSetting);
        }

        // 监听宽度变化
        public changeWidth(value: number) {
            ipcRenderer.send(APP_SET_WINDOW_SIZE, Number(value), Number(this.height));
            // 修改宽高到本地
            this.updateWidthAndHeightToLocal(value, this.height);
        }

        // 监听宽度变化
        public changeHeight(value: number) {
            ipcRenderer.send(APP_SET_WINDOW_SIZE, Number(this.width), Number(value));
            // 修改宽高到本地
            this.updateWidthAndHeightToLocal(this.width, value);
        }

        // 保存修改到本地
        public updateWidthAndHeightToLocal(width: number, height: number) {
            let systemSetting = this.$_.cloneDeep(this.getSystemSetting);
            systemSetting.code = this.settingCode;
            systemSetting.width = width;
            systemSetting.height = height;

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(SystemSettingProperty.code, this.settingCode);
            systemSettingMapper.update(neDBExample, systemSetting);
            // 保存重置后设置到vuex
            this.setSystemSetting(systemSetting);
        }
        // 重置
        public resetSetting(): void {
            // let neDBExample1 = new NeDBExample();
            // systemSettingMapper.delete(neDBExample1);

            let systemSetting = this.$_.cloneDeep(defaultSystemSetting);
            systemSetting.code = this.settingCode || CommonUtil.getUUID();

            // 修改前端数据库数据
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(SystemSettingProperty.code,  systemSetting.code);
            systemSettingMapper.update(neDBExample, systemSetting);

            this.settingCode = systemSetting.code;
            this.width = 1200;
            this.height = 800;
            this.capcityValue = 100;

            ipcRenderer.send(LOAD_SYSTEM_SETTING, systemSetting);

            // 保存重置后设置到vuex
            this.setSystemSetting(systemSetting);
        }
    }
</script>
<style lang="scss">
    .setting-home {
        position: relative;
        width: 100%;
        height: 100vh;
        padding: 25px 0;

        .setting-module {
            float: left;
            height: 100%;
            width: 100%;

            .setting-module-item {
                display: inline-block;
                height: 32px;
                width: 100%;
                line-height: 32px;
            }

            .module-row {
                margin: 10px 0;
            }
        }
    }
</style>
