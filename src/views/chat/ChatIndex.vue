<template>
    <div style="float: left">
        <el-button @click="initWebSocket(8088)">建立连接</el-button>
        <el-button @click="websocketsend('测试得')">发送消息</el-button>
        <el-button @click="closeWs">关闭连接</el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Home extends Vue {
        // @Getter @Action 在vuex-class 包内
        // 这里使用 ！ 是说明 属性不会为undefined 否则需要进行初始化操作
        // @Getter
        // public getToken !: string;
        //
        // @Action('setToken')
        // public setToken !: Function;
        private websock !: WebSocket;
        private wsHost: string = "127.0.0.1";
        private wsPath: string = "/websocket";
        private times: number = 0;
        private connectState: number = 0;

        public mounted() {
            // 初始化websocket
            // this.initWebSocket(8088);
        }

        public initWebSocket(port: number): void {
            this.times++;
            let webUri: string = "ws://" + this.wsHost + ":" + port + this.wsPath;
            this.websock = new WebSocket(webUri);

            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        }

        //连接建立之后执行send方法发送数据
        public websocketonopen(e: any) {
            console.log(e);
        }

        //连接建立失败重连
        public websocketonerror() {
            if (this.times <= 5) {
                this.initWebSocket(8088);
            }
        }

        //数据接收
        public websocketonmessage(msg: any){
            console.log(msg)
            // const redata = JSON.parse(e.data);
        }

        // 发送数据
        public websocketsend(msg: string){//数据发送
            if (this.websock.readyState === 1) {
                this.websock.send(JSON.stringify(msg));
            }else{
                //do something
                console.log(this.websock.readyState)
            }
        }
        // 连接断开
        public websocketclose(e: any){  //关闭
            console.log('断开连接',e);
        }

        public closeWs() {
            this.websock.close();
        }
    }
</script>
<style lang="scss">
</style>
