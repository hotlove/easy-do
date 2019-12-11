<template>
  <div>
    <mu-text-field v-model="todoItem" full-width multi-line :rows="2" placeholder="请输入todo内容..."></mu-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TodoList extends Vue {
  todoItem: string = "";
}
</script>
<style lang="scss">
</style>