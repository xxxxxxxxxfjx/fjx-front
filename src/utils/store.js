import _ from 'lodash'
export function setItem(key, value) {
  if (_.isObject(value)) {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
export function getItem(key) {
  const res = localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
export function removeItem(key) {
  localStorage.removeItem(key)
}

export function clearItem() {
  localStorage.clear()
}
