<template>
    <div class="container" @transitionend.stop="end()" @touchstart.stop="touchStart($event)" @touchmove.stop="touchMove($event)" @touchend.stop="touchEnd($event)">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "AnBannerTouch",
        data() {
            return {
                move:{
                    x:0,//移动距离
                    y:0,//移动距离
                    scrollTop:0,
                    xF:(type)=>
                    {
                        this.$emit('AnBannerTouchF', {'x':type,'type':'x'});
                    },
                    yF(type)
                    {
                        this.$emit('AnBannerTouchF', {'y':type,'type':'y'});
                    }
                },
            }
        },
        watch: {
            elem_(v)
            {
                this.elem=v;
            }
        },
        methods: {
            touchStart(e){/*触摸控件时*/
                this.move.x=e.targetTouches[0].clientX;
                this.move.y=e.targetTouches[0].clientY;
                this.move.scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
                //document.documentElement.scrollTop = this.product_max['scrollTop1'];
            },
            touchMove(e){/*滑动时*/
                if (e.changedTouches.length) {}
            },
            touchEnd: function (e) {
                let x=this.move.x-e.changedTouches[0].clientX;
                let y=this.move.y-e.changedTouches[0].clientY;
                let scrollTop=(document.body.scrollTop||document.documentElement.scrollTop)-this.move.scrollTop;
                if(Math.abs(x)>10||Math.abs(y)>10||Math.abs(scrollTop)>10){
                    this.$emit('AnBannerTouchF', {'x':x,'y':y,'scrollTop':scrollTop});
                }
            },
            end(){}
        }
    }
</script>

<style scoped>

</style>