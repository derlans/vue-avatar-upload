<script setup lang="ts">
import AvatarUpload from '../packages/src/index.vue'
const avatar = 'https://scpic.chinaz.net/files/pic/pic6/pic1281.jpg'
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
