import type { Ref } from 'vue'

export interface Size{
  width: number
  height: number
}
export interface SizeStyle{
  width: string
  height: string
}
export interface Position{
  left: number
  top: number
}
export interface PositionStyle{
  left: string
  top: string
}
export type Rotate = 0 | 90 | 180 | 270
export interface Rectangle {
  width: number
  height: number
  left: number
  top: number
  zoom?: number
  rotate?: Rotate
}
export interface Range{
  sx: number
  sy: number
  sw: number
  sh: number
}
export type MRef<T> = Ref<T | null>
export type RefElement =MRef<HTMLElement>
