<template>
    <div class="setting-home">
        <close-navigation :height="25" :show-close="true"></close-navigation>
        <div class="setting-module setting-module-left">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { ipcRenderer, remote } from 'electron';
    import {APP_SET_OPACITY} from '@/common/EventType';
    import CloseNavigation from '@/components/CloseNavigation.vue';

    @Component({
        components: {
            CloseNavigation,
        },
    })
    export default class Home extends Vue {

        public capcityValue: number = 0;

        public active: number = 0;

        public settingNav: any[] = [
            { label: '透明度'},
            { label: '宽高比'},
            { label: '透明度'},
            { label: '透明度'},
            { label: '透明度'},
            { label: '透明度'},
        ];

        public mounted() {
            this.capcityValue = remote.getCurrentWindow().getOpacity();
        }

        public chanageOpacity(opacity: number): void {
            ipcRenderer.send(APP_SET_OPACITY, opacity);
        }
    }
</script>
<style lang="scss">
    .setting-home {
        position: relative;
        width: 100%;
        height: 100vh;
        padding: 25px 0;

        .setting-close-navigation {
            float: left;
            width: 100%;
            position: relative;
        }
        .setting-module {
            float: left;
            height: 100%;
        }
    }
</style>
