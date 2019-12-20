export interface TodoItemObject {
    id: number;
    content: string;
    completed: boolean;
}

export interface RequestParams {
    [propName: string]: any
}

export interface Profile {
    userName: string;
    token: string;
}

export interface State {
    token: string,
    profileInfo: Profile;
}
