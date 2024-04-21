import request from '../index'

export function getPexelsListApi(data) {
  return request.get('/pexels/list', {
    params: data
  })
}
