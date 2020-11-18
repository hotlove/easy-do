<template>
    <div style="float: left">
        <el-button @click="initWebSocket(9900)">建立连接</el-button>
        <el-button @click="websocketsend('测试得')">发送消息</el-button>
        <el-button @click="closeWs">关闭连接</el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {request} from "@/http";
    import {RequestParams} from "@/types";

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
        private wsPath: string = "/bdsaas/websocket/call";

        private token: string = "";

        private times: number = 0; // 报错重试次数
        private connectState: number = 0; // 连接状态 0 未连接 1已连接

        private lastTime: number = new Date().valueOf(); // 心跳包发送时间

        private heartBeatInterval: any = null;

        private HEART_BEAT: string = "HeartBeat";

        public mounted() {
            // 初始化websocket
            // this.initWebSocket(8088);
            this.login();
        }

        public login(): void {
            let url = "http://127.0.0.1:9900/bdsaas/ajax/main/login.do";
            let param: RequestParams = {
                userName: "13905607377",
                passWord: "111111",
                auto: "2",
                terminaltype: "WEB"
            };

            request.post(url, param).then((response: any) => {
                let data = response.data;
                let info = data.data;
                console.log(info);
                let {credential} = data;
                this.token = credential.token;
                console.log("token=" + this.token);

                this.initWebSocket(9900, this.token);
            })
        }

        public initWebSocket(port: number, token: string): void {
            this.times++;
            let webUri: string = "ws://" + this.wsHost + ":" + port + this.wsPath+"?token="+token;
            this.websock = new WebSocket(webUri);

            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        }

        //连接建立之后执行send方法发送数据
        public websocketonopen(e: any) {
            this.connectState = 1; // 表示已经连接了

            this.heartBeatInterval = setInterval(() => {
                console.log('send - ' + new Date().valueOf());
                if (this.websock.readyState === WebSocket.OPEN) {
                    this.websock.send("HeartBeat");
                    this.lastTime = new Date().valueOf(); // 记录这次发送时间
                }
            }, 4000); // 每隔4s发送一个心跳包
            console.log(e);
        }

        //连接建立失败重连
        public websocketonerror() {
            // 连接报错尝试连接5次
            if (this.times <= 5) {
                this.initWebSocket(9900, this.token);
            }
        }

        //数据接收
        public websocketonmessage(messageEvent: MessageEvent){
            console.log(messageEvent)
            let data = messageEvent.data;
            console.log(data)

            if (data === this.HEART_BEAT) {
                let nowDate = new Date().valueOf();
                console.log(this.lastTime)
                console.log(nowDate)
                console.log(nowDate - this.lastTime)
                if ((nowDate - this.lastTime) > 8000) {
                    // 说明服务器在大于8s时间内没心跳过来，服务器可能gg了 关闭连接
                    this.websock.close();
               }
            } else {
                this.messageHandler(data);
            }
        }
        // 普通消息处理
        public messageHandler(data: string) {

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
            clearInterval(this.heartBeatInterval);
        }

        public closeWs() {
            this.websock.close();
        }
    }
</script>
<style lang="scss">
</style>
