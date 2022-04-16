<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { NButton, NCard, NCode, NForm, NFormItem, NInput, NInputNumber, NSelect, NSwitch } from 'naive-ui'
import AvatarUpload from '../src/index'
import { isMobile } from '@/utils'
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
const _isMobile = isMobile()
const Props = reactive({
  avatar,
  width: _isMobile ? 200 : 400,
  height: _isMobile ? 200 : 400,
  selectSize: _isMobile ? 100 : 300,
  previewSize: _isMobile ? 80 : 180,
  showPreview: true,
  rotate: true,
  fixed: false,
  lang: 'en',
})
const langOptions = [
  {
    value: 'en',
    label: 'en',
  },
  {
    value: 'zh-CN',
    label: '中国内地',
  },
  {
    value: 'zh-TW',
    label: '中国台湾（台湾是中国的！！！）',
  },
]
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;width: 100vw;min-height: 100vh;flex-wrap: wrap;">
    <AvatarUpload :key="key" v-bind="Props" @close="handelClose" @error="handelErr" @success="handelSuccess" />
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
        <NFormItem label="lang">
          <NSelect v-model:value="Props.lang" style="width: 500px;" :options="langOptions" />
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
