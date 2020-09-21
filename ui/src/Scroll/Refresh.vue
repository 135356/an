<!--点击屏幕下拉刷新-->
<template>
    <div @touchstart.stop="touchStart($event)" @touchmove.stop="touchMove($event)" @touchend.stop="touchEnd()">
        <div class="load"  :style="'height:'+touch_div.top+'px;'">
            <div v-if="touch_state.load_show" :style="'height:'+touch_div.default_top+'px;'">
                <!--<div class="turn">
                  <div class="turn_1"></div>
                </div>
                <div class="turn_text">{{'加载中'|_}}...</div>-->
                <img class="icon" src="./assets/img/scroll_load.gif"/>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'AnScrollRefresh',
        props: {fun_: Function},
        data() {
            return {
                touch_state: {
                    state: 1, // 显示1:下拉可以刷新, 2:松开立即刷新, 3:正在刷新数据中...
                    load_show: false,
                    down: false,
                    refresh: false,
                },
                touch_div: {
                    top: 0,
                    default_top: 60,
                    y: 0,
                }
            }
        },
        methods: {
            /*触摸控件时*/
            touchStart(e) {
                this.touch_div.y = e.targetTouches[0].pageY
            },

            /*滑动时*/
            touchMove(e) {
                let y = e.targetTouches[0].pageY;
                let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // safari 获取scrollTop用window.pageYOffset
                let pull_top = 0;
                if (y > this.touch_div.y) {
                    this.touch_state.down = true;
                    if (top === 0 && !this.touch_state.refresh) {
                        let diff = y - this.touch_div.y - top;
                        pull_top = Math.pow(diff, 0.8) + (this.touch_state.state === 3 ? top : 0);
                        if (pull_top >= this.touch_div.default_top) {
                            this.touch_div.top = this.touch_div.default_top;
                            this.touch_state.state = 2
                            //e.preventDefault(); //通过调用该方法，可以阻止提交表单
                        } else {
                            this.touch_state.state = 1
                            //e.preventDefault();
                        }
                    }
                } else {
                    this.touch_state.down = false;
                    this.touch_state.state = 1;
                }
            },

            /*离开控件时*/
            touchEnd() {
                if (this.touch_state.down && !this.touch_state.refresh) {
                    if (this.touch_state.state === 2) {
                        // do refresh
                        this.touch_state.refresh = true;
                        this.touch_state.load_show = true;
                        this.fun_().then(() => {
                            this.touch_state.state = 3;
                            this.touch_state.load_show = false;
                            this.touch_state.refresh = false;
                            this.touch_state.down = false;
                            this.touch_state.state = 1;
                            this.touch_div.top = 0;
                        });
                    } else {
                        // cancel refresh
                        this.touch_state.refresh = false;
                        this.touch_state.down = false;
                        this.touch_state.state = 1;
                        this.touch_div.top = 0;
                    }
                }
            },
        }
    }
</script>
<style scoped>
    .load {
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        margin: 0;
        z-index: 999;
        text-align: center;
        background: #eee;
    }

    .load .icon {
        width: 60px;
        height: 60px;
    }

    .load .turn {
        width: 30px;
        height: 30px;
        margin: 3px auto;
        overflow: hidden;
        border-radius: 15px;
        border: dashed 1px #ff7800;
        animation: turn 2s linear infinite;
    }

    .load .turn_1 {
        width: 101%;
        height: 1%;
        border-radius: 5px 12px 1px;
        background: #ff7800;
        animation: turn1 3s linear infinite;
    }

    .load .turn_text {
        font-size: 2rem;
    }

    @keyframes turn {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(1turn);
        }
    }

    @keyframes turn1 {
        0% {
            height: 2%;
        }
        100% {
            height: 100%;
        }
    }
</style>
