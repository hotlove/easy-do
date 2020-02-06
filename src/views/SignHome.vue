<template>
    <div style="float: left">
        <div class="sign-home">
            <!-- todo导航 -->
            <div class="sign-home-nav">
                <close-navigation :height="25"></close-navigation>
            </div>

            <!-- sign内容列表 -->
            <div class="sign-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>
                <div class="sign-home-body-content">
                    <!-- to-do未完成列表页 -->
                    <sign-info></sign-info>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

    import {Vue, Component} from 'vue-property-decorator';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import SignInfo from '@/components/sign/SignInfo.vue';

    @Component({
        components: {
            CloseNavigation,
            SignInfo,
        }
    })
    export default class SignHome extends Vue {

    }
</script>
<style lang="scss">
    .sign-home {
        height: 100vh;
        width: 100%;

        .sign-home-nav {
            position: relative;
            width: 250px;
            height: 100%;
            float: left;
            padding-top: 25px;
        }

        .sign-home-body {
            position: relative;
            width: calc(100vw - 310px);
            height: 100%;
            float: right;
            background: #fcfcfc;
            padding: 25px 0 0 0;

            .sign-home-body-content {
                height: calc(100vh - 20px);
                padding: 0px 10px;
                position: relative;
            }
        }
    }
</style>