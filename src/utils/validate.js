// 用户名校验
// 成功返回true 失败返回string，string就是校验不合格的提示字符串
export const usernameValidate = (val) => {
  if (!val) {
    return '用户名不能为空！'
  }
  if (val.length < 3 || val.length > 9) {
    return '用户名长度在 3-9 之间'
  }
  return true
}
// 密码校验
export const passwordValidate = (val) => {
  if (!val) {
    return '密码不能为空！'
  }
  if (val.length < 3 || val.length > 9) {
    return '密码长度在 3-9 之间'
  }
  return true
}
