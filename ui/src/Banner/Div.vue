<template>
    <div class="container" v-if="page.banner_length" v-show="page.banner_weight">
        <div class="aa1" :style="'width:'+page.banner_weight+'px;left:'+page.banner_left+'px;transition: all '+page.time+'ms;'" @transitionend.stop="page.end()" @touchstart.stop="touch.touchStart($event)" @touchmove.stop="touch.touchMove($event)" @touchend.stop="touch.touchEnd()">
            <div v-for="v in page.banner_length" :style="'width:'+page.page_weight+'px;float:left;'">
                <slot :name="v"></slot>
            </div>
        </div>
        <div class="aa2">
            <span v-for="v in page.banner_length" @click.stop="page.dots(v)" :class="{'active':page.i===v-1}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnBannerDiv",
        props:{'data_':Number|String},
        components:{},
        data(){
            return {
                page:{
                    i:0,//当前下标
                    time:500,//动画时间
                    interval_time:0,//轮播一次间隔
                    banner_left:0,//左移px
                    banner_weight:0,//banner总宽度
                    banner_length:3,
                    interval:'',//定时器
                    page_weight:0,//滚动一页的宽度
                    interval_width:0,//动态滚动宽度
                    intervalF()
                    {
                        if(this.interval_time){
                            this.interval = setInterval(()=>{
                                this.next();
                            },this.interval_time);
                        }
                    },
                    prev()
                    {
                        let length=this.banner_length;
                        if(this.i===0){
                            this.i=length-1;
                            this.interval_width = this.banner_weight-this.page_weight;
                        }else if(this.i>0){
                            this.i--;
                            this.interval_width -= this.page_weight;
                        }else{
                            this.i=0;
                            this.interval_width=0;
                        }
                        this.banner_left= '-'+this.interval_width;
                    },
                    next()
                    {
                        let length=this.banner_length;
                        if(this.i===length-1){
                            this.i=0;
                            this.interval_width=0;
                        }else  if(this.i>0){
                            this.i++;
                            this.interval_width += this.page_weight;
                        }else{
                            this.i++;
                            this.interval_width = this.page_weight;
                        }
                        this.banner_left= '-'+this.interval_width;
                    },
                    end()
                    {},
                    dots(index){
                        this.i=index;
                    }
                },
                touch:{
                    left:0,
                    right:0,
                    startX:0,
                    startY:0,
                    state:0,
                    touchStart:(e)=>{/*触摸控件时*/
                        if(this.interval_time){
                            clearInterval(this.page.interval);
                        }
                        this.touch.left=0;
                        this.touch.right=0;
                        this.touch.startX = e.changedTouches[0].pageX;
                        this.touch.startY = e.changedTouches[0].pageY;
                    },
                    touchMove:(e)=>{/*滑动时*/
                        if (e.changedTouches.length) {
                            let X = e.changedTouches[0].pageX - this.touch.startX;
                            let Y = e.changedTouches[0].pageY - this.touch.startY;
                            let abs = {x:Math.abs(X),y:Math.abs(Y)};//type:X>0?'right':X<0?'left':Y>0?'bottom':Y<0?'top':''
                            if (abs.x > abs.y && X > 0) {
                                this.touch.left=0;
                                this.touch.right=abs.x;
                                if(!this.touch.state){
                                    this.touch.state=1;
                                }
                                if(abs.x>20){
                                    this.page.banner_left='-'+(this.page.interval_width-100);
                                }
                            } else if (abs.x > abs.y && X < 0) {
                                this.touch.left=abs.x;
                                this.touch.right=0;
                                if(!this.touch.state){
                                    this.touch.state=1;
                                }
                                if(abs.x>20){
                                    this.page.banner_left='-'+(this.page.interval_width+100);
                                }
                            } else if (abs.y > abs.x && Y > 0) {
                                //console.log("top 2 bottom", X, Y);
                            } else if (abs.y > abs.x && Y < 0) {
                                //console.log("bottom 2 top", X, Y);
                            } else {
                                //console.log("just touch", X, Y);
                            }
                        }
                    },
                    touchEnd:()=>{/*离开控件时*/
                        if(this.touch.left>20){
                            this.page.next();
                            this.page.intervalF();
                        }else if(this.touch.right>20){
                            this.page.prev();
                            this.page.intervalF();
                        }else{
                            this.page.intervalF();
                        }
                    },
                }
            }
        },
        computed:{},
        methods:{
            toF(infoid)
            {
                this.$An_link.to('/FrontierDetail',{'infoid':infoid});
            }
        },
        watch:{
            data_(v)
            {
                this.page.banner_length = parseInt(v);
                setTimeout(()=>{
                    this.page.page_weight = document.body.clientWidth||document.documentElement.clientWidth;
                    this.page.banner_weight = this.page.page_weight*this.page.banner_length;
                    this.page.interval_width = this.page.page_weight;
                    this.page.intervalF();
                }, 200);
            }
        },
        created(){},
        mounted(){
            if(this.data_){
                this.page.banner_length = parseInt(this.data_);
                setTimeout(()=>{
                    this.page.page_weight = document.body.clientWidth||document.documentElement.clientWidth;
                    this.page.banner_weight = this.page.page_weight*this.page.banner_length;
                    this.page.interval_width = this.page.page_weight;
                    this.page.intervalF();
                }, 200);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        position:relative;
        width:100%;
        overflow:hidden;
        .aa1{
            position:relative;
            top:0;left:1px;
            width:800px;
            z-index: 2;
        }
        .aa2{
            position:relative;
            bottom:0;left:0;
            width:100%;
            z-index: 1;
            span{
                display:inline-block;
                width:15px;
                height:5px;
                margin:0 5px;
                background:rgba(205,205,205,0.8);
            }
            span.active{
                background:#5CB0FF;
            }
        }
    }
</style>