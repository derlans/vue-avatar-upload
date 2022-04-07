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
        <div class="edit-fade" />
        <div ref="selsct" class="edit-select" :style="selectBoxStyle">
          <span class="edit-selcet-img-box border-3-white">
            <img :src="Props.avatar" alt="" :style="imgStyle" class="edit-select-img" @dragstart.prevent="">
          </span>
          <span ref="resize" class="select-zoom-point" />
        </div>
        <img ref="avatar" :src="Props.avatar" alt="" :style="editStyle" class="edit-bg" @dragstart.prevent="">
      </div>
      <div class="avatar-upload-preview">
        <span>头像预览</span>
        <div class="preview-radius border-3-white">
          <img :src="Props.avatar" alt="" :style="imgStyle" @dragstart.prevent="">
        </div>
        <div class="preview-square">
          <img :src="Props.avatar" alt="" :style="imgStyle" @dragstart.prevent="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import type { ComputedRef, Ref, StyleValue } from 'vue'
import { computed, reactive, ref, toRaw, watch } from 'vue'
import { createCutImg, getProjectionLength } from './help'
import { useDraggable } from './useDraggable'
interface Size{
  width: number
  height: number
}
interface IProps{
  avatar?: string
  url?: string
  field?: string
  params?: Record<string, any>
  headers?: Record<string, any>
  width?: number
  height?: number
  selectSize?: Size
  withCredentials?: boolean
}
const Props = withDefaults(defineProps<IProps>(), {
  field: 'avatar',
  width: 300,
  height: 300,
  withCredentials: false,
  selectSize: () => ({
    width: 100,
    height: 100,
  }),
})
const editBoxSize: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${Props.width}px`,
    height: `${Props.height}px`,
  }
})
const selectBoxSize = reactive({
  width: Props.selectSize.width,
  height: Props.selectSize.height,
})
const selsct: Ref<HTMLElement| null> = ref(null)
const editBox: Ref<HTMLElement| null> = ref(null)
const avatar: Ref<HTMLElement| null> = ref(null)
const resize: Ref<HTMLElement| null> = ref(null)

const { style: editPositionStyle, x: avatarX, y: avatarY } = useDraggable(editBox)
const editStyle = computed(() => {
  return {
    ...toRaw(editBoxSize.value as object),
    ...toRaw(editPositionStyle.value as object),
  }
})
const { style: selectPositionStyle, x: selectX, y: selectY } = useDraggable(selsct, {
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
const selectBoxStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${selectBoxSize.width}px`,
    height: `${selectBoxSize.height}px`,
    ...selectPositionStyle.value as object,
  }
})
const imgStyle: ComputedRef<StyleValue> = computed(() => {
  return {
    width: `${Props.width}px`,
    height: `${Props.height}px`,
    left: `${avatarX.value - selectX.value - 3}px`,
    top: `${avatarY.value - selectY.value - 3}px`,
  }
})
const { x: resizeX, y: resizeY } = useDraggable(resize, {
  stop: true,
  range: {
  },
})
watch([resizeX, resizeY], (newV, oldV) => {
  const sizeChangeX = newV[0] - oldV[0]
  const sizeChangeY = newV[1] - oldV[1]
  const sizeChange = parseFloat(getProjectionLength([sizeChangeX, sizeChangeY], [1, 1]).toFixed(1))

  selectBoxSize.width = Math.abs(selectBoxSize.width + sizeChange)
  selectBoxSize.height = Math.abs(selectBoxSize.height + sizeChange)
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
  border: 2px solid#fff;
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
.edit-fade{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
}
.edit-select{
  position: absolute;
  border-radius: 50%;
  cursor: move;
  z-index: 3;
  box-sizing: border-box;
}
.select-zoom-point{
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  left: 84%;
  top: 84%;
  cursor: se-resize;
}
.edit-selcet-img-box{
  overflow: hidden;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
}
.edit-select-img{
  user-select: none;
  display: block;
  position: absolute;
}
.edit-bg{
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
.preview-radius{
  border-radius: 50%;
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.preview-radius>img{
  position: absolute;
}
.preview-square{
  overflow: hidden;
  height: 100px;
  width: 100px;
  position: relative;
}
.preview-square>img{
  position: absolute;
}
</style>
