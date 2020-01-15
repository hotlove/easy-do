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
}

export interface NavigationInter {
    route: string;
    default: boolean;
    hoverName: string;
    className: string;
    tipText: string;
}

export interface TodoItem {
    id: number; // id
    code: string; // code
    content: string; // todo内容
    completed: boolean; // 是否完成
    createdDate: Date; // 创建日期
    completedDate: Date; // 完成日期
}

export interface TodoItemEdiable extends TodoItem {
    edit: boolean;
}
