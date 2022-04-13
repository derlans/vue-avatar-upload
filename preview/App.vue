<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { NButton, NCard, NCode, NForm, NFormItem, NInput, NInputNumber, NSwitch } from 'naive-ui'
import AvatarUpload from '../src/index'
const avatar = 'https://s3.bmp.ovh/imgs/2022/04/08/420ed87efa5616db.png'
function handelErr(err: Error) {
  alert(err.message)
}
function handelSuccess(respose: any) {
  alert(respose)
}
function handelClose() {
  alert('click close')
}
const key = ref(0)
const Props = reactive({
  avatar,
  handelErr,
  width: 400,
  height: 400,
  selectSize: 300,
  previewSize: 200,
  showPreview: true,
  rotate: true,
  fixed: false,
})
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;width: 100vw;height: 100vh;">
    <NCard style="width: 600px;margin: 20px;" title="Props">
      <NForm label-placement="left" label-width="100">
        <NFormItem label="width">
          <NInputNumber v-model:value="Props.width" style="width: 500px;" />
        </NFormItem>
        <NFormItem label="height">
          <NInputNumber v-model:value="Props.height" style="width: 500px;" />
        </NFormItem>
        <NFormItem label="selectSize">
          <NInputNumber v-model:value="Props.selectSize" style="width: 500px;" />
        </NFormItem>
        <NFormItem label="previewSize">
          <NInputNumber v-model:value="Props.previewSize" style="width: 500px;" />
        </NFormItem>
        <NFormItem label="Avatar">
          <NInput v-model:value="Props.avatar" style="width: 500px;" />
        </NFormItem>
        <NFormItem label="onClose">
          <NCode>
            {{ handelClose }}
          </NCode>
        </NFormItem>
        <NFormItem label="onSuccess">
          <NCode>
            {{ handelSuccess }}
          </NCode>
        </NFormItem>
        <NFormItem label="onError">
          <NCode>
            {{ handelErr }}
          </NCode>
        </NFormItem>
        <NFormItem label="showPreview">
          <NSwitch v-model:value="Props.showPreview" />
        </NFormItem>
        <NFormItem label="rotate">
          <NSwitch v-model:value="Props.rotate" />
        </NFormItem>
        <NFormItem label="fixed">
          <NSwitch v-model:value="Props.fixed" />
        </NFormItem>
        <div style="display: flex;justify-content: center;">
          <NButton type="success" @click="key++">
            update Props
          </NButton>
        </div>
      </NForm>
    </NCard>
    <AvatarUpload :key="key" v-bind="Props" @close="handelClose" @error="handelErr" @success="handelSuccess" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
}
</style>
