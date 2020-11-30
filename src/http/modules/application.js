import axios from "@/http/axios";

export const getAll = params =>{
  return axios({
    url:'/application/getAll',
    method:'post',
    params
  })
}