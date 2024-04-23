export function getImgElements(items) {
  const imgElements = []
  Array.from(items).forEach((item) => {
    imgElements.push(...item.querySelectorAll('img'))
  })
  return imgElements
}

export function getAllImgs(imgElements) {
  return imgElements.map((img) => img.src)
}

export function onComplateLoading(allImgs) {
  const promiseArr = allImgs.map((item, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = item
      img.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseArr)
}

export function getMinHeight(columnsHeight) {
  const heights = Object.values(columnsHeight)
  // console.log(heights)
  return Math.min(...heights)
}

export function getMaxHeight(columnsHeight) {
  const heights = Object.values(columnsHeight)
  return Math.max(...heights)
}

export function getMinHeightIndex(columnsHeight) {
  const minHeight = getMinHeight(columnsHeight)
  const minHeightIndex = Object.keys(columnsHeight).find(
    (key) => columnsHeight[key] === minHeight
  )
  return minHeightIndex
}
