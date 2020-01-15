import {remote} from "electron";
<template>
    <div>
        <el-slider v-model="capcityValue" :min="0" :max="1" :step="0.1" @change="chanageOpacity"></el-slider>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { ipcRenderer, remote } from 'electron';
    import {APP_SET_OPACITY} from '@/common/EventType';

    @Component
    export default class Home extends Vue {

        public capcityValue: number = 0;

        public mounted() {
            this.capcityValue = remote.getCurrentWindow().getOpacity();
        }

        public chanageOpacity(opacity: number): void {
            ipcRenderer.send(APP_SET_OPACITY, opacity);
        }
    }
</script>
<style lang="scss">

</style>
