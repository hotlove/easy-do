import qs from "qs";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

let http:any = axios.create({
    // baseURL: store.state.apiHost,
    timeout: 20000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    transformRequest: [
        function (data: AxiosRequestConfig) {
            return qs.stringify(data);
        }
    ],
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data: AxiosRequestConfig) {
        // 这里提前处理返回的数据
        return data;
    }],
    paramsSerializer(data) {
        return qs.stringify(data);
    }
});

// 添加请求拦截器
axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response: AxiosResponse) {
    // 对响应数据做点什么
    return response;
}, function (error: any) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default http;
