import {ipcRenderer} from "electron";
<template>
    <div class="todo-list">
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
        <div class="todo-uncompleted-list" :style="uncompletedStyle">
            <div class="todo-list-item" v-for="(item, index) in todoItemList" :key="index">
                <div v-if="!item.edit">
                    <span class="todo-list-item-mark">
                        <el-checkbox v-model="item.completed" @change="checkboxMarkTodoCompleted(item)"></el-checkbox>
                    </span>
                    <span class="todo-list-item-content"
                          :class="item.completed ? 'todo-list-item-content-completed' : ''"
                          v-html="item.content" @click="markTodoCompleted(item)"></span>
                    <span class="todo-item-oper">
                        <i class="iconfont icon-edit" @click="editTodoItem(item)"></i>
                        <i class="iconfont icon-delete" @click="deleteTodoItem(index)"></i>
                    </span>
                </div>
                <div v-if="item.edit" class="todo-uncompleted-input">
                    <el-input type="textarea"
                              autosize
                              @input.native="heightMonitor"
                              @keyup.enter.native.prevent="confirmEditTodo(item)"
                              @keydown.native="preventEnter($event)"
                              v-model="item.content"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TodoItemEdiable} from "@/types";
    import {todoItemMapper} from "@/dbutil";
    import CommonUtil from "@/common/CommonUtil";
    import NeDBExample from "@/dbutil/NeDBExample";

    @Component
    export default class TodoList extends Vue {

        todoItem: string = ''; // 填写得内容
        todoItemList: TodoItemEdiable[] = []; // todoitem列表

        uncompletedStyle: any = { // 未完成todo列表样式 用于自动控制高度
            height: 'calc(100vh - 115px)'
        };

        // 控制修改todo列表高度值
        @Watch('uncompletedStyle')
        uncompletedMethod() {
            return {
                height: 'calc(100vh - 115px)'
            }
        }

        // 声明钩子函数
        mounted() {
            // let todoItemList = todoItemMapper.select("", {});
            // console.log(todoItemList)
        }

        // 监控输入框高度变化
        public heightMonitor(event: any): void {
            let heigthDiff: number = event.target.clientHeight + 65 + 19;
            this.uncompletedStyle.height = 'calc(100vh - ' + heigthDiff + 'px)';
        }

        // 新增todo
        public addNewTodoItem(): any  {
            // ts 好像判断 != "" 有问题
            if (this.todoItem.trim().length > 0) {
                let todoItem: TodoItemEdiable = {
                    id: 0,
                    code: CommonUtil.getUUID(),
                    content: this.todoItem,
                    completed: false,
                    createdDate: new Date(),
                    completedDate: new Date(0),
                    edit: false
                };
                // 最新的排在最上面
                this.todoItemList.unshift(todoItem);

                // 保存到本地数据库
                todoItemMapper.insert(todoItem).then((value) => {}, (err) => err);

                this.todoItem = "";
            }
        }

        // 删除todo
        public deleteTodoItem(index: number): void {
            this.todoItemList.splice(index, 1);
        }

        // 编辑tudo
        public editTodoItem(todoItem: TodoItemEdiable): void{
            todoItem.edit = true;
            this.todoItemList.filter(e => !(e.content == todoItem.content)).forEach((value, index) => {
                value.edit = false;
            })
        }

        // 确认编辑todo
        public confirmEditTodo(todoItem: TodoItemEdiable): void {
            todoItem.edit = false;
        }

        // checkbox change
        public checkboxMarkTodoCompleted(todoItem: TodoItemEdiable): void {
            this.checkAndUpateTodoItem(todoItem);
        }

        // 点击事件修改todo完成状态
        public markTodoCompleted(todoItem: TodoItemEdiable): void {
            todoItem.completed = !todoItem.completed;
            this.checkAndUpateTodoItem(todoItem);
        }

        // 检测并更新todo 完成状态
        public checkAndUpateTodoItem(todoItem: TodoItemEdiable): void {
            if (todoItem.completed) {
                todoItem.completedDate = new Date();
            } else {
                todoItem.completedDate = new Date(0);
            }
        }

        // 禁用textarea回车换行
        public preventEnter(event: KeyboardEvent): any {
            if (event.keyCode === 13) {
                event.preventDefault(); // 阻止浏览器默认换行操作
                return false
            }
        }
    }
</script>
<style lang="scss">

    .todo-list {
        .todo-uncompleted-input {
            font-size: 12px;

            .el-textarea__inner {
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
                float: left;
                width: 100%;
                padding: 5px;
                margin-bottom: 10px;
                position: relative;
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
                }

                .todo-list-item-content {
                    float: right;
                    width: 95%;
                    word-break:break-all;
                    text-align: left;
                    /*color: #499C54;*/
                }

                .todo-list-item-content-completed {
                    text-decoration: line-through;
                    color: #8c939d;
                }
            }
            .todo-list-item:hover {
                cursor: pointer;
                background: #fdfdfd;
                & .todo-item-oper {
                    display: inline-block;
                }
            }

        }
    }

</style>
