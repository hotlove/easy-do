<template>
    <div>
        <mavon-editor v-model="fileContent" :boxShadow="false" :subfield="true"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class NewNote extends Vue {

        // 编辑文件内容
        private fileContent: string = "";

        public mounted(): void {
            console.log(this.$route)
        }
    }
</script>
<style lang="scss">

</style>
