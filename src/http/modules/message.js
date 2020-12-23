import axios from "@/http/axios";

// 获取消息
export const getMessage = params => {
    return axios({
        url: '/message/getMessage',
        method: 'get',
        params
    })
}

// 删除消息
export const deleteMessage = params => {
    return axios({
        url: '/message/deleteMessage',
        method: 'get',
        params
    })
}