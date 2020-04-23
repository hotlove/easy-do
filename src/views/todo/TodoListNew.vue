<template>
    <div>
        <!--内容标题 用于条件控制-->
        <div class="todo-body-content-list">
            <div class="todo-uncompleted todo-container">
                <!-- to-do未完成列表页 -->
                <div class="todo-list" @click="updateToItemEdit($event)">
                    <!-- 头部数据框 -->
                    <div class="todo-uncompleted-input">
                        <el-input type="textarea"
                                  ref="todoInput"
                                  autosize
                                  placeholder="请输入内容"
                                  @input.native="heightMonitor"
                                  @keyup.enter.native.prevent="addNewTodoItem"
                                  @keydown.native="preventEnter($event)"
                                  v-model="todoItem"/>
                    </div>

                    <!-- 列表 -->
                    <div class="todo-uncompleted-list" :style="uncompletedStyle">
                        <!-- todoitem 列表块 -->
                        <div class="todo-list-item" v-for="(item, index) in todoItemList" :key="index">
                            <!-- todoitem未编辑 -->
                            <div v-if="!item.edit" class="todo-item-unedit">
                                <!-- todoitemdot -->
                                <span class="todo-list-item-mark">
                                    <span class="todo-list-item-dot"></span>
                                </span>
                                <!-- todoitem内容 -->
                                <span class="todo-list-item-content"
                                      v-html="item.content" @click="editTodoItem(item)"></span>
                                <!-- todoitem操作 -->
                                <span class="todo-item-oper">
                                    <i class="iconfont icon-check" @click="markTodoCompleted(item, index)"></i>
                                    <i class="iconfont icon-minimum" @click="deleteTodoItem(index)"></i>
                                </span>
                            </div>
                            <!-- todoitem编辑 -->
                            <div v-if="item.edit" class="todo-uncompleted-input">
                                <el-input type="textarea"
                                          autosize
                                          @input.native="heightMonitor"
                                          @keyup.enter.native.prevent="confirmEditTodo(item)"
                                          @keydown.native="preventEnter($event)"
                                          v-model="item.tempContent"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {TodoItem, TodoItemEdiable, TodoItemProperty} from '@/domain/TodoItem';
    import {todoItemMapper} from '@/dbutil';
    import {CommonUtil} from '@/common/CommonUtil';
    import {NeDBExample} from '@/dbutil/nedbutil/NeDBExample';

    @Component
    export default class TodoListNew extends Vue {

        private todoItem: string = ''; // 填写得内容

        private todoItemList: TodoItemEdiable[] = []; // todoitem列表

        private uncompletedStyle: any = { // 未完成todo列表样式 用于自动控制高度
            height: 'calc(100vh - 115px)',
        };

        @Watch('$route')
        public routerMonitor() {
            this.getTodoItemList();
        }

        // 声明钩子函数
        public mounted() {
            this.getTodoItemList();
        }

        // 获取todoitemList
        public getTodoItemList(): void {
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.completed, false);

            todoItemMapper.find(neDBExample).then((todoItemList: any) => {
                if (CommonUtil.collectionNotEmpty(todoItemList)){
                    this.todoItemList = todoItemList.sort((a: TodoItemEdiable, b: TodoItemEdiable) => a.createdDate < b.createdDate);
                }
            });
        }

        // 新增todo
        public addNewTodoItem(): any {
            // ts 好像判断 != "" 有问题
            if (this.todoItem.trim().length > 0) {
                let todoItem: TodoItemEdiable = {
                    id: 0,
                    code: CommonUtil.getUUID(),
                    content: this.todoItem,
                    completed: false,
                    createdDate: new Date(),
                    completedDate: new Date(0),
                    edit: false,
                    tempContent: '',
                };
                // 最新的排在最上面
                this.todoItemList.unshift(todoItem);
                // 保存到本地数据库
                todoItemMapper.insert(todoItem).then((value) => {}, (err) => err);
                this.todoItem = '';
            }
        }

        // 删除todo
        public deleteTodoItem(index: number): void {
            let todoItemEdiable = this.todoItemList[index];
            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.code, todoItemEdiable.code);

            todoItemMapper.delete(neDBExample).then((number) => {
                if (number > 0) {
                    this.getTodoItemList();
                }
            });
        }

        // 编辑tudo
        public editTodoItem(todoItem: TodoItemEdiable): void {
            todoItem.edit = true;
            todoItem.tempContent = todoItem.content;
            this.editTodoItemToUnEditByCode(todoItem.code);
        }

        // 确认编辑todo
        public confirmEditTodo(todoItem: TodoItemEdiable): void {
            todoItem.edit = false;

            if (todoItem.content !== todoItem.tempContent) {
                let oldContent = todoItem.content;
                todoItem.content = todoItem.tempContent;

                let example = new NeDBExample();
                example.createCriteria().eq(TodoItemProperty.code, todoItem.code);
                todoItemMapper.update(example, todoItem).then((number) => {
                    if (number < 1) {
                        todoItem.content = oldContent;
                        this.$message({
                            message: '修改todo信息失败',
                            type: 'error',
                            duration: 3000,
                            showClose: true,
                            customClass: 'notify-message',
                        });
                    }
                }).catch((err: Error) => {
                    this.$message({
                        message: '修改todo信息失败',
                        type: 'error',
                        duration: 3000,
                        showClose: true,
                        customClass: 'notify-message',
                    });
                });
            }
        }

        // 编辑todoitem列表 为未编辑状态
        public editTodoItemToUnEditByCode(todoCode: string = ''): void {
            this.todoItemList.filter((e: TodoItemEdiable) => !(e.code === todoCode)).forEach((value, index) => {
                value.edit = false;
            });
        }

        // 点击事件修改todo完成状态
        public markTodoCompleted(todoItem: TodoItemEdiable, index: number): void {
            todoItem.completed = !todoItem.completed;
            this.checkAndUpateTodoItem(todoItem);

            let neDBExample = new NeDBExample();
            neDBExample.createCriteria().eq(TodoItemProperty.code, todoItem.code);

            todoItemMapper.update(neDBExample, todoItem).then( result => {
                if (result > 0) {
                    this.todoItemList.splice(index, 1);
                }
            });
        }

        // 检测并更新todo 完成状态
        public checkAndUpateTodoItem(todoItem: TodoItemEdiable): void {
            if (todoItem.completed) {
                todoItem.completedDate = new Date();
            } else {
                todoItem.completedDate = new Date(0);
            }
        }

        // 处理点击空白处 todoitem列表修改为未编辑状态
        public updateToItemEdit(event: any): void {
            if (event.target.className === 'todo-uncompleted-list') {
                this.editTodoItemToUnEditByCode();
            }
        }

        // 监控输入框高度变化
        public heightMonitor(event: any): void {
            let heigthDiff: number = event.target.clientHeight + 65 + 19;
            this.uncompletedStyle.height = 'calc(100vh - ' + heigthDiff + 'px)';
        }

        // 禁用textarea回车换行
        public preventEnter(event: KeyboardEvent): any {
            if (event.keyCode === 13) {
                event.preventDefault(); // 阻止浏览器默认换行操作
                return false;
            }
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
