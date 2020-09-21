<template>
  <div class="container">
    <div class="aa1" @transitionend.stop="page.end()" @touchstart.stop="touch.touchStart($event)" @touchmove.stop="touch.touchMove($event)" @touchend.stop="touch.touchEnd()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AnBannerDiv1",
    components:{},
    data(){
      return {
        page:{
          i:0,//当前下标
          prev()
          {
          },
          next()
          {
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
              this.$emit('AnBannerDiv1F', 1);
            }else if(this.touch.right>20){
              this.$emit('AnBannerDiv1F', -1);
            }
          },
        }
      }
    },
    computed:{},
    methods:{},
    watch:{},
    created(){},
    mounted(){},
  }
</script>

<style lang="scss" scoped>
  .container{
    position:relative;
    width:100%;
    overflow:hidden;
    .aa1{
      position:relative;
    }
  }
</style>
