const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  // 判断用户名长度
  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.message = '名字的长度不能小于2位且不能超过20位'
  }

  if (Validator.isEmpty(data.name)) {
    errors.message = '名字不能为空'
  }

  if (Validator.isEmpty(data.password)) {
    errors.message = '密码不能为空'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.message = '密码的长度不能小于6位且不能超过20位'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.message = '重复密码不能为空'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.message = '两次密码不一致'
  }

  if (Validator.isEmpty(data.email)) {
    errors.message = '邮箱不能为空'
  }

  if (!Validator.isEmail(data.email)) {
    errors.message = '邮箱不合法'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
