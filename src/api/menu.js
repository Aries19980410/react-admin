import request from "../utils/request";

export const getMenu = (query) => {
    return request({
        url: 'sys/menu/list',
        method: 'get',
        params: query
    })
}