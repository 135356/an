<template>
    <div class="container" @transitionend.stop="end()" @touchstart.stop="touchStart($event)" @touchmove.stop="touchMove($event)" @touchend.stop="touchEnd($event)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "AnBannerTouch",
        props:{},
        data() {
            return {
                /*监听方向*/
                direction:{
                    x:0,
                    y:0,
                    clientX_arr:[],
                    clientY_arr:[],
                },
                /*时时监听状态*/
                move:{
                    stateX:0,//左右状态
                    stateY:0,//上下状态
                    space:5,//间隔
                    xF:(type)=>
                    {
                        this.move.stateX=0;
                        this.direction.clientX_arr=[];
                        this.$emit('AnBannerTouchF', {'x':type,'type':'x'});
                    },
                    yF(type)
                    {
                        this.move.stateY=0;
                        this.direction.clientY_arr=[];
                        this.$emit('AnBannerTouchF', {'y':type,'type':'y'});
                    }
                },
            }
        },
        watch: {},
        methods: {
            touchStart(e){/*触摸控件时*/
                this.direction.clientX_arr=[];
                this.direction.clientY_arr=[];
            },
            touchMove(e){/*滑动时*/
                if (e.changedTouches.length) {
                    this.direction.clientX_arr.push(e.touches[0].clientX);
                    this.direction.clientY_arr.push(e.touches[0].clientY);
                    if(this.direction.clientX_arr.length>5){
                        if(!this.move.stateX){
                            this.move.stateX=1;
                            if(this.direction.clientX_arr[this.direction.clientX_arr.length-6] > this.direction.clientX_arr[this.direction.clientX_arr.length-1]) {
                                this.move.xF(1);
                            }else{
                                this.move.xF(0);
                            }
                        }
                    }
                    if(this.direction.clientY_arr.length>5){
                        if(!this.move.stateY){
                            this.move.stateY=1;
                            if(this.direction.clientY_arr[this.direction.clientY_arr.length-6] > this.direction.clientY_arr[this.direction.clientY_arr.length-1]) {
                                this.move.yF(1);
                            }else{
                                this.move.yF(0);
                            }
                        }
                    }
                }
            },
            touchEnd: function (e) {},
            end(){}
        }
    }
</script>

<style scoped>

</style>