<!--点击屏幕下拉加载更多-->
<template lang="html">
    <div>
        <slot></slot>
        <div class="content">
            <div v-if="refresh===1" class="load">
                <img class="icon" src="./assets/img/scroll_load.gif" />
            </div>
            <div v-if="show_back_top==='show'" @click="backTop()" class="load_end">
                <div class="turn_text">{{'点击回到顶部'|_}}...</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnScrollLoad',
        props: {'fun_': Function,'remove_':Boolean|Number},
        data() {
            return {
                refresh:0, //刷新状态
                run_number:0, //加载过多少次
                end_height:0, //当到达底部之后触发加载事件之后记录当时的底部的高度
                show_back_top:0, //显示回到顶部
                triggerF:function(){}, //触发器
            }
        },
        computed: {
            /*监听滚动高度*/
            an_scroll_top()
            {
                return this.$store.state.native_data.scroll_top['an_scroll_id'];
            },
        },
        watch: {
            an_scroll_top(v){
                if(this.end_height<500){
                    if(this.show_back_top==='show'&&v.top>this.end_height){this.show_back_top='hide';} //当向上滑动的时候隐藏"点击回到顶部 按钮"
                    if(this.show_back_top==='hide'&&v.top===this.end_height){this.show_back_top='show';} //当又滚动到底部的时候显示"点击回到顶部 按钮"
                }
                if (this.refresh===0 && (document.documentElement.clientHeight+1)>v.bottom) { //检测是否滚动到元素底部
                    this.refresh=1;//触发刷新
                    this.funF();
                }
            },
            fun_(v)
            {
                this.triggerF=v;
            },
            /*用来手动清除该滚动事件，类上*/
            remove_(){}
        },
        methods: {
            /*回到顶上*/
            backTop() {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
            /*触发*/
            funF() {
                if(this.refresh!==-1){
                    let refresh=-1;
                    setTimeout(()=>{
                        if(refresh===0){
                            this.refresh=0; //刷新完成
                        }else{
                            refresh=0;
                        }
                    }, 1000);
                    this.triggerF().then((res) => {
                        switch(res){
                            case -1:
                                this.refresh=-1;
                                if(this.run_number>1){
                                    this.show_back_top='show';
                                    this.end_height=this.an_scroll_top['top'];
                                }
                                break;
                            case 1:
                                this.run_number++;
                                if(refresh===0){
                                    this.refresh=0;
                                }else{
                                    refresh=0;
                                }
                                break;
                        }
                    });
                }
            }
        },
        created() {},
        mounted() {
            if (this.fun_) {this.triggerF = this.fun_;}
        },
        destroyed() {}
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
