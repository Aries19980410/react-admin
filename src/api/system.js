import request from "../utils/request";

// 获取字典
export const getDict = (data) => {
    return request({
        url: '/api/dictDetail',
        method: 'post',
        data: data
    })
}

// 获取用户分页
export const getUserPage = (page,size) => {
    return request({
        url: '/api/users',
        method: 'get',
        params:{
            page,
            size
        }
    })
}

// 获取部门
export const getUserDept = (data) => {
    return request({
        url: '/api/dept',
        method: 'get',
        data: data
    })
}

// 角色列表
export const getRoleList = () =>{
    return request({
        url: '/api/roles/all',
        method: 'get'
    })
}

// 岗位列表
export const getJobsList = () =>{
    return request({
        url: '/api/job',
        method: 'get'
    })
}

// 添加用户
export function add(data) {
    return request({
      url: 'api/users',
      method: 'post',
      data
    })
}