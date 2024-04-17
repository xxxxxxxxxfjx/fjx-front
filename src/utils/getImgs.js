const getImgs = (path) => {
  return new URL(`../assets/imgs/${path}`, import.meta.url).href
}

export default getImgs
