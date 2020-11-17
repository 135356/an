<template>
    <div class="content">
        <form action="" @submit.prevent="submitF()">
        <table class="aa1" :style="style_">
            <tr>
                <td class="icon" @click="toF()">
                    <div class="aa1"><img src="./assets/img/search.png" /></div>
                </td>
                <td class="input">
                    <div class="aa1">
                        <input ref="inputs" type="text" @focus="focusF()" @blur="blurF()" v-model="text" :placeholder="placeholder" />
                    </div>
                </td>
                <td v-if="text" class="x" @click="closeF()">
                    <i class="an1_iconfont">&#xe63a;</i>
                </td>
            </tr>
        </table>
        </form>
        <div v-if="show&&(cache_text||cache_text_arr)" class="aa2">
            <ul v-if="cache_text_arr.length>0">
                <li v-for="(v,i) in cache_text_arr">
                    <i class="time an1_iconfont">&#xe64b;</i>
                    <div @click="selectArrF(i)" class="aaa2">{{v}}</div>
                    <i @click="deleteCacheF(i)" class="x an1_iconfont">&#xe61b;</i>
                </li>
            </ul>
            <ul v-else-if="cache_text">
                <li>
                    <i class="time an1_iconfont">&#xe64b;</i>
                    <div @click="selectTextF(cache_text)" class="aaa2">{{cache_text}}</div>
                    <i @click="deleteCacheF()" class="x an1_iconfont">&#xe61b;</i>
                </li>
            </ul>
        </div>
        <div v-if="show&&(cache_text||cache_text_arr)" @click="closeF()" class="mask"></div>
    </div>
</template>

<script>
    export default {
        name: "AnSearch",
        props:{'show_':Boolean|Number,'style_':String,'data_':String,'is_focus_':Boolean|Number,'placeholder_':String},
        data() {
            return {
                show:this.show_||0,
                focus:false,//聚焦状态
                text:this.data_||'',
                cache_text:'',
                cache_text_arr:[],
                placeholder:this.placeholder_||'',
            }
        },
        watch:{
            show_(v)
            {
                this.show=v;
                this.$emit('searchF',{'show':this.show});
            },
            data_(v)
            {
                this.text=v;
            },
            text(v)
            {
                if(v){
                    if(this.cache_text||this.cache_text_arr.length){
                        this.show = true;
                    }
                }else{
                    this.show = false;
                }
            }
        },
        methods:{
            /*打开该页面时让input自动聚焦,回调*/
            autoFocusF()
            {
                this.$nextTick((x) => {
                    this.$refs.inputs.focus();
                })
            },
            focusF()
            {
                this.getStorage();
                this.focus=1;
                if(this.cache_text||this.cache_text_arr.length){
                    this.show = true;
                }
            },
            blurF()
            {
                if(this.focus){
                    this.focus=0;
                }else{
                    setTimeout(()=>{
                        this.show = false;
                    }, 1000);
                }
                this.$emit('searchF',{'show':this.show,'show1':1});
            },
            toF()
            {
                this.submitF();
            },
            selectArrF(i)
            {
                this.show = false;
                this.text=this.cache_text_arr[i];
            },
            selectTextF(v)
            {
                this.show = false;
                this.text=v;
            },
            closeF()
            {
                this.text='';
                this.show = false;
                this.$emit('searchF',{'show':this.show});
            },
            getStorage()
            {
                this.$An_data.getLocal('searchAlert').then(res=>{
                    if(res){
                        if(res.constructor==String){
                            this.cache_text = res;
                            this.cache_text_arr = [];
                        }else if(res.constructor==Array){
                            this.cache_text = '';
                            this.cache_text_arr = res;
                        }else{
                            this.cache_text = '';
                            this.cache_text_arr = [];
                        }
                    }else{
                        this.cache_text = '';
                        this.cache_text_arr = [];
                    }
                    if(!this.cache_text&&!this.cache_text_arr.length){
                        this.show = false;
                    }
                });
            },
            deleteCacheF(i)
            {
                this.$An_data.deleteLocal('searchAlert',i).then(()=>{
                    this.getStorage();
                });
            },
            submitF()
            {
                let text = this.text;
                this.show = false;
                if(text){
                    if(text.length>16){
                        text = text.substr(0,16);
                    }
                    this.$An_data.max_length_ = 50;
                    this.$An_data.addLocal('searchAlert',text,2592000);
                }
                this.$emit('searchF',{'show':this.show,'data':this.text});
            }
        },
        mounted() {
            if(this.is_focus_){
                this.autoFocusF();
            }
            this.getStorage();
        },
    }
</script>

<style scoped lang="scss">
    .content{
        position:relative;
        z-index: 8;
        width:95%;
        height:5rem;
        margin:0.833rem auto;
        table.aa1{
            position:relative;
            z-index: 9;
            height:30px;
            border-radius:5px;
            background: #F3F3F3;
            tr{
                td{
                    height:100%;
                }
                .icon{
                    width:15%;
                    .aa1{
                        width:80%;
                        margin:auto;
                        img{
                            width:2.333rem;
                            height:2.167rem;
                            vertical-align: middle;
                            object-fit: fill;
                        }
                    }
                }
                .input{
                    width:85%;
                    .aa1{
                        text-align: left;
                        input{
                            width:95%;
                            height:100%;
                            line-height:100%;
                            font-size:12px;
                            vertical-align: middle;
                            display:inline-block;
                            outline: none;
                            border: none;
                            color:#666;
                            background:none;
                        }
                    }
                }
                .x{
                    .an1_iconfont{
                        padding:0 5px;
                        color:#ddd;
                    }
                }
            }
        }
        .aa2{
            position:relative;
            z-index: 9;
            width:100%;
            max-height:43.333rem;
            overflow:auto;
            border-radius:3px;
            li{
                position:relative;
                width:100%;
                height:6.667rem;
                line-height: 6.667rem;
                font-size:2rem;
                text-align: left;
                border-bottom:solid 1px #fafafa;
                background: #fff;
                .time{
                    position:absolute;
                    top:50%;left:0.833rem;
                    transform:translate(0,-50%);
                    color:#f2f2f2;
                }
                .aaa2{
                    position:absolute;
                    top:50%;left:5rem;
                    transform:translate(0,-50%);
                    width:75%;
                    height:100%;
                    overflow:hidden;
                    white-space:nowrap;
                    text-overflow:ellipsis;
                }
                .x{
                    position:absolute;
                    top:50%;right:0.833rem;
                    transform:translate(0,-50%);
                    color:#f2f2f2;
                }
            }
        }
        .mask{
            z-index: 7;
        }
    }
</style>