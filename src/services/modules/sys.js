import request from '../index'
import md5 from 'md5'
// 登录
export function postLoginApi(data) {
  // console.log(data)
  return request({
    url: '/sys/login',
    method: 'POST',
    data: {
      ...data,
      password: md5(data.password)
    }
  })
}
// 获取用户信息
export function getUserInfoApi() {
  return request({
    url: '/user/profile'
  })
}
// 注册
export const postRegisterApi = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data: {
      ...data,
      password: md5(data.password)
    }
  })
}
