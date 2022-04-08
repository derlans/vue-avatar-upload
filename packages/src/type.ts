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
export type MRef<T> = Ref<T | null>
export type RefElement =MRef<HTMLElement>
