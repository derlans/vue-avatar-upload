import type { Range, Rectangle } from './type'

export function getRange(select: Rectangle, target: Rectangle): Range {
  const zoom = target.zoom || 1
  const sx = select.left - target.left > 0 ? select.left - target.left : 0
  const sy = select.top - target.top > 0 ? select.top - target.top : 0
  const sw = select.width
  const sh = select.height
  return {
    sx: sx / zoom,
    sy: sy / zoom,
    sw: sw / zoom,
    sh: sh / zoom,
  }
}
/**
 * @description  创建裁剪图片的canvas 返回裁剪函数 单例模式
 */
export function createCutImg() {
  const canvas = document.createElement('canvas')
  const contex = canvas.getContext('2d')!
  return function cutImg(url: string, range: Range, format = 'png'): Promise<Blob> {
    const { sx, sy, sw, sh } = range
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = ''
      img.src = url
      img.onload = () => {
        canvas.height = sh
        canvas.width = sw
        contex.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
        canvas.toBlob((blob) => {
          if (blob)
            resolve(blob)
          reject(new Error('canvas to blob error'))
          contex.restore()
        }, format)
      }
      img.onerror = (e) => {
        reject(e)
      }
    })
  }
}
/**
 * @description  求向量的模
 */
export function getVectorLength(vector: number[]) {
  return Math.sqrt(vector.reduce((pre, cur) => pre + cur ** 2, 0))
}
/**
 * @description  求向量投影
 */
export function getProjectionLength(vector: number[], targetVector: number[]) {
  const targetVectorLength = getVectorLength(targetVector)
  let dotProduct = 0
  vector.forEach((v, i) => {
    dotProduct += v * targetVector[i]
  })
  return dotProduct / targetVectorLength
}

/**
 * @description  上传图片
 */
export function uploadFile(formData: FormData, url: string, method = 'POST', options: { headers?: Record<string, string> ; data?: Record<string, string> ;withCredentials: boolean }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const headers = options.headers || {}
    xhr.open(method, url)
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.withCredentials = !!options.withCredentials
    xhr.onload = () => {
      if (xhr.status === 200)
        resolve(xhr.response)
      else
        reject(new Error(xhr.statusText))
    }
    xhr.onerror = () => {
      reject(new Error('Network Error'))
    }
    xhr.send(formData)
  })
}
/**
 * @description  turn Blob to base64
 */
export function getBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

export function isMobile() {
  return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
