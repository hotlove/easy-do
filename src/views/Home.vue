<template>
    <div class="home">
        <!-- <Music></Music> -->
        <mu-row class="home-header">
            <mu-col span="10" class="home-header-item"></mu-col>
            <mu-col span="2" class="home-header-item header-avatar">
                <mu-avatar class="header-item-avatar">
                    <img src="../static/avatar.png"/>
                </mu-avatar>
            </mu-col>
        </mu-row>
        <mu-row class="home-body" gutter>
            <mu-col span="5" class="home-body-item home-body-todo">
                <todo-list></todo-list>
            </mu-col>
            <mu-col span="7" class="home-body-item">
                <home-menu></home-menu>
            </mu-col>
        </mu-row>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {Component, Prop, Vue} from "vue-property-decorator";
    import HelloWorld from "@/components/HelloWorld.vue";
    import Music from "@/components/Music.vue";
    import TodoList from "@/components/TodoList.vue";
    import HomeMenu from "@/components/HomeMenu";

    @Component({
        components: {
            HelloWorld,
            Music,
            TodoList,
            HomeMenu
        }
    })
    export default class Home extends Vue {
    }
</script>
<style lang="scss">
    .home {
        width: 100%;
        height: 100%;

        /*home-header---------------*/
        .home-header {
            width: 100%;
            height: 56px;
            line-height: 56px;
            background: rgb(102, 91, 202);
            box-shadow: 0 3px 6px 3px rgb(177, 174, 174);

            .home-header-item {
                height: 100%;
                position: relative;

                .header-item-avatar {
                    /* 垂直居中avatar */
                    margin: auto;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -20px; /* 高度的一半 */
                    margin-left: -20px; /* 宽度的一半 */

                    // left: 0;
                    // right: 0;
                    // top: 0;
                    // bottom: 0;
                }
            }

            .header-avatar {
                text-align: center;
            }
        }

        /*home-body---------------*/
        .home-body {
            height: calc(100vh - 56px);
            overflow: hidden;
            padding: 20px 0px;

            .home-body-item {
                height: 100%;
            }

            .home-body-todo {
                padding: 0px 20px 0px 20px;
                text-align: center;
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>
