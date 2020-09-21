<template>
    <div class="container" v-if="banner">
        <div class="aa1" :style="'width:'+page.banner_weight+'px;left:'+page.banner_left+'px;transition: all '+page.time+'ms;'" @transitionend="page.end()" @touchstart="touch.touchStart($event)" @touchmove="touch.touchMove($event)" @touchend="touch.touchEnd()">
            <div class="bb1" v-for="v in banner" @click="$An2_Link.to('/NewsInfo',{'infoid':v.infoid})">
                <div v-if="v.content">{{v.content}}</div>
                <img v-if="v.img" :src="v.img" />
            </div>
        </div>
        <div class="aa2">
            <span v-for="v in banner.length" @click="page.dots(v)" :class="{'active':page.i===v-1}"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnBannerImage",
        props:{'data_':Array},
        components:{},
        data(){
            return {
                banner:[],
                page:{
                    i:0,//当前下标
                    time:500,//动画时间
                    interval_time:4000,//轮播一次间隔
                    banner_left:0,//左移px
                    banner_weight:0,//banner总宽度
                    interval:'',//定时器
                    page_weight:0,//滚动一页的宽度
                    interval_width:0,//动态滚动宽度
                    intervalF()
                    {
                        this.interval = setInterval(()=>{
                            this.next();
                        },this.interval_time);
                    },
                    prev(length)
                    {
                        if(this.i===0){
                            this.i=length-1;
                            this.interval_width = this.banner_weight-this.page_weight;
                        }else{
                            this.i--;
                            this.interval_width -= this.page_weight;
                        }
                        if(this.banner_weight<=this.interval_width){
                            this.i=0;
                            this.interval_width=0;
                        }
                        this.banner_left= '-'+this.interval_width;
                    },
                    next(left)
                    {
                        if(left){
                            //console.log(left);
                            //this.banner_left= '-'+left;
                        }else{
                            this.i++;
                            if(this.banner_left===0){
                                this.interval_width = this.page_weight;
                            }else{
                                this.interval_width += this.page_weight;
                            }
                            if(this.banner_weight<=this.interval_width){
                                this.i=0;
                                this.interval_width=0;
                            }
                            this.banner_left= '-'+this.interval_width;
                        }
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
                        clearInterval(this.page.interval);
                        this.touch.startX = e.changedTouches[0].pageX;
                        this.touch.startY = e.changedTouches[0].pageY;
                    },
                    touchMove:(e)=>{/*滑动时*/
                        if (e.changedTouches.length) {
                            let X = e.changedTouches[0].pageX - this.touch.startX;
                            let Y = e.changedTouches[0].pageY - this.touch.startY;
                            if (Math.abs(X) > Math.abs(Y) && X > 0) {
                                this.touch.left=0;
                                this.touch.right=1;
                                if(!this.touch.state&&Math.abs(X)>160){
                                    this.touch.state=1;
                                    this.page.next();
                                }else if(Math.abs(X)>15){
                                    this.page.banner_left='-'+(this.page.interval_width-160);
                                }
                            } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                                this.touch.left=1;
                                this.touch.right=0;
                                if(!this.touch.state&&Math.abs(X)>160){
                                    this.touch.state=1;
                                    this.page.prev();
                                }else if(Math.abs(X)>15){
                                    this.page.banner_left='-'+(this.page.interval_width+160);
                                }
                            } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                                //console.log("top 2 bottom", X, Y);
                            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                                //console.log("bottom 2 top", X, Y);
                            } else {
                                //console.log("just touch", X, Y);
                            }
                        }
                    },
                    touchEnd:()=>{/*离开控件时*/
                        if(this.touch.left){
                            this.page.next();
                            this.page.intervalF();
                        }else if(this.touch.right){
                            this.page.prev(this.banner.length);
                            this.page.intervalF();
                        }else{
                            this.page.intervalF();
                        }
                    },
                }
            }
        },
        computed:{},
        methods:{},
        watch:{},
        created(){},
        mounted(){
            if(this.data_){
                this.banner = this.data_;
                this.page.page_weight = document.body.clientWidth;
                this.page.banner_weight = this.page.page_weight*this.banner.length;
                this.page.interval_width = this.page.page_weight;
                this.page.intervalF();
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        position:relative;
        width:100%;
        height:212px;
        overflow:hidden;
        .aa1{
            position:absolute;
            top:0;left:1px;
            width:1000px;
            height:100%;
            .bb1{
                position:relative;
                top:0;left:0;
                width:100vw;
                height:100%;
                float:left;
                div,img{
                    position:absolute;
                    top:0;left:0;
                    width:100%;
                    height:100%;
                    color:#fff;
                    text-align: center;
                    object-fit: cover;
                }
                div{
                    z-index: 1;
                    height:28px;
                    line-height: 28px;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                    background:rgba(185,8,10,0.9);
                }
            }
        }
        .aa2{
            position:absolute;
            bottom:0;left:0;
            width:100%;
            z-index: 1;
            span{
                display:inline-block;
                width:10px;
                height:10px;
                margin:0 5px;
                border-radius:50%;
                background:rgba(0,0,0,0.8);
            }
            span.active{
                background:rgba(168,168,128,0.6);
            }
        }
    }
</style>