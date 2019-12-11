<template>
    <div>
        <mu-row class="todo-header">
            <mu-text-field v-model="todoItem"
                           full-width
                           multi-line
                           :rows="2"
                           placeholder="请输入todo内容..."></mu-text-field>
        </mu-row>
        <mu-row class="todo-body">
            <ul>
                <li v-for="(item, index) in todoList" :key="index">
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

    @Component
    export default class TodoList extends Vue {
        todoItem: string = "";
        checked: boolean = false;
        todoList: any[] = [
            {
                id: 1,
                completed: true,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            },{
                id: 1,
                completed: false,
                content: '测试得测试得测试得测试得测试得测试得测试得测试得'
            }
        ];
    }
</script>
<style lang="scss">
    .todo-header {
        height: 64px;
    }
    .todo-body {
        /*background: #3d3d3d;*/
        height: calc(100vh - 120px);
        overflow: hidden;
        overflow-y: scroll;

        ul {
            list-style:none;
            padding-left: 0px;

            li {
                margin-bottom: 10px;
            }
        }

        li:hover {
            cursor: default;
            background: #dfdfdf;
        }


        .todo-list-item {
            color: #007c1e;
            text-align: left;
            font-size: 16px;
            word-wrap:break-word;
            white-space:normal;
        }
    }
</style>
