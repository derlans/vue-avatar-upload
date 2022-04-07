<script setup lang="ts">
import AvatarUpload from '../packages/src/index.vue'
const avatar = 'https://img.zcool.cn/community/01e5ed5d5fbc0ca8012187f4bfc51d.jpg@1280w_1l_2o_100sh.jpg'
</script>

<template>
  <div style="width: 550px;height: 550px;margin: 0 auto;margin-top: 200px;">
    <AvatarUpload :avatar="avatar" />
  </div>
</template>

<style>
html{
    background-color: rgb(151, 151, 151);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
* {
  margin: 0;
  padding: 0;
}
</style>
