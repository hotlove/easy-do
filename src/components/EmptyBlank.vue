<template>
    <div class="empty-blank-container">
        <i class="iconfont icon-todo"></i>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';

    @Component
    export default class EmptyBlank extends Vue {

    }
</script>
<style lang="scss">
    .empty-blank-container {
        position: absolute;
        height: 100%;
        width: 100%;
        text-align: center;

        & i {
            display: inline-block;
            top: 50%; /*偏移*/
            transform: translateY(-50%);
        }
    }
</style>