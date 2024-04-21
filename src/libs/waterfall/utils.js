export function getImgElement(itemElements) {
  const imgElements = []
  itemElements.forEach((el) => {
    let imgElement = el.getElementsByTagName('img')
    imgElements.push(...imgElement)
  })
  return imgElements
}

export function getAllImg(imgElements) {
  return imgElements.map((el) => {
    return el.src
  })
}

export function onComplateImgs(allImgs) {
  const promiseAll = allImgs.map((url, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        resolve({
          img,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}

// 计算最小高度
export function getMinHeight(columnsHeightObj) {
  const valueList = Object.values(columnsHeightObj)
  return Math.min(...valueList)
}

// 计算最大高度
export function getMaxHeight(columnsHeightObj) {
  const valueList = Object.values(columnsHeightObj)
  return Math.max(...valueList)
}

// 计算最小高度所在列
export function getMinPosition(columnsHeightObj) {
  const mingHeight = getMinHeight(columnsHeightObj)
  return Object.keys(columnsHeightObj).find((key) => {
    return columnsHeightObj[key] === mingHeight
  })
}
