import request from "../utils/request";

export const login = (data) => {
    return request({
        url: 'auth/login',
        method: 'post',
        data: data
    })
}

export const getInfo = () => {
    return request({
        url: 'auth/info',
        method: 'get'
    })
}

export const getCodeImg = () => {
    return request({
        url: 'auth/code',
        method: 'get'
    })
}

export const logout = () => {
    return request({
        url: 'auth/logout',
        method: 'delete'
    })
}