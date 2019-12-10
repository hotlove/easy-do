<template>
  <div class="home">
    <!-- <Music></Music> -->
    <mu-row class="home-header">
      <mu-col span="10" class="home-header-item"></mu-col>
      <mu-col span="2" class="home-header-item header-avatar">
        <mu-avatar>
          <img src="../static/avatar.png">
        </mu-avatar>
      </mu-col>
    </mu-row>
    <mu-row class="home-body" gutter>
      <mu-col span="6" class="home-body-item">
        <div class="grid-cell"></div>
      </mu-col>
      <mu-col span="6" class="home-body-item">
        <div class="grid-cell"></div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Prop, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Music from "@/components/Music.vue";
import TodoList from "@/components/TodoList.vue";

@Component({
  components: {
    HelloWorld,
    Music,
    TodoList
  }
})
export default class Home extends Vue {}
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;

  .home-header {
    width: 100%;
    height: 56px;
    line-height: 56px;
    background: rgb(102, 91, 202);
    box-shadow: 0 3px 6px 3px rgb(177, 174, 174);

    .home-header-item {
      height: 100%;
    }
    .header-avatar {
      text-align: center;
    }
  }
  .home-body {
    height: calc(100vh - 56px);

    .home-body-item {
      border: 1px solid red;
      height: 100%;
    }
  }
}
</style>
