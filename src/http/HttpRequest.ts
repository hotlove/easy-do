import http from './http'
import {AxiosResponse} from "axios";
class HttpRequest {
    get = (url: string, params: any): AxiosResponse => {
        return http.get(url, params);
    };

    post = (url: string, params: any, ): AxiosResponse => {
        return http.post(url, params);
    }
}

export default new HttpRequest() as any;
