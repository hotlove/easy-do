<template>
    <div>
        <el-slider v-model="capcityValue" :min="0" :max="1" :step="0.1" @change="chanageOpacity"></el-slider>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import { ipcRenderer } from 'electron';
    import {APP_MIN_EVENT, APP_SET_OPACITY} from "@/common/EventType";
    import {Getter, Action} from "vuex-class";

    @Component
    export default class Home extends Vue {

        capcityValue: number = 0;
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter getToken !: string;
        @Action("setToken") setToken !: Function;

        chanageOpacity(opacity: number):void {
            ipcRenderer.send(APP_SET_OPACITY, opacity);
        }

    }
</script>
<style lang="scss">

</style>
