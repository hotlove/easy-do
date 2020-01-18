import {SystemSetting} from '@/domain/SystemSetting';

export interface RequestParams {
    [propName: string]: any;
}

export interface Profile {
    userName: string;
    token: string;
}

export interface State {
    token: string;
    profileInfo: Profile;
    systemSetting: SystemSetting;
}

export interface NavigationInter {
    route: string;
    default: boolean;
    hoverName: string;
    className: string;
    tipText: string;
}
