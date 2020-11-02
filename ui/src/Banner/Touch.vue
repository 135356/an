<template>
    <div class="container" @transitionend.stop="end()" @touchstart.stop="touchStart($event)" @touchmove.stop="touchMove($event)" @touchend.stop="touchEnd()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "AnBannerTouch",
        data() {
            return {
                direction:{
                    clientX_arr:[],
                },
                move:{
                    x:0,
                    y:0,
                    state:0,
                    space:5,
                    xF:(type)=>
                    {
                        this.move.state=0;
                        this.direction.clientX_arr=[];
                        this.$emit('AnBannerTouchF', {x:type,type:'x'});
                    },
                    yF()
                    {
                        this.$emit('AnBannerTouchF', {y:type,type:'y'});
                    }
                },
            }
        },
        methods: {
            touchStart(){/*触摸控件时*/
                this.direction.clientX_arr=[];
            },
            touchMove(e){/*滑动时*/
                if (e.changedTouches.length) {
                    this.direction.clientX_arr.push(e.touches[0].clientX);
                    if(this.direction.clientX_arr.length>5){
                        if(!this.move.state){
                            this.move.state=1;
                            if(this.direction.clientX_arr[this.direction.clientX_arr.length-6] > this.direction.clientX_arr[this.direction.clientX_arr.length-1]) {
                                this.move.xF(1);
                            }else{
                                this.move.xF(0);
                            }
                        }
                    }
                }
            },
            touchEnd(){},
            end(){}
        }
    }
</script>

<style scoped>

</style>