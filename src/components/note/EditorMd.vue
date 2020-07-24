<template>
    <div class="layout">
        <!-- 引入editor.md的样式，因为不是标准的vue组件，无法通过import引入样式 -->
        <link rel="stylesheet" href="editor-md/css/editormd.css" />
        <div :id="id"></div>
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import scriptjs from "scriptjs";
    //用于生成随机id，vue-cli自带

    @Component
    export default class Editormd extends Vue {
        // @Prop({ default: "editor-md" })
        public id: string = "123";

        // @Prop({ default: {} })
        // public config: any = {};

        public instance: any = null;
        public editorPath: any = "/editor-md";//editor.md的路径
        public defaultConfig: any =  {
            placeholder: "请输入内容",
            path : "/editor-md/lib/",
            theme : "white",
            previewTheme : "white",
            editorTheme : "pastel-on-dark",
            codeFold : true,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            toolbarIcons : () => {
                return ["undo", "redo", "|",
                    "bold", "hr", "|",
                    "preview", "watch", "|",
                    "fullscreen", "info", "testIcon", "testIcon2", "file", "faicon",
                    "||", "watch", "fullscreen", "preview", "testIcon"]
            },
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            previewCodeHighlight : true, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji : true,
            taskList : true,
            tocm : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : false,             // 开启流程图支持，默认关闭
            sequenceDiagram : false,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload : false,
            // imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            // imageUploadURL : "./php/upload.php",
        };
        created() {

        }
        mounted() {
            if (this.instance == null) {
                this.loadEditorAndInit();
                // this.$nextTick(() => {
                //     let editorMD = (<any>window).editormdx;
                //     console.log(editorMD)
                //     // let editorConfig = Object.assign({}, this.defaultConfig, this.config);
                //     // this.instance = editorMD(this.id, this.defaultConfig);
                // });
            }
        }
        loadEditorAndInit() {
            let that = this;
            scriptjs(
                [
                    that.editorPath + '/jquery.min.js',//加载完jquery后再加载editormd
                    that.editorPath + '/zepto.min.js',//加载完jquery后再加载editormd
                ],
                () => {
                    scriptjs(that.editorPath + '/editormd.min.js', () => {
                        this.initEditor();
                    });
                }
            );
        }

        initEditor() {
            // todo 暂未解决codemirror引入失败问题
            this.$nextTick(() => {
                let editorMD = (<any>window).editormd;
                // let editorConfig = Object.assign({}, this.defaultConfig, this.config);
                this.instance = editorMD(this.id, this.defaultConfig);
            });
        }
    }
</script>
<style scoped>
    .layout {
        height: 100%;
    }
</style>
