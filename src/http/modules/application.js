import axios from "@/http/axios";

export const getAll = params =>{
  return axios({
    url:'/application/getAll',
    method:'post',
    params
  })
}

export const agree = params =>{
  return axios({
    url:'/application/agree',
    method:'post',
    params
  })
}
export const reject = params =>{
  return axios({
    url:'/application/reject',
    method:'post',
    params
  })
}
// 新建申请
export const create = data => {
  return axios({
    url: '/application/create',
    method: 'post',
    data
  })
}

