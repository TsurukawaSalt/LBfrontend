import axios from "@/http/axios";

// 提交登录表单
export const postLoginForm = params => {
  return axios({
    url: '/user/login',
    method: 'post',
    params
  })
}

// 提交注册表单
export const postRegisterForm = params => {
  return axios({
    url: '/user/register',
    method: 'post',
    params
  })
}

// 邮箱验证
export const getCoAuthors = params => {
  return axios({
    url: '/user/sendEmail',
    method: 'get',
    params
  })
}

// 获得个人信息
export const getPerInfo = params => {
  return axios({
    url: '/user/getPerInfo',
    method: 'get',
    params
  })
}

// 修改个人头像
export const changeImg = params => {
    return axios({
        url: '/user/changeImg',
        method: 'post',
        params
    })
}

// 修改个人信息
export const changeInfo = params => {
    return axios({
        url: '/user/changeInfo',
        method: 'post',
        params
    })
}

// 修改密码
export const changePasswd = params => {
    return axios({
        url: '/user/changePasswd',
        method: 'post',
        params
    })
}