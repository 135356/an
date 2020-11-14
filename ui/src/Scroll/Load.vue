<!--点击屏幕下拉加载更多-->
<template lang="html">
    <div>
        <slot></slot>
        <div class="content">
            <div v-if="refresh===1" class="load">
                <img class="icon" src="./assets/img/scroll_load.gif" />
            </div>
            <div v-if="refresh===-1" @click="backTop()" class="load_end">
                <div class="turn_text">{{'点击回到顶部'|_}}...</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnScrollLoad',
        props: {'fun_': Function,'reset_':Boolean|Number,'remove_':Boolean|Number},
        data() {
            return {
                stop:0, //停止
                refresh:0, //刷新状态
                frequency:0, //避免在最底部切换到另一页面时反复加载
                total_height:0, //总高度
                triggerF:function(){}, //触发器
            }
        },
        watch: {
            fun_(v)
            {
                this.triggerF=v;
            },
            /*用来重置该滚动事件，当reset_发生变化时触发*/
            reset_(v)
            {
                this.stop=0;
                this.refresh=0;
                this.total_height=0;
            },
            /*用来手动清除该滚动事件，类上*/
            remove_(v)
            {
                this.stop=v;
                this.refresh=0;
                this.total_height=0;
            }
        },
        methods: {
            /*回到顶上*/
            backTop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            /*节流函数 : 减少浏览器内存消耗*/
            throttle(ele, callback) {
                return () => {
                    if(this.stop){return }
                    // requestAnimationFrame:回调间隔 = 浏览器重绘频率
                    window.requestAnimationFrame((timestamp) => {
                        let scrollTop = window.pageYOffset || ele.scrollTop || document.body.scrollTop;
                        if (this.refresh===0 && scrollTop + ele.clientHeight >= ele.scrollHeight) { //检测是否滚动到元素底部
                            if(this.total_height<ele.scrollHeight){
                                if(this.frequency<Date.now()-2000){
                                    this.frequency=Date.now();
                                    this.total_height=ele.scrollHeight;
                                    this.refresh=1;//触发刷新
                                    callback();
                                }else{
                                    setTimeout(()=>{
                                        this.frequency=Date.now();
                                        this.total_height=ele.scrollHeight;
                                        this.refresh=1;//触发刷新
                                        callback();
                                    }, 2000);
                                }
                            }
                        }
                    });
                };
            },
            /*触发*/
            funF() {
                this.triggerF().then((res) => {
                    switch(res){
                        case -1:
                            this.refresh=-1;
                            break;
                        case 1:
                            this.refresh=0; //刷新完成
                            break;
                    }
                });
            }
        },
        created() {
            window.addEventListener('load', function () {
                window.scroll(0, 100)
            });
        },
        mounted() {
            if (this.fun_) {this.triggerF = this.fun_;}
            if(this.remove_){window.removeEventListener('scroll', this.throttle);}
            window.addEventListener('scroll', this.throttle(document.documentElement, this.funF));
        },
        destroyed() {
            window.removeEventListener('scroll', this.throttle);
        }
    }
</script>
<style lang="scss" scoped>
    .content{
        .load {
            position: fixed;
            left:0;bottom:0;
            width: 100%;
            padding-bottom:10px;
            margin: 0;
            z-index: 999;
            text-align: center;
            background: #eee;
            .icon{
                width:60px;
                height:60px;
            }
        }
        .load_end {
            position: fixed;
            left:0;bottom:0;
            width: 100%;
            height: 60px;
            line-height: 60px;
            padding-bottom:10px;
            color: #666;
            text-align: center;
            background: #eee;
        }
    }
</style>
