import http from './http'
import qs from 'qs';
import {AxiosResponse} from "axios";
class HttpRequest {
    get = (url: string, params: any): AxiosResponse => {
        url = `${url}?${qs.stringify(params)}`;
        return http.get(url);
    };

    post = (url: string, params: any): AxiosResponse => {
        return http.post(url, JSON.stringify(params));
    }
}

export default (new HttpRequest()) as any;
