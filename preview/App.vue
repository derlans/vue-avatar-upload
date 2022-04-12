<script setup lang="ts">
import { ref } from 'vue'
import AvatarUpload from '../src/index'
const show = ref(true)
const avatar = 'https://s3.bmp.ovh/imgs/2022/04/08/420ed87efa5616db.png'
const headers = {
  Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTAyNTQ4NzY2NzgwMDgwMTMwIiwiaWF0IjoxNjQ5NTgwMzA3LCJleHAiOjE2NTAxODUxMDd9.bod_OuEzqZ40mwt5w7ZBWqb-bRN-_EyfzG5Pw3BPTz_QCg-l2XrNbNL6zuNjHEdDpjp6IbbJLuSo2-MgmN2gnQ',
}
function handelErr(err: Error) {
  console.log(err)
}
</script>

<template>
  <div>
    <AvatarUpload v-show="show" :headers="headers" :avatar="avatar" url="http://kunpeng.lhk.life/auth/user/update/avatar" :fixed="true" :on-error="handelErr" @close="()=>{show=false}" />
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
