<template>
    <div class="dragger-element">
<!--        <div ></div>-->
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class CloseNavigation extends Vue {
    }
</script>
<style lang="scss">
    .dragger-element {
        -webkit-app-region: drag;
        height: 25px;
        line-height: 25px;
        border: 1px solid red;
        width: 100%;
        position: fixed;
        top: 0;
    }
</style>
