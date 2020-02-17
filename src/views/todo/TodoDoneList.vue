<template>
    <div>
        <div class="todo-body-content-list">
            <div class="todo-completed todo-container">
                <!-- to-do未完成列表页 -->
                <div class="todo-list">
                    <!-- 列表 -->
                    <div class="todo-uncompleted-list">
                        <!-- todoitem 列表块 -->
                        <div v-for="(item, date) in completedTodoList" :key="date">
                            <!-- todoitem未编辑 -->
                            <div class="todo-item-unedit">
                                <div style="padding-left: 8px; color: #8b8b8b; font-size: 16px;">
                                    {{ $moment(date).format('dddd YYYY-MM-DD') }}
                                </div>
                                <div v-for="(e, i) in item" :key="i" class="todo-list-item" >
                                    <!-- todoitemdot -->
                                    <span class="todo-list-item-mark">
                                        <span class="todo-list-item-dot"></span>
                                    </span>
                                    <!-- todoitem内容 -->
                                    <span class="todo-list-item-content"
                                          v-html="e.content"></span>
                                    <!-- todoitem操作 -->
                                    <span class="todo-item-oper">
                                        <i class="iconfont icon-reback" @click="rebackTodoItem(e, date, i)"></i>
                                        <i class="iconfont icon-minimum" @click="deleteCompletedTodoItem(date, i)"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {TodoItem, TodoItemEdiable, TodoItemProperty} from '@/domain/TodoItem';
    import {todoItemMapper} from '@/dbutil';
    import {CommonUtil} from '@/common/CommonUtil';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';

    @Component
    export default class TodoDoneList extends Vue {

        private completedTodoList: any = {};

        // 声明钩子函数
        public mounted() {
            this.getTodoItemCompltedList();
        }

        public getTodoItemCompltedList(): void {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.completed, true);

            todoItemMapper.find(neDBExample).then((todoItemList: any) => {
                if (todoItemList.length > 0) {
                    let completedTodolist =
                        todoItemList.sort((a: TodoItemEdiable, b: TodoItemEdiable) => a.completedDate < b.completedDate);

                    this.completedTodoList = CommonUtil
                        .groupBy(completedTodolist,
                                 (item: TodoItemEdiable) => this.$moment(item.completedDate).format('YYYY-MM-DD'));
                } else {
                    this.completedTodoList = {};
                }
            });
        }

        // 撤销TODO完成
        public rebackTodoItem(todoItem: TodoItemEdiable, key: string, index: number): void {
            todoItem.completed = !todoItem.completed;
            todoItem.completedDate = new Date();

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.code, todoItem.code);

            todoItemMapper.update(neDBExample, todoItem).then( result => {
                if (result > 0) {
                    // this.completedTodoList[key].splice(index, 1);
                    this.getTodoItemCompltedList();
                }
            });
        }

        // 删除未完成todo
        public deleteCompletedTodoItem(key: string, index: number): void {
            let todoItemEdiable = this.completedTodoList[key][index];
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.code, todoItemEdiable.code);

            todoItemMapper.delete(neDBExample).then((number) => {
                if (number > 0) {
                    this.getTodoItemCompltedList();
                }
            });
        }
    }
</script>
<style lang="scss">
    .notify-message {
        min-width: 250px;
        height: 20px;
        border-radius: 2px;
    }
    .todo-body-title {
        height: 23px;

        .el-radio-button__inner {
            border-radius: 0;
        }
    }
    .todo-list {
        .todo-uncompleted-input {
            font-size: 14px;

            .el-textarea__inner {
                color: #000;
                font-size: 14px;
                border: none !important;
                border-bottom: 1px solid #DCDFE6 !important;
                border-radius: 0;
                background-color: transparent;
            }
        }

        .todo-uncompleted-list {
            height: calc(100vh - 50px);
            margin-top: 15px;
            overflow-y: auto;
            overflow-x: hidden;

            .todo-list-item {
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;

                float: left;
                width: 100%;
                padding: 5px;
                margin-bottom: 10px;
                position: relative;
                .todo-item-unedit {
                    float: left;
                    width: 100%;
                }
                .todo-item-oper {
                    display: none;
                    position: absolute;
                    height: 20px;
                    line-height: 20px;
                    width: 70px;
                    right: 0;
                    top: 50%; /*偏移*/
                    transform: translateY(-50%);
                    text-align: center;

                    & i {
                        padding: 2px;
                        border-radius: 50px;
                        text-align: center;
                        color: #ffffff;
                        background: rgba(32,160,255, 0.7);
                    }

                    & i:last-child {
                        margin-left: 5px;
                    }
                }

                .todo-list-item-mark {
                    display: inline-block;
                    float: left;
                    width: 3%;
                    text-align: center;

                    .todo-list-item-dot {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background: #304760;
                        /*border-radius: 50px;*/
                        vertical-align: middle;
                    }
                }

                .todo-list-item-content {
                    float: right;
                    width: 95%;
                    word-break:break-all;
                    text-align: left;
                    font-size: 14px;
                    color: #524c4c;
                    /*color: #499C54;*/
                }

                .todo-list-item-content-completed {
                    text-decoration: line-through;
                    color: #8c939d;
                }
            }
            .todo-list-item:hover {
                cursor: pointer;
                /*background: #fdfdfd;*/
                & .todo-item-oper {
                    display: inline-block;
                }
            }

        }
    }
</style>
