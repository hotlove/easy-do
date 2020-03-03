<template>
    <div style="float: left">
        <div class="sign-home">
            <!-- 日历+flag -->
            <div class="sign-home-nav">
                <close-navigation :height="25"></close-navigation>
                <div class="sign-home-body-content">
                    <!-- 签到日历 -->
                    <div class="sign-calendar">
                        <sign-info></sign-info>
                    </div>
                    <!-- flag容器 -->
                    <div class="sign-flag-container">
                        <div class="sign-flag-title">
                            <el-button type="text" icon="el-icon-plus">添加</el-button>
                        </div>
                        <div class="sign-flag-content"></div>
                    </div>
                </div>
            </div>

            <!-- 签到信息 -->
            <div class="sign-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>

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
            width: calc(100vw - 310px);
            height: 100%;
            float: left;
            padding-top: 25px;
            .sign-home-body-content {
                height: calc(100vh - 20px);
                position: relative;

                .sign-flag-container {
                    height: 190px;
                    width: 100%;
                    .sign-flag-title {
                        text-align: right;
                        padding-right: 10px;
                        border-bottom: 1px solid #EBEEF5;
                    }
                }

                .sign-calendar {
                    /*padding: 0 10px;*/
                }
            }
        }

        .sign-home-body {
            position: relative;
            width: 250px;
            height: 100%;
            float: right;
            background: #ffffff;
            padding: 25px 0 0 0;
        }
    }
</style>
