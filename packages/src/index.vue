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
    <div class="avatar-upload-main">
      <div ref="editBox" class="avatar-upload-edit" :style="editBoxSize">
        <div class="avatar-upload-edit-fade" />
        <div ref="selsct" class="avatar-upload-edit-select border-3-white" :style="selectStyle">
          <img :src="Props.avatar" alt="" :style="imgStyle" class="avatar-upload-edit-select-img" @dragstart.prevent="">
          <span class="select-zoom-point" />
        </div>
        <img ref="avatar" :src="Props.avatar" alt="" :style="editStyle" class="avatar-upload-edit-bg" @dragstart.prevent="">
      </div>
      <div class="avatar-upload-preview">
        <span>头像预览</span>
        <div class="avatar-upload-preview-radius border-3-white">
          <img :src="Props.avatar" alt="" :style="imgStyle" @dragstart.prevent="">
        </div>
        <div class="avatar-upload-preview-square">
          <img :src="Props.avatar" alt="" :style="imgStyle" @dragstart.prevent="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import type { ComputedRef, Ref, StyleValue } from 'vue'
import { computed, ref, toRaw } from 'vue'
import { createCutImg } from './help'
import { useDraggable } from './useDraggable'

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
const selsct: Ref<HTMLElement| null> = ref(null)
const editBox: Ref<HTMLElement| null> = ref(null)
const avatar: Ref<HTMLElement| null> = ref(null)
const { style: editPositionStyle, x: avatarX, y: avatarY } = useDraggable(editBox, {
})
const editStyle = computed(() => {
  return {
    ...toRaw(editBoxSize.value as object),
    ...toRaw(editPositionStyle.value as object),
  }
})
const { style: selectStyle, x: selectX, y: selectY } = useDraggable(selsct, {
  stop: true,
  range: {
    x: {
      min: 0,
      max: 200,
    },
    y: {
      min: 0,
      max: 200,
    },
  },
})
const imgStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${Props.width}px`,
    height: `${Props.height}px`,
    left: `${avatarX.value - selectX.value}px`,
    top: `${avatarY.value - selectY.value}px`,
  }
})
const cutImg = createCutImg()
function getImgData() {
  return cutImg(Props.avatar, {
    x: {
      begin: 0,
      end: 300,
    },
    y: {
      begin: 0,
      end: 300,
    },
  })
}

</script>

<style scoped >
.avatar-upload{
  border-radius: 10px;
  background-color: #fff;
  padding: 5px 15px;
}
.border-3-white{
  border: 3px solid#fff;
}
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
  justify-content:center;
}
.avatar-upload-edit{
  position: relative;
  cursor: move;
  margin-right: 10px;
}
.avatar-upload-edit-fade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.avatar-upload-edit-select{
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: inherit!important;
  overflow: hidden;
  cursor: move;
  z-index: 3;
}
.select-zoom-point{
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  left: 80%;
  top: 87%;
}
.avatar-upload-edit-select-img{
  user-select: none;
  position: absolute;
  display: block;
}
.avatar-upload-edit-bg{
  user-select: none;
  display: block;
  position: absolute;
  z-index: 2;
  cursor: move;
}
.avatar-upload-preview{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #939393;
  padding: 10px;
}
.avatar-upload-preview-radius{
  border-radius: 50%;
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.avatar-upload-preview-radius>img{
  position: absolute;
}
.avatar-upload-preview-square{
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.avatar-upload-preview-square>img{
  position: absolute;
}
</style>
