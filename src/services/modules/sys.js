import request from '../index'
export function postLoginApi(data) {
  // console.log(data)
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getUserInfoApi() {
  return request({
    url: '/user/profile'
  })
}
