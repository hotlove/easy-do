<template>
    <div>
        <mu-row class="todo-header">
            <mu-text-field v-model="todoItem"
                           full-width
                           multi-line
                           :rows="3"
                           placeholder="请输入todo内容回车输入..."
                           @keyup.enter.native="addTodoItem"></mu-text-field>
        </mu-row>
        <mu-row class="todo-body">
            <ul>
                <li v-for="(item, index) in todoList" :key="index" @click="completeTodo(item, index)">
                    <mu-row>
                        <mu-col span="2">
                            <mu-checkbox v-model="item.completed"></mu-checkbox>
                        </mu-col>
                        <mu-col span="10">
                            <div class="todo-list-item">
                                {{ item.content }}
                            </div>
                        </mu-col>
                    </mu-row>
                </li>
            </ul>
        </mu-row>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    interface TodoItemObject {
      id: number;
      content: string;
      completed: boolean;
    }

    @Component
    export default class TodoList extends Vue {
        todoItem: string = "";
        checked: boolean = false;
        todoList: TodoItemObject[] = [];

        addTodoItem() {
          let todoItem: TodoItemObject = {
            id: 1,
            content: this.todoItem,
            completed: false
          }

          this.todoList.push(todoItem);
          this.todoItem = "";
        }

        completeTodo(todoItem: TodoItemObject, index: number) {
            todoItem.completed = !todoItem.completed;
        }
        
    }
</script>
<style lang="scss">
    .todo-header {
        height: 72px;
    }
    .todo-body {
        /*background: #3d3d3d;*/
        height: calc(100vh - 138px);
        overflow: hidden;
        overflow-y: scroll;
        margin-top: 25px;

        ul {
            list-style:none;
            padding-left: 0px;
            width: 100%;
            li {
                display: block;
                margin-bottom: 10px;
            }
        }

        li:hover {
            cursor: pointer;
            // background: #dfdfdf;
        }


        .todo-list-item {
            color: #007c1e;
            text-align: left;
            font-size: 16px;
            /*word-wrap:break-word;*/
            /*white-space:normal;*/
        }
    }
</style>
