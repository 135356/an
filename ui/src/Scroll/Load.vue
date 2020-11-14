<!--点击屏幕下拉加载更多-->
<template lang="html">
    <div>
        <slot></slot>
        <div :style="'height:'+scroll_state.top+'px;'">
            <div v-if="!scroll_state.end&&scroll_state.load_show" class="load"
                 :style="'height:'+scroll_state.default_top+'px;'">
                <!--<div class="turn">
                  <div class="turn_1"></div>
                </div>
                <div class="turn_text">{{scroll_state.end?_('没有更多了')+'...':_('加载中')+'...'}}</div>-->
                <img class="icon" src="./assets/img/scroll_load.gif" />
            </div>
            <div v-if="scroll_state.end" @click="backTop()" class="load_end"
                 :style="'height:'+scroll_state.default_top+'px;'">
                <div class="turn_text">{{'点击回到顶部'|_}}...</div>
            </div>
        </div>
        <!--<div v-show="is_back_top" class="backTop" @click="backTop()"><i class="an1_iconfont">&#xe625;</i></div>-->
    </div>
</template>

<script>
    export default {
        name: 'AnScrollLoad',
        props: {fun_: Function, reset_: Number},
        data() {
            return {
                state: 0,
                ago_height: 0,
                is_back_top:0,
                scroll_state: {
                    load_show: false,
                    top: 0,
                    default_top: 60,
                    refresh: false,
                    end: false,
                    fun: '',
                },
            }
        },
        created() {
            window.addEventListener('load', function () {
                window.scroll(0, 100)
            });
        },
        watch: {
            fun_(v) {
                this.scroll_state.fun = v;
            },
            reset_(v) {
                this.state = false;
                this.scroll_state.end = false;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        methods: {
            /*节流函数 : 减少浏览器内存消耗*/
            throttle(ele, callback) {
                this.state = false;
                return () => {
                    if (this.state || this.scroll_state.end) {
                        return;
                    }
                    this.state = true;
                    // requestAnimationFrame:回调间隔 = 浏览器重绘频率
                    window.requestAnimationFrame((timestamp) => {
                        let scrollTop = window.pageYOffset || ele.scrollTop || document.body.scrollTop;
                        /*if(scrollTop + ele.clientHeight > 5000){
                            this.is_back_top=1;
                        }*/
                        if (!this.scroll_state.refresh && scrollTop + ele.clientHeight >= ele.scrollHeight && this.ago_height !== ele.scrollHeight) { //检测是否滚动到元素底部
                            this.ago_height = ele.scrollHeight;
                            callback();
                        } else if (this.ago_height === ele.scrollHeight) {
                            this.scroll_state.end = 1;
                        }
                        this.state = false;
                    });
                };
            },
            funF() {
                this.scroll_state.load_show = true;
                this.scroll_state.refresh = true;
                this.scroll_state.top = this.scroll_state.default_top;
                this.scroll_state.fun().then((res) => {
                    this.scroll_state.refresh = false;
                    this.scroll_state.top = 0;
                    if (res) {
                        this.scroll_state.load_show = false;
                    } else {
                        this.scroll_state.load_show = true;
                        this.scroll_state.end = true;
                    }
                });
            },
            backTop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        mounted() {
            if (this.fun_) {
                this.scroll_state.fun = this.fun_;
            }
            window.addEventListener('scroll', this.throttle(document.documentElement, this.funF));
        },
        destroyed() {
            this.scroll_state.fun='';
            window.removeEventListener('scroll', this.throttle);
        }
    }
</script>
<style scoped>
    .backTop{
        position: fixed;
        right:10px;
        bottom:10px;
        width:20px;
        height:20px;
        line-height: 20px;
        color:#fff;
        border-radius:50%;
        background:rgba(0,0,0,0.5);
    }
    .backTop .an1_iconfont{
        font-size:12px;
    }
    .load {
        position: fixed;
        width: 100%;
        bottom: 0;
        margin: 0;
        z-index: 999;
        text-align: center;
        background: #eee;
    }

    .load .icon{
        width:60px;
        height:60px;
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
        font-size:12px;
    }

    .load_end {
        position: relative;
        height: 40px;
        line-height: 40px;
        color: #666;
        text-align: center;
        background: #eee;
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
