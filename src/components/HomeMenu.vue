<template>
    <div>
        <mu-paper class="demo-paper" :z-depth="5">啊啊啊</mu-paper>
        <mu-paper class="demo-paper" :z-depth="5">啊啊啊</mu-paper>
        <mu-paper class="demo-paper" :z-depth="5">啊啊啊啊</mu-paper>
        <mu-paper class="demo-paper" :z-depth="5">{{ $moment().format('YYYY-MM-DD HH:mm') }}</mu-paper>
        <mu-paper class="demo-paper" :z-depth="5">{{ dateStr }}</mu-paper>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class HomeMenu extends Vue {
        dateStr: string = this.$moment().format("YYYY-MM-DD HH:mm");
    }
</script>
<style lang="scss">

</style>
