// 用户名校验
// 成功返回true 失败返回string，string就是校验不合格的提示字符串
export const usernameValidate = (val) => {
  if (!val) {
    return '用户名不能为空！'
  }
  if (val.length < 6 || val.length > 20) {
    return '用户名长度在 6-20 之间'
  }
  return true
}
// 密码校验
export const passwordValidate = (val) => {
  if (!val) {
    return '密码不能为空！'
  }
  if (val.length < 6 || val.length > 20) {
    return '密码长度在 6-20 之间'
  }
  return true
}

// 注册时，密码确认
export const confirmPassword = (val, [password]) => {
  // console.log(val, password)
  if (val !== password) {
    return '两次密码输入必须一致'
  }
  return true
}
