import { requestConfig } from './RequestConfig'
import qs from 'qs';
import {RequestParams} from "@/types";

class HttpRequest {
    // 基础配置中已经配置好url 这里配置uri资源路径
    public get(uri: string, params: RequestParams): any {
        let newUri = `${uri}?${qs.stringify(params)}`;
        return requestConfig.get(newUri);
    };
    // 基础配置中已经配置好url 这里配置uri资源路径
    public post(uri: string, params: RequestParams): any {
        return requestConfig.post(uri, JSON.stringify(params));
    }
}

export { HttpRequest };
