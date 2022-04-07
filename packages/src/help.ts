export function createCutImg() {
  const canvas = document.createElement('canvas')
  const contex = canvas.getContext('2d')
  function cutImg(url: string, range: {
    x: {
      begin: number
      end: number
    }
    y: {
      begin: number
      end: number
    }
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const { x, y } = range
      const img = new Image()
      img.crossOrigin = 'anmouns'
      img.src = `${url}?t=${new Date().getTime()}`
      try {
        img.onload = () => {
          contex!.drawImage(img, x.begin, y.begin, x.end - x.begin, y.end - y.begin)
          resolve(canvas.toDataURL())
        }
      }
      catch (error) {
        reject(error)
      }
    })
  }
  return cutImg
}
type Vector=number[]
export function getVectorLength(vector: Vector) {
  return Math.sqrt(vector.reduce((pre, cur) => pre + cur ** 2, 0))
}
function sum(vector: Vector) {
  return vector.reduce((pre, cur) => pre + cur, 0)
}
export function getProjectionLength(vector: Vector, targetVector: Vector) {
  const vectorLength = getVectorLength(vector)
  const targetVectorLength = getVectorLength(targetVector)
  return sum(vector) / (vectorLength * targetVectorLength)
}
