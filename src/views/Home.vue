<template>
  <div class="home">
    <mu-container class="demo-container is-stripe">
  <mu-row>
    <mu-col span="12"><div class="grid-cell"></div></mu-col>
  </mu-row>
  <mu-row>
    <mu-col span="6"><div class="grid-cell"></div></mu-col>
    <mu-col span="6"><div class="grid-cell"></div></mu-col>
  </mu-row>
  <mu-row>
    <mu-col span="4"><div class="grid-cell"></div></mu-col>
    <mu-col span="4"><div class="grid-cell"></div></mu-col>
    <mu-col span="4"><div class="grid-cell"></div></mu-col>
  </mu-row>
  <mu-row>
    <mu-col span="3"><div class="grid-cell"></div></mu-col>
    <mu-col span="3"><div class="grid-cell"></div></mu-col>
    <mu-col span="3"><div class="grid-cell"></div></mu-col>
    <mu-col span="3"><div class="grid-cell"></div></mu-col>
  </mu-row>
  <mu-row>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
    <mu-col span="2"><div class="grid-cell"></div></mu-col>
  </mu-row>
</mu-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue{
 
}
</script>
<style lang="scss">
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    border-radius: 4px;
    height: 36px;
    background: rgba(255, 255, 255, 0.8);
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell{
  background: rgba(0, 0, 0, 0.54);
}
</style>
