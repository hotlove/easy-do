import requestConfig from './RequestConfig'
import qs from 'qs';
import {RequestParams} from "@/types";

class HttpRequest {

    // 基础配置中已经配置好url 这里配置uri资源路径
    get(uri: string, params: RequestParams): any {
        uri = `${uri}?${qs.stringify(params)}`;
        return requestConfig.get(uri);
    };

    // 基础配置中已经配置好url 这里配置uri资源路径
    post(uri: string, params: RequestParams): any {
        return requestConfig.post(uri, JSON.stringify(params));
    }
}

export default HttpRequest;
