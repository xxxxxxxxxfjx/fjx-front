import request from '../index'

export function getCategory() {
  return request({
    url: '/category'
  })
}
