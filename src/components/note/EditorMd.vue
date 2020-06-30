<template>
    <div class="layout">
        <!-- 引入editor.md的样式，因为不是标准的vue组件，无法通过import引入样式 -->
        <link rel="stylesheet" href="/src/assets/editor-md/css/editormd.css" />
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
        public id: string = "editor-md";

        // @Prop({ default: {} })
        // public config: any = {};

        public instance: any = null;
        public editorPath: any = "/editor-md";//editor.md的路径
        public defaultConfig: any =  {
            width: "100%",
            height: '450px',
            path: "/editor-md/lib/",//lib的路径
            codeFold: true,
            saveHTMLToTextarea: true, // 保存 HTML 到 Textarea
            emoji: true,
            imageUpload: true,
            imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
            imageUploadURL: "./php/upload.php"
        };

        mounted() {
            let that = this;
            console.log(scriptjs)
            // Promise.all([
            //     scriptjs('jquery.min.js'),
            //     scriptjs('editormd.min.js')
            // ]).then(() => {
            //         // do your logic.
            //         // 实例化，绑定事件等操作
            //     })
            scriptjs(
                [
                    that.editorPath + '/lib/jquery.min.js',//加载完jquery后再加载editormd
                ],
                () => {
                    scriptjs(that.editorPath + '/editormd.min.js', () => {
                        this.initEditor();
                    });
                }
            );
        }

        initEditor() {
            // let editorConfig = Object.assign({}, this.defaultConfig, this.config);
            this.$nextTick((editorMD = (<any>window).editormd) => {
                console.log(editorMD)
                if (editorMD) {
                    // Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
                    // 所以，只能在 nextTick 里面初始化 editor.md
                    // 将editor.md的实例通过data的instance暴露给父组件
                    this.instance = editorMD(this.id, this.defaultConfig);
                }
            });
        }
    }
</script>
<style scoped>
    .layout {
        height: 100%;
    }
</style>
