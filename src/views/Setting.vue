<template>
    <div class="setting-home">
        <close-navigation :height="25" :show-close="true"></close-navigation>
        <div class="setting-module setting-module-left">
            <div class="setting-item" v-for="(item, index) in settingNav">
                <span class="setting-item-content"  :class="{'setting-active-color': active === index}" @click="scrollTo(index)">{{item.label}}</span>
                <span class="setting-item-padding" :class="{'setting-active': active === index}"></span>
            </div>
        </div>
        <div class="setting-module setting-module-right page">
            <div class="setting-page">
                <el-slider v-model="capcityValue" :min="0" :max="1" :step="0.1" @change="chanageOpacity"></el-slider>
            </div>
            <div class="setting-page">

            </div><div class="setting-page">

            </div><div class="setting-page">

            </div><div class="setting-page">

            </div><div class="setting-page">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { ipcRenderer, remote } from 'electron';
    import {APP_SET_OPACITY} from '@/common/EventType';
    import CloseNavigation from '@/components/CloseNavigation.vue';

    @Component({
        components: {
            CloseNavigation,
        },
    })
    export default class Home extends Vue {

        public capcityValue: number = 0;

        public active: number = 0;

        public settingNav: any[] = [
            { label: '透明度'},
            { label: '宽高比'},
            { label: '透明度'},
            { label: '透明度'},
            { label: '透明度'},
            { label: '透明度'},
        ];

        public mounted() {
            this.capcityValue = remote.getCurrentWindow().getOpacity();
            // 监听滚动事件
            document.addEventListener("scroll", this.onScroll, true);
        }

        destroy() {
            // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
            document.removeEventListener('scroll', this.onScroll)
        }

        public getScrollTopOfBody(){
            let scrollTop = 0;
            if(typeof window.pageYOffset != 'undefined'){//pageYOffset指的是滚动条顶部到网页顶部的距离
                scrollTop = window.pageYOffset;
            }else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        {
                scrollTop = document.documentElement.scrollTop;
            }else if(typeof document.body != 'undefined'){
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }

        // 滚动监听器
        public onScroll(): void {
            console.log("开始监听...................")
            // 获取所有锚点元素
            const navContents = document.querySelectorAll('.setting-page');
            // 所有锚点元素的 offsetTop
            const offsetTopArr: any[] = [];
            navContents.forEach((item: any) => {
                offsetTopArr.push(item.offsetTop)
            });
            // 获取当前文档流的 scrollTop
            this.$nextTick(() => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                console.log("scrollTop",scrollTop)
            })
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            console.log("scrollTop1",document.documentElement.scrollTop)
            console.log("scrollTop2",document.body.scrollTop)
            let scrollTop3 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            console.log("scrollTop3",scrollTop3)
            document.documentElement.scrollTop = 100
            console.log("scrollTop", document.documentElement.scrollTop)

            // 定义当前点亮的导航下标
            console.log(scrollTop);
            console.log(offsetTopArr);
            let navIndex = 0;
            for (let n = 0; n < offsetTopArr.length; n++) {
                // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
                // 那么此时导航索引就应该是n了
                if (scrollTop >= offsetTopArr[n]) {
                    navIndex = n;
                }
            }
            this.active = navIndex;
        }

        scrollTo(index: number) {
            this.active = index;
            // 获取目标的 offsetTop
            // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
            let selector: any = document.querySelector(`.page div.setting-page:nth-child(${index + 1})`);
            let targetOffsetTop = 0;
            if (selector != null) {
                targetOffsetTop = selector.offsetTop;
            }
            // 获取当前 offsetTop
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
            const STEP = 50;
            // 判断是往下滑还是往上滑
            if (scrollTop > targetOffsetTop) {
                // 往上滑
                this.smoothUp(scrollTop, targetOffsetTop, STEP);
            } else {
                // 往下滑
                this.smoothDown(scrollTop, targetOffsetTop, STEP);
            }
        }

        // 定义往下滑函数
        public smoothDown(scrollTop: number, targetOffsetTop: number, STEP: number): void {
            // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
            if (scrollTop < targetOffsetTop) {
                // 如果和目标相差距离大于等于 STEP 就跳 STEP
                // 否则直接跳到目标点，目标是为了防止跳过了。
                if (targetOffsetTop - scrollTop >= STEP) {
                    scrollTop += STEP
                } else {
                    scrollTop = targetOffsetTop
                }
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                window.requestAnimationFrame(() => {
                    // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
                    if (scrollTop < targetOffsetTop) {
                        // 如果和目标相差距离大于等于 STEP 就跳 STEP
                        // 否则直接跳到目标点，目标是为了防止跳过了。
                        if (targetOffsetTop - scrollTop >= STEP) {
                            scrollTop += STEP
                        } else {
                            scrollTop = targetOffsetTop
                        }
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                    }
                })
            }
        }

        // 定义往上滑函数
        public smoothUp(scrollTop: number, targetOffsetTop: number, STEP: number): void {
            if (scrollTop > targetOffsetTop) {
                if (scrollTop - targetOffsetTop >= STEP) {
                    scrollTop -= STEP
                } else {
                    scrollTop = targetOffsetTop
                }
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                // requestAnimationFrame(smoothUp)
            }
        }

        public chanageOpacity(opacity: number): void {
            ipcRenderer.send(APP_SET_OPACITY, opacity);
        }
    }
</script>
<style lang="scss">
    .setting-home {
        position: relative;
        width: 100%;
        height: 100vh;
        padding: 25px 0;

        .setting-close-navigation {
            float: left;
            width: 100%;
            position: relative;
        }
        .setting-module {
            float: left;
            height: 100%;
        }
        .setting-module-left {
            width: 25%;
            text-align: right;
            padding: 10px 0 0 0;
            border-right: 1px solid silver;
            .setting-item {
                margin: 5px 0;

                .setting-item-padding {
                    display: inline-block;
                    width: 20px;
                }
                .setting-active {
                    &::after {
                        content: "";
                        position: relative;
                        display: inline-block;
                        right: 1px;
                        bottom: -2px;
                        height: 15px;
                        margin-left: 20px;
                        border: 1px solid #1d92eb;
                    }
                }
                .setting-active-color {
                    color: #1d92eb;
                }
                .setting-item-content {
                    display: inline-block;
                    cursor: pointer;
                    &:hover {
                        color: #1d92eb;
                    }
                }



            }
        }
        .setting-module-right {
            width: 70%;
            padding: 5px 20px;
            overflow-y: auto;

            .setting-page {
                width: 100%;
                height: 500px;
                border: 1px solid red;
                margin: 10px 0;
            }
        }
    }
</style>
