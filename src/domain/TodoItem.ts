export enum  TodoItemProperty {
    id = 'id',
    code = 'code',
    content = 'content',
    completed = 'completed',
    createdDate = 'createdDate',
    completedDate = 'completedDate',
}

export interface TodoItem {
    [ TodoItemProperty.id ]: number; // id
    [ TodoItemProperty.code ]: string; // code
    [ TodoItemProperty.content ]: string; // todo内容
    [ TodoItemProperty.completed ]: boolean; // 是否完成
    [ TodoItemProperty.createdDate ]: Date; // 创建日期
    [ TodoItemProperty.completedDate ]: Date; // 完成日期
}

export interface TodoItemEdiable extends TodoItem {
    edit: boolean;
    tempContent: '';
}
