<template>
    <div>
        <div>
            <slot></slot>
        </div>
        <div id="load" v-if="show">
            <!--顶部进度条-->
            <div v-if="model1.show" class="model1">
                <div :class="{'style1':!model1.state,'style2':model1.state}"></div>
            </div>
            <!--转圈圈-->
            <div v-if="model2.show" class="model2">
                <img src="./assets/img/load.gif"/>
            </div>
            <!--引导广告-->
            <div v-if="model3.show" class="model3">
                <div @click="hiddenF()" class="time">{{model3.time}}</div>
                <img :src="model3.img" @error="$An.imgError()" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "AnLoadStart",
        data() {
            return {
                show: 0,
                load_model: 2,
                is_route:0,
                model1: {//进度条
                    show: 0,
                    state: 0,
                    request: (number) => {//发起请求时触发
                        if (!this.show) {
                            this.show = 1;
                        }
                    },
                    response: () => {//请求完成时触发
                        this.model1.state = 1;
                        setTimeout(() => {
                            if (this.show) {
                                this.show = 0;
                            }
                        }, 600);
                    }
                },
                model2: {//转圈圈
                    show: 0,
                    request: (number) => {
                        if (!this.show) {
                            this.show = 1;
                        }
                    },
                    response: () => {
                        if (this.show) {
                            this.show = 0;
                        }
                    }
                },
                model3: {//引导广告
                    show: 0,
                    time: 3,
                    state: 1,
                    inter: {},
                    img: '',
                    timeF(this_) {
                        this_.show = 1;
                        let ipcode = this_.$An_link.get('ipcode');
                        if (ipcode && ipcode.toLowerCase() == 'cn') {
                            this.img = require('./assets/img/start_cn.jpg');
                        } else {
                            this.img = require('./assets/img/start_en.jpg');
                        }
                        //localStorage.getItem('load_img')==1?this.state=2:this.state=1;
                        //localStorage.setItem('load_img', this.state);
                        this.inter = setInterval(() => {
                            if (!--this.time) {
                                this_.typeF();
                                this_.show = 0;
                                clearInterval(this.inter);
                            }
                        }, 1000);
                    }
                },
                typeF()
                {
                    switch (this.load_model) {
                        case 1://进度条
                            this.model1.show = 1;
                            this.model2.show = 0;
                            this.model3.show = 0;
                            this.$An_data.request(this.model1.request);
                            this.$An_data.response(this.model1.response);
                            break;
                        case 2://转圈圈
                            this.model1.show = 0;
                            this.model2.show = 1;
                            this.model3.show = 0;
                            this.$An_data.request(this.model2.request);
                            this.$An_data.response(this.model2.response);
                            setTimeout(()=>{
                                this.model2.response();
                            }, 2000); //转圈圈最大持续时长为2秒，避免遮挡用户
                            break;
                        case 3://引导广告
                            this.model1.show = 0;
                            this.model2.show = 0;
                            this.model3.show = 1;
                            this.model3.timeF(this);
                            break;
                    }
                },
                hiddenF() {
                    this.show = 0;
                },
            }
        },
        computed: {},
        watch: {
            $route(to, from) {
                this.is_route=1;
                this.typeF();
            }
        },
        created() {
            this.load_model = this.$An_data.load.model;
            if(this.$route.name==='Home'){
                if(!this.is_route&&!this.$An_data.getLocal_('reload_is')){
                    this.model1.show = 0;
                    this.model2.show = 0;
                    this.model3.show = 1;
                    this.model3.timeF(this);
                }else{
                    this.typeF();
                }
            }else{
                this.typeF();
            }
        }
    }
</script>

<style scoped>
    #load {
        position:relative;
        z-index: 9999;
    }

    #load .model1 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #fff;
    }

    #load .model1 div {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(0, 0, 255, 0.5);
    }

    #load .model1 .style1 {
        animation: width1 35s;
        animation-fill-mode: forwards;
    }

    #load .model1 .style2 {
        animation: width100 500ms;
        animation-fill-mode: forwards;
    }

    #load .model2 {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 120px;
        height: 120px;
        display: flex;
        transform: translate(-50%, -50%);
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.8);
    }

    #load .model2 img {
        width: 80%;
        height: auto;
        margin: auto;
    }

    #load .model3 {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100vh;

    }

    #load .model3 img {
        height: 100%;
        object-position: center;
    }

    #load .model3 .time {
        position: absolute;
        top: 40px;
        right: 10px;
        color: #aaa;
        width: 46px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.6);
    }

    @keyframes width1 {
        0% {
            width: 1%;
        }
        40% {
            width: 40%;
        }
        60% {
            width: 58%;
        }
        80% {
            width: 70%;
        }
        84% {
            width: 76%;
        }
        88% {
            width: 82%;
        }
        92% {
            width: 88%;
        }
        96% {
            width: 94%;
        }
        100% {
            width: 99%;
        }
    }

    @keyframes width100 {
        0% {
            width: 50%;
        }
        100% {
            width: 100%;
        }
    }
</style>
