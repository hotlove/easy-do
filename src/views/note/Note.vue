<template>
    <div style="float: left">
        <div class="note-home">
            <!-- todo导航 -->
            <div class="note-home-nav">
                <close-navigation :height="25"></close-navigation>
                <note-nav></note-nav>
            </div>

            <!-- todo内容列表 -->
            <div class="note-home-body">
                <close-navigation :height="25" :show-close="true"></close-navigation>
                <div class="note-home-body-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import NoteNav from '@/components/note/NoteNav.vue';

    @Component({
        components: {
            CloseNavigation,
            NoteNav,
        },
    })
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        // @Getter
        // public getToken !: string;
        //
        // @Action('setToken')
        // public setToken !: Function;

    }
</script>
<style lang="scss">
    .note-home {
        height: 100vh;
        width: 100%;

        .note-home-nav {
            position: relative;
            width: 210px;
            height: 100%;
            float: left;
            /*background: #ffffff;*/
            padding-top: 25px;
        }

        .note-home-body {
            position: relative;
            width: calc(100vw - 270px);
            height: 100%;
            float: right;
            background: #ffffff;
            padding: 25px 0 0 0;
            /*border-left: 1px solid #f2f6fc;*/

            .note-home-body-content {
                height: calc(100vh - 20px);
                /*padding: 0 5px;*/
                position: relative;
            }
        }
    }
</style>
