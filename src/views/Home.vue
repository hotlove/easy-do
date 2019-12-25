<template>
    <div class="home">
        <!-- <Music></Music> -->
        <div class="home-nav">
            <span class="home-nav-item">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="35"
                           shape="square"></el-avatar>
            </span>
            <!-- 17h 20w -->
            <span class="home-nav-item" @click.prevent.stop="clickItem(item.route, index)"
                  v-for="(item, index) in navigations" :key="index">
                <el-tooltip :content="item.tipText" placement="right" effect="light" :open-delay="800" popper-class="item-poptip">
                    <span class="iconfont item-icon"
                          :class="item.hoverName + ' ' +item.className + ' ' +(item.default ? 'item-icon-focus': 'item-icon-default')"></span>
                    </el-tooltip>
            </span>
        </div>
        <div class="home-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Prop, Vue} from "vue-property-decorator";
    import HelloWorld from "@/components/HelloWorld.vue";
    import Music from "@/components/Music.vue";
    import TodoList from "@/components/TodoList.vue";
    import HomeMenu from "@/components/HomeMenu.vue";
    import {NavigationInter, RequestParams} from "@/types";
    import {AxiosResponse} from "axios";
    import {Getter, Action} from "vuex-class";

    @Component({
        components: {
            HelloWorld,
            Music,
            TodoList,
            HomeMenu
        }
    })
    export default class Home extends Vue {

        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter getToken !: string;
        @Action("setToken") setToken !: Function;

        navigations: NavigationInter[] = [
            {
                route: "",
                default: false,
                hoverName: 'item-icon-hover',
                className: "icon-todo",
                tipText: 'Todo列表'
            },
            {
                route: "",
                default: false,
                hoverName: 'item-icon-hover',
                className: "icon-task",
                tipText: '任务列表'
            },
            {
                route: "",
                default: false,
                hoverName: 'item-icon-hover',
                className: "icon-project",
                tipText: '项目列表'
            },
            {
                route: "",
                default: false,
                hoverName: 'item-icon-hover',
                className: "icon-message",
                tipText: '消息列表'
            },
            {
                route: "",
                default: false,
                hoverName: 'item-icon-hover',
                className: "icon-user",
                tipText: '好友列表'
            }
        ];

        // 声明钩子
        mounted() {
            this.storeToken();
        }

        // 声明狗子
        created() {

        }

        // 计算属性
        get computedMsg() {
            return "test";
        }

        private storeToken(): void {
            this.setToken("testtoken123");
        }

        // 点击导航事件
        private clickItem(route: string, index: number): void {
            // 首先修改其他nav 为未选中状态并可以 hover
            this.navigations.forEach(e => {
                e.default = false;
                e.hoverName = "item-icon-hover";
            });

            // 将目标nav修改为选中 不可hover状态
            let nav: NavigationInter = this.navigations[index];
            nav.default = true;
            nav.hoverName = "";
        }
    }
</script>
<style lang="scss">
    .home {
        width: 100%;
        height: 100%;

        .home-nav {
            float: left;
            display: inline-block;
            width: 60px;
            height: 100vh;
            background: #26292E;

            .home-nav-item {
                text-align: center;
                display: inline-block;
                width: 100%;
                height: 35px;
                line-height: 35px;
                margin-top: 20px;

                .item-icon {
                    font-size: 26px;
                    color: #8C8B8C;
                }

                .item-icon-default {
                    color: #8C8B8C;
                }

                .item-icon-focus {
                    color: #09BB07;
                }
            }

            .home-nav-item:hover {
                cursor: pointer;
            }

            .home-nav-item:hover .item-icon-hover {
                color: #e4e3e4;
            }
        }

        .home-body {
            float: left;
            display: inline-block;
            height: 100vh;
            width: calc(100vw - 60px);
            border: 1px solid red;
        }
    }

    /*修改tip样式*/
    .item-poptip {
        height: 20px;
        text-align: center;
        line-height: 20px;
        padding: 3px !important;
        border-radius: 0 !important;
        transform-origin: 0;
        margin-left: 7px !important;

        .popper__arrow {
            display: none !important;
        }
    }
</style>
