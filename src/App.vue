<script setup lang="ts">
import { ref } from 'vue'
import AvatarUpload from '../packages/src/index.vue'
const show = ref(true)
const avatar = 'https://s3.bmp.ovh/imgs/2022/04/08/420ed87efa5616db.png'
</script>

<template>
  <div>
    <AvatarUpload v-show="show" :avatar="avatar" :url="''" :width="500" :height="500" :select-size="800" :preview-size="200" :fixed="true" style="height: 1000px;" @close="()=>{show=false}">
      <template #close>
        <button style="margin-right: 10px;">
          取消
        </button>
      </template>
      <template #upload>
        <button>上传</button>
      </template>
    </AvatarUpload>
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
