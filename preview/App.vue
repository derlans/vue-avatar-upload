<script setup lang="ts">
import { ref } from 'vue'
import AvatarUpload from '../src/index'
const show = ref(true)
const avatar = 'https://s3.bmp.ovh/imgs/2022/04/08/420ed87efa5616db.png'
function handelErr(err: Error) {
  console.log(err)
}
</script>

<template>
  <div>
    <AvatarUpload v-show="show" :avatar="avatar" :url="''" :fixed="true" :on-error="handelErr" @close="()=>{show=false}" />
  </div>
  <div>1111</div>
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
