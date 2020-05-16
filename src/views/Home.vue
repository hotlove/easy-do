<template>
    <div class="home">
        <div class="home-nav">
            <div style="position: relative; width: 100%;">
                <close-navigation></close-navigation>
            </div>
            <span class="home-nav-item">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="35"
                           shape="square"></el-avatar>
            </span>
            <!-- 17h 20w -->
            <span class="home-nav-item home-nav-item-hover"
                  :class="{'item-icon-focus': item.default, 'home-nav-setting': item.className === 'icon-setting'}"
                  @click.prevent.stop="clickItem(item.route, index)"
                  v-for="(item, index) in navigations" :key="index">
                    <span class="iconfont item-icon" :class="item.hoverName + ' ' +item.className"></span>
            </span>
        </div>
        <div class="home-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import {Component, Vue} from 'vue-property-decorator';
    import {NavigationInter} from '@/types';
    import {Getter, Action} from 'vuex-class';
    import Music from '@/components/Music.vue';
    import CloseNavigation from '@/components/CloseNavigation.vue';
    import {SystemSetting} from '@/domain/SystemSetting';
    import {systemSettingMapper} from '@/dbutil';
    import {GET_SYSTEM_SETTING, SET_SYSTEM_SETTING} from '@/store/mutation-types';
    import {CommonUtil} from '@/common/CommonUtil';

    @Component({
        components: {
            Music,
            CloseNavigation,
        },
    })
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        @Getter(GET_SYSTEM_SETTING)
        public getSystemSetting !: SystemSetting;

        @Action(SET_SYSTEM_SETTING)
        public setSystemSetting !: Function;

        // 系统设置
        public systemSetting !: SystemSetting;

        public navigations: NavigationInter[] = [
            {
                route: 'todo-list',
                default: true,
                hoverName: 'item-icon-hover',
                className: 'icon-todo',
                tipText: 'Todo列表',
            },
            {
                route: 'note',
                default: false,
                hoverName: 'item-icon-hover',
                className: 'icon-note',
                tipText: '我的笔记',
            },
            // {
            //     route: 'sign',
            //     default: false,
            //     hoverName: 'item-icon-hover',
            //     className: 'icon-sigin',
            //     tipText: '我的打卡',
            // },
            {
                route: '',
                default: false,
                hoverName: 'item-icon-hover',
                className: 'icon-message',
                tipText: '消息列表',
            },
            {
                route: '',
                default: false,
                hoverName: 'item-icon-hover',
                className: 'icon-user',
                tipText: '好友列表',
            },
            {
                route: 'setting',
                default: false,
                hoverName: 'item-icon-hover',
                className: 'icon-setting',
                tipText: '设置',
            },
        ];

        // 声明钩子
        public mounted() {
            this.systemSettingHandler();
            this.$router.push({name: 'todo-list'}).catch((err: Error) => err);
        }

        // 处理系统设置
        public systemSettingHandler(): void {
            systemSettingMapper.find().then((systemSettingList: any) => {
                // 如果有则取出来并 存入vuex
                if (systemSettingList.length > 0) {
                    this.systemSetting = systemSettingList[0];
                    this.setSystemSetting(this.systemSetting);
                } else {
                    // 如果没有则新建一个并存入vuex 也就是第一次会用到后面基本上用不到
                    let systemSettingTemp: SystemSetting = this.getSystemSetting;
                    systemSettingTemp.code = CommonUtil.getUUID();
                    systemSettingMapper.insert(systemSettingTemp);
                    this.setSystemSetting(systemSettingTemp);
                }
            });
        }
        // 点击导航事件
        public clickItem(route: string, index: number): void {
            // 首先修改其他nav 为未选中状态并可以 hover
            this.navigations.forEach((e: NavigationInter) => {
                e.default = false;
                e.hoverName = 'item-icon-hover';
            });

            // 将目标nav修改为选中 不可hover状态
            let nav: NavigationInter = this.navigations[index];
            nav.default = true;
            nav.hoverName = '';

            this.$router.push({name: nav.route}).catch((err: Error) => err);
        }
    }
</script>
<style lang="scss">
    .home {
        width: 100%;
        height: 100%;

        /*主页面导航栏修饰*/
        .home-nav {
            float: left;
            position: relative;
            display: inline-block;
            width: 60px;
            height: 100vh;
            background: #1c7fcd;
            /*background: #505D7D;*/
            z-index: 1;
            /*box-shadow:3px 0 8px -4px #000;*/

            .item-icon-focus {
                background: #1d92eb;
                border-color: transparent;
                outline: none;
            }

            .home-nav-item {
                text-align: center;
                display: inline-block;
                width: 100%;
                height: 45px;
                line-height: 45px;
                margin-top: 10px;

                .item-icon {
                    font-size: 26px;
                    /*color: #8C8B8C;*/
                    color: #f9f9f9;
                }
            }

            .home-nav-item-hover:hover {
                cursor: pointer;
                background: #1d92eb;
            }

            .home-nav-item-hover:hover .item-icon-hover {
                color: #e4e3e4;
            }

            .home-nav-setting {
                position: absolute;
                bottom: 10px;
                left: 0;
            }
        }

        /*主页面主题修饰*/
        .home-body {
            /*padding: 25px 0 0 0;*/
            float: left;
            display: inline-block;
            height: 100vh;
            width: calc(100vw - 60px);
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
