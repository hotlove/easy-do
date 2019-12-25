<template>
    <div class="dragger-element" :class="heigthValue">
<!--        <div ></div>-->
    </div>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class CloseNavigation extends Vue {
        @Prop({ default: 20 })
        height !: number

        get heigthValue() {
            console.log(this.height)
            return {
                'height': this.height + 'px',
                'line-height': this.height + 'px'
            }
        }
    }
</script>
<style lang="scss">
    .dragger-element {
        -webkit-app-region: drag;
        width: 100%;
        position: fixed;
        top: 0;
        border: 1px solid red;
    }
</style>
