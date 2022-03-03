import request from "../utils/request";

// 获取用户列表
export const getUserPage = (query) => {
    return request({
        url: '/sys/user/list',
        method: 'get',
        parmas:query
    })
}

// 添加用户
export const add = (data) => {
    return request({
        url: '/sys/user/save',
        method: 'post',
        data
    })
}
