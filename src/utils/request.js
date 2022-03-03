import axios from "axios";

const service = axios.create({
    baseURL: 'http://localhost:8080/renren-fast', 
    timeout: 600000 
})


//返回其他状态码
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
};

//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;


//设置请求头
service.interceptors.request.use(config => {
    // 给请求头加上Authorization,authJWT的字段,值为token
    // config.headers.Authorization = window.localStorage.getItem('token')
    // config.headers.authJWT = window.localStorage.getItem('token')
    config.headers.token = window.localStorage.getItem('token')
    return config
})
// 响应拦截
service.interceptors.response.use(response => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200;
    if(code===401){
       
    }
    return response;
}, error => {
    // 请求失败
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                // 对400错误您的处理\
                break
            case 401:
                // 对 401 错误进行处理
                break
            default:
                // 如果以上都不是的处理
                return Promise.reject(error);
        }
    }

})
//导出
export default service;