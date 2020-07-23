<template>
    <div class="layout">
        <!-- 引入editor.md的样式，因为不是标准的vue组件，无法通过import引入样式 -->
        <link rel="stylesheet" href="/static/editor-md/css/editormd.css" />
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
            // width: "100%",
            // height: '450px',
            // path: "/editor-md/lib/",//lib的路径
            // codeFold: true,
            // saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            // emoji: true,
            // imageUpload: true,
            // imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            // imageUploadURL: "./php/upload.php"

            //width: "90%",
            //height: 740,
            path : "/static/editor-md/lib/",
            theme : "dark",
            previewTheme : "dark",
            editorTheme : "pastel-on-dark",
            // markdown : "fasfas",   //动态设置的markdown文本
            codeFold : true,
            //syncScrolling : false,
            saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
            searchReplace : true,
            //watch : false,                // 关闭实时预览
            htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            //toolbar  : false,             //关闭工具栏
            //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
            emoji : true,
            taskList : true,
            tocm            : true,         // Using [TOCM]
            tex : true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart : true,             // 开启流程图支持，默认关闭
            sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
            //dialogLockScreen : false,   // 设置弹出层对话框不锁屏，全局通用，默认为true
            //dialogShowMask : false,     // 设置弹出层对话框显示透明遮罩层，全局通用，默认为true
            //dialogDraggable : false,    // 设置弹出层对话框不可拖动，全局通用，默认为true
            //dialogMaskOpacity : 0.4,    // 设置透明遮罩层的透明度，全局通用，默认值为0.1
            //dialogMaskBgColor : "#000", // 设置透明遮罩层的背景颜色，全局通用，默认为#fff
            imageUpload : true,
            imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL : "./php/upload.php",
        };
        created() {

        }
        mounted() {
            let that = this;
            console.log(scriptjs)
            scriptjs(
                [
                    that.editorPath + '/jquery.min.js',//加载完jquery后再加载editormd
                    that.editorPath + '/zepto.min.js',//加载完jquery后再加载editormd
                    that.editorPath + '/marked.min.js',//加载完jquery后再加载editormd
                    that.editorPath + '/lib/codemirror/codemirror.min.js',//加载完jquery后再加载editormd
                    // that.editorPath + '/lib/require.js',//加载完jquery后再加载editormd
                    // that.editorPath + '/lib/jquery.flowchart.min.js',//加载完jquery后再加载editormd
                    // that.editorPath + '/lib/raphael.min.js',//加载完jquery后再加载editormd
                ],
                () => {
                    scriptjs(that.editorPath + '/lib/codemirror/modes.min.js', () => {
                        scriptjs(that.editorPath + '/lib/codemirror/addons.min.js', () => {
                            scriptjs(that.editorPath + '/editormd.js', () => {
                                this.initEditor();
                            });
                        });
                    });

                }
            );
        }

        initEditor() {
            // todo 暂未解决codemirror引入失败问题
            this.$nextTick(() => {
                let editorMD = (<any>window).editormd;
                this.instance = editorMD(this.id, this.defaultConfig);

                // this.$nextTick(() => {
                //     this.instance = editorMD(this.id, this.defaultConfig);
                // })

            });
            // let editorConfig = Object.assign({}, this.defaultConfig, this.config);

        }
    }
</script>
<style scoped>
    .layout {
        height: 100%;
    }
</style>
