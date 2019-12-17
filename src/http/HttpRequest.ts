import http from './http'
import qs from 'qs';
import {AxiosResponse} from "axios";
import {RequestParams} from "@/types";

class HttpRequest {

    // 基础配置中已经配置好url 这里配置uri资源路径
    get(uri: string, params: RequestParams): AxiosResponse {
        uri = `${uri}?${qs.stringify(params)}`;
        return http.get(uri);
    };

    // 基础配置中已经配置好url 这里配置uri资源路径
    post(uri: string, params: RequestParams): AxiosResponse {
        return http.post(uri, JSON.stringify(params));
    }
}

export default (new HttpRequest()) as any;
