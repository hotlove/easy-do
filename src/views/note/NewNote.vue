<template>
    <div class="note-create">
        <div class="markdown-container">
            <mavon-editor v-model="fileContent" :boxShadow="false" :subfield="true"/>
        </div>
        <div class="markdown-nav">

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class NewNote extends Vue {

        // 编辑文件内容
        private fileContent: string = "";

        public mounted(): void {
        }
    }
</script>
<style lang="scss">
    .note-create {
        .markdown-nav {
            width: 60px;
            border: 1px solid red;
            float: right;
            height: 100vh;
        }
        .markdown-container {
            float: left;
            width: calc(100vw - 350px);
            border: 1px solid red;
            height: 100vh;
        }
    }
</style>
