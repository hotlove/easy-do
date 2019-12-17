export interface TodoItemObject {
    id: number;
    content: string;
    completed: boolean;
}

export interface RequestParams {
    [propName: string]: any
}
