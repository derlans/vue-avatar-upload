<template>
  <div class="avatar-upload">
    <div class="avatar-upload-header">
      <div class="avatar-upload-title">
        编辑头像
      </div>
      <div class="avatar-upload-close">
        关闭
      </div>
    </div>
    <div class="avatar-upload-main" :style="editBoxSize">
      <div class="avatar-upload-edit" :style="editBoxSize">
        <div class="avatar-upload-edit-fade" />
        <div class="avatar-upload-edit-select">
          <img :src="Props.avatar" alt="" :style="editBoxSize" class="avatar-upload-edit-select-img" @dragstart.prevent="">
        </div>
        <img :src="Props.avatar" alt="" :style="editBoxSize" class="avatar-upload-edit-bg" @dragstart.prevent="">
      </div>
      <div class="acatar-upload-preview" />
    </div>
  </div>
</template>

<script setup lang="ts" >
import type { ComputedRef, StyleValue } from 'vue'
import { computed } from 'vue'

interface IProps{
  avatar?: string
  url?: string
  field?: string
  params?: Record<string, any>
  headers?: Record<string, any>
  width?: number
  height?: number
  withCredentials?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
})
const editBoxSize: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${Props.width}px`,
    height: `${Props.height}px`,
  }
})
</script>

<style scoped >
.avatar-upload-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 16px;
  font-weight: 700;
}
.avatar-upload-main{
  padding: 10px;
  display: flex;
}
.avatar-upload-edit{
  position: relative;
}
.avatar-upload-edit-fade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.avatar-upload-edit-select{
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: inherit!important;
  overflow: hidden;
}
.avatar-upload-edit-select-img{
  user-select: none;
}
.avatar-upload-edit-bg{
  user-select: none;
  display: block;
}
</style>
