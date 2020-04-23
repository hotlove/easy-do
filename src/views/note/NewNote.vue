<template>
    <div class="note-create">
        <div class="markdown-container">
            <mavon-editor v-if="showMd"
                          v-model="noteFile.content"
                          :boxShadow="false"
                          :subfield="!showEdit"
                          :toolbars="toolbars"
                          @save="saveEdit"
                          defaultOpen="preview"
                          fontSize="14px"/>
        </div>
        <div class="markdown-nav">
            <span class="md-nav-item">
                <i class="iconfont icon-submit"></i>
                <span class="item-text" @click="saveEdit">保存</span>
            </span>
            <span class="md-nav-item">
                <i v-if="showEdit" class="iconfont icon-editor"></i>
                <span v-if="showEdit" class="item-text" @click="showEdit = false">编辑</span>

                <i v-if="!showEdit" class="iconfont icon-preview"></i>
                <span v-if="!showEdit" class="item-text" @click="showEdit = true">预览</span>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {NeDBExample} from "@/dbutil/nedbutil/NeDBExample";
    import {NoteFile, NoteFileProperty} from "@/domain/NoteFile";
    import {noteFileMapper} from "@/dbutil";
    import {CommonUtil} from "@/common/CommonUtil";
    import mdtools from "@/common/md-editor-config";

    @Component
    export default class NewNote extends Vue {

        // 编辑文件内容
        private noteFile !: NoteFile;

        // 文件code
        private fileCode: string = "";

        // 默认不编辑
        private showEdit: boolean = true;

        // 控制显示编辑器
        private showMd: boolean = false;

        private toolbars: any = mdtools;

        public mounted(): void {
            this.fileCode = this.$route.params.code;
            this.getFileContent();
        }

        // 获取文本内容
        public getFileContent(): void {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(NoteFileProperty.code, this.fileCode);

            noteFileMapper.find(neDBExample).then((noteFile: any) => {
                if (CommonUtil.collectionNotEmpty(noteFile)){
                    this.noteFile = noteFile[0];
                    this.showMd = true;
                }
            });
        }

        // 保存信息
        public saveEdit(): void {
            let example = new NeDBExample();
            example.createCriteria().eq(NoteFileProperty.code, this.noteFile.code);

            this.noteFile.updateDate = new Date();

            noteFileMapper.update(example, this.noteFile).then((number) => {
                console.log(number)
                // if (number > 1)
            })
        }
    }
</script>
<style lang="scss">
    .note-create {
        height: calc(100vh - 35px);

        .markdown-container {
            float: left;
            width: calc(100vw - 335px);
            height: 100%;

            .v-note-wrapper {
                height: 100%;
                border-radius: 0;
                border: none;

                .v-note-show {
                    font-size: 14px;
                }
                .v-show-content {
                    background-color: #ffffff !important;
                }
            }
        }

        .markdown-nav {
            width: 60px;
            float: right;
            height: 100%;
            background: #ffffff;
            text-align: center;
            padding-top: 15px;

            .md-nav-item {
                display: inline-block;
                width: 40px;
                height: 40px;
                /*background: #E8F0FF;*/
                line-height: 40px;
                text-align: center;

                .item-text {
                    display: none;
                }
                > i {
                    font-size: 26px;
                }

                &:hover {
                    background: #E8F0FF;
                    i {
                        display: none;
                        + span.item-text {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
</style>
