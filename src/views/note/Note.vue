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
    import {Getter, Action} from 'vuex-class';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import NoteNav from '@/components/note/NoteNav.vue';
    import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";
    import {noteFileMapper} from "@/dbutil";
    import {CommonUtil} from "@/common/CommonUtil";
    import {NoteFileProperty} from "@/domain/NoteFile";


    @Component({
        components: {
            CloseNavigation,
            NoteNav,
        },
    })
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter
        public getToken !: string;

        @Action('setToken')
        public setToken !: Function;

        private date: any = new Date(); // 导航日期变量

        private openDrawer: boolean = false; // 控制展示任务详情

        private taskCode: string = '0'; // 任务code

        private todoNav: string = '0';

        private treeDatas: any = [];

        public mounted(): void {
            console.log(this.$route)
            this.getAllFile();
        }

        public deleteData(noteFile: any) {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(NoteFileProperty.code, noteFile.code);

            noteFileMapper.delete(neDBExample).then((noteFileList: any) => {
                this.getAllFile()
            });
        }

        public getAllFile(): void {
            let neDBExample = new NeDBExample();

            noteFileMapper.find(neDBExample).then((noteFileList: any) => {
                if (CommonUtil.collectionNotEmpty(noteFileList)) {
                   this.treeDatas = noteFileList;
                }
            });
        }

        public choseNav(label: string): void {
            this.todoNav = label;
        }

        public choseTask(taskCode: string): void {
            this.taskCode = taskCode;
        }

        public taskDelete(): void {
            this.taskCode = '0';
        }
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
            background: #ffffff;
            padding-top: 25px;
        }

        .note-home-body {
            position: relative;
            width: calc(100vw - 270px);
            height: 100%;
            float: right;
            background: #fcfcfc;
            padding: 25px 0 0 0;
            border-left: 1px solid #f2f6fc;

            .note-home-body-content {
                height: calc(100vh - 20px);
                /*padding: 0 5px;*/
                position: relative;
            }
        }
    }
</style>
