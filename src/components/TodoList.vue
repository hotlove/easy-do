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
                <span class="todo-list-item-mark">
                    <el-checkbox v-model="item.completed" @change="checkboxMarkTodoCompleted(item)"></el-checkbox>
                </span>
                <span class="todo-list-item-content" v-html="item.content" @click="markTodoCompleted(item)"></span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {TodoItem} from "@/types";

    @Component
    export default class TodoList extends Vue {

        todoItem: string = ''; // 填写得内容
        todoItemList: TodoItem[] = []; // todoitem列表

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

        // 监控输入框高度变化
        public heightMonitor(event: any): void {
            let heigthDiff: number = event.target.clientHeight + 65 + 19;
            this.uncompletedStyle.height = 'calc(100vh - ' + heigthDiff + 'px)';
        }

        // 新增todo
        public addNewTodoItem(): any  {
            // ts 好像判断 != "" 有问题
            if (this.todoItem.trim().length > 0) {
                let todoItem: TodoItem = {
                    content: this.todoItem,
                    completed: false,
                    createdDate: new Date(),
                    completedDate: new Date(0)
                };

                // 最新的排在最上面
                this.todoItemList.unshift(todoItem);
                this.todoItem = "";
            }
        }

        // checkbox change
        public checkboxMarkTodoCompleted(todoItem: TodoItem): void {
            this.checkAndUpateTodoItem(todoItem);
        }

        // 点击事件修改todo完成状态
        public markTodoCompleted(todoItem: TodoItem): void {
            todoItem.completed = !todoItem.completed;
            this.checkAndUpateTodoItem(todoItem);
        }

        // 检测并更新todo 完成状态
        public checkAndUpateTodoItem(todoItem: TodoItem): void {
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
                /*border: 1px solid red;*/
                float: left;
                width: 100%;
                padding: 5px;
                margin-bottom: 10px;
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
            }
            .todo-list-item:hover {
                cursor: pointer;
                background: #fdfdfd;
                /*box-shadow: 3px 5px 3px #a5a5a5;*/
                /*border-radius: 3px;*/
            }

        }
    }

</style>