export enum  TaskProperty {
    id = 'id',
    code = 'code',
    title = 'title',
    content = 'content',
    endDate = 'endDate', // 结束日期
    createdDate = 'createdDate', // 创建日期
}

export interface Task {
    [ TaskProperty.id ]: number; // id
    [ TaskProperty.code ]: string; // code
    [ TaskProperty.title ]: string; // 任务标题
    [ TaskProperty.content ]: string; // todo内容
    [ TaskProperty.endDate ]: Date; // 结束日期
    [ TaskProperty.createdDate ]: Date; // 完成日期
}