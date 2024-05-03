import request from '../index'

export function getPexelsListApi(data) {
  return request.get('/pexels/list', {
    params: data
  })
}

export function getPexelsHint(q) {
  return request.get('/pexels/hint', {
    params: {
      q
    }
  })
}
