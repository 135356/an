<template>
    <div class="an_banner" @mouseenter="hoverEnterF()" @mouseleave="hoverLeaveF()">
        <div class="an_banner_c">
            <slot></slot>
        </div>
        <div class="an_banner_button">
            <div @click="leftF()" v-if="dom['button_left_show']" class="an_banner_button_left"><img src="./assets/img/left.png" /></div>
            <div @click="rightF()" v-if="dom['button_right_show']" class="an_banner_button_right"><img src="./assets/img/right.png" /></div>
        </div>
        <div class="an_banner_tab" v-if="dom['img_div_length']>1">
            <div v-for="(v) in dom['img_div_length']" :class="{'active':dom['tab_active_i']===v}" @click="tabF(v)"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AnBannerDiv",
    props:{'time_':Number|String},
    components:{},
    data(){
        return {
            timeout:{
                obj:null, //定时器初始为null
                time:4000, //轮播的间隔时间
            },
            banner:{
                number_tab:0, //指示灯的个数
                number_banner:0, //轮播图个数
                current_index:1, //当前索引
                width:'', //元素最大宽度
            },
            dom:{
                img_div:'',
                img_div_length:0,
                tab_active_i:1,
                button_left_show:0,
                button_right_show:0,
            }
        }
    },
    computed:{},
    methods:{
        //轮播公共方法
        play(left,current_index) {
            //1、图片移动left px；
            this.dom['img_div'].style.left = left + 'px';
            this.dom['img_div'].style.transition = 'left 1.5s';
            //2、改变指示灯颜色
            this.dom['tab_active_i']=current_index;
        },
        /*is_point最左边还是最右边，left、right*/
        playEnd(current_index,is_point) {
            //继续走临界的轮播
            this.play(-(this.banner['width'] * this.banner['current_index']),current_index);
            //在轮播的同时将距离重置
            setTimeout(()=>{
                this.dom['img_div'].style.left = -this.banner['width']*current_index + 'px';
                this.dom['img_div'].style.transition = 'left 0s';
                this.banner['current_index'] = current_index;
            }, 1500);
        },
        //自动播放
        autoPlay(time) {
            this.timeout['obj'] = setInterval(()=>{
                this.banner['current_index']++;
                //当移动到最后一张，也就是模拟的第一张
                if (this.banner['current_index'] === this.dom['img_div'].children.length - 1) {
                    //首先清除原先的定时器
                    clearInterval(this.timeout['obj']);
                    //处理临界情况
                    this.playEnd(1);
                    //继续下一次轮播
                    return this.autoPlay(time);
                } else {
                    if (this.banner['current_index'] < this.dom['img_div'].children.length - 1) {
                        this.play(-(this.banner['width'] * this.banner['current_index']), this.banner['current_index']);
                    }
                }
            }, time);
        },
        /*向左移动*/
        leftF(){
            this.banner['current_index']--;
            if (this.banner['current_index'] === 0) {
                this.playEnd(this.dom['img_div_length'],'left');
            } else {
                if(this.banner['current_index']>-1){
                    this.play(-(this.banner['width'] * this.banner['current_index']),this.banner['current_index']);
                }
            }
        },
        /*向右移动*/
        rightF(){
            this.banner['current_index']++;
            if (this.banner['current_index'] === this.dom['img_div_length']+2 - 1) {
                this.playEnd(1,'right');
            } else {
                if(this.banner['current_index']<=this.dom['img_div_length']){
                    this.play(-(this.banner['width'] * this.banner['current_index']),this.banner['current_index']);
                }
            }
        },
        //指示灯点击时
        tabF(i){
            this.dom['tab_active_i']=i;
            //点击时到达临界值
            if (i === 0 && this.banner['current_index'] === this.dom['img_div_length']) {
                this.banner['current_index']++;
                this.playEnd(1);
            }else if(i === (this.dom['img_div_length'] -1) && this.banner['current_index'] === 1) {
                this.banner['current_index']--;
                this.playEnd(this.dom['img_div_length']);
            }else {
                //设置所点击的元素class,并移动到指示灯所在图片
                this.play(-(this.banner['width'] * (i+1)),(i+1));
                this.banner['current_index'] = i+1;
            }
        },
        //鼠标悬停在轮播上时
        hoverEnterF(){
            clearInterval(this.timeout['obj']);
        },
        //鼠标摞开时启动定时器
        hoverLeaveF(){
            this.autoPlay(this.timeout['time']); //页面打开后自动开启播放
        },
    },
    watch:{},
    created(){},
    mounted(){
        this.$nextTick(() => {
            if(Object.keys(this.$slots).length){
                if(this.$slots['default']&&this.$slots['default'][0]){
                    this.dom['img_div'] = this.$slots['default'][0]['elm'];
                    if(this.$slots['default'][0]['children']){
                        this.dom['img_div_length'] = this.$slots['default'][0]['children'].length;/*根据轮播图数量 创建指示灯*/
                    }
                    if(this.dom['img_div_length']>1){
                        this.banner['width']=this.dom['img_div'].clientWidth; //获取最大宽度
                        let img={
                            first:this.dom['img_div'].firstElementChild.cloneNode(true), //第一个轮播图
                            final:this.dom['img_div'].lastElementChild.cloneNode(true), //最后一个轮播图
                        }
                        if(this.$slots['default'][0]['children'][0]['children']){/*<div><div><img /></div></div>*/
                            //this.$slots['default'][0]['elm'].style.cssText="position: relative;left: 0;width: 100%;height: 100%;display: flex;";
                        }else{/*<div><img /></div>*/
                            this.dom['img_div'].appendChild(img.first); //向后添加第一个轮播图
                            this.dom['img_div'].insertBefore(img.final,this.dom['img_div'].firstElementChild); //在指定的已有子节点之前插入节点
                            this.dom['img_div'].style.left = -(this.banner['width'])+'px'; //向左移动一个屏幕宽度
                            this.autoPlay(this.timeout['time']); //页面打开后自动开启播放
                        }
                    }else{
                        this.dom['button_left_show']=this.dom['button_right_show']=0;
                    }
                }
            }
        });
    },
}
</script>

<style lang="scss" scoped>
.an_banner{
    position:relative;
    width:100%;
    height: 100%;
    overflow:hidden;
    .an_banner_c{
        width: 99.5%;
        height:100%;
        margin:auto;
        overflow: hidden;
    }
    .an_banner_c > *{
        position: relative;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .an_banner_button{
        .an_banner_button_left,.an_banner_button_right{
            width: 30px;
            height: 30px;
            cursor: pointer;
            opacity: 0.5;
            img{
                width:100%;
                height:100%;
            }
        }
        .an_banner_button_left{
            position: absolute;
            top: 50%;left: 10px;
            transform: translate(0,-50%);
        }
        .an_banner_button_right{
            position: absolute;
            top: 50%;right: 10px;
            transform: translate(0,-50%);
        }
    }
    .an_banner_tab{
        position: absolute;
        bottom: 10px;
        z-index: 3;
        width: 100%;
        padding: 0;
        display: flex;
        justify-content: center;
        *{
            width:10px;
            height:10px;
            margin:0 5px;
            border-radius:50%;
            background:rgba(0,0,0,0.5);
        }
        *.active{
            background:rgba(255,255,255,0.8);
        }
        *:hover {
            cursor: pointer;
        }
    }
}
</style>