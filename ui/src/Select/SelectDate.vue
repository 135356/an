<template>
    <div class="container">
        <div class="text" :style="style">
            <slot></slot>
        </div>
        <div class="cont" v-if="show">
            <div class="alert">
                <div class="button">
                    <div class="aa1">
                        <div @click.stop="closeF()" class="left">{{'取消'|_}}</div>
                        <div @click.stop="selectF()" class="right">{{'完成'|_}}</div>
                    </div>
                </div>
                <div class="date">
                    <ul class="year" @touchstart.stop="year.touchStart($event)" @touchmove.stop="year.touchMove($event)" @touchend.stop="year.touchEnd()">
                        <li v-for="(v) in year.date.arr">
                            <span v-if="v">{{v}}&nbsp;{{'年'|_}}</span>
                            <span v-else></span>
                        </li>
                    </ul>
                    <ul class="month" @touchstart.stop="month.touchStart($event)" @touchmove.stop="month.touchMove($event)" @touchend.stop="month.touchEnd()">
                        <li v-for="(v) in month.date.arr">
                            <span v-if="v">{{v}}&nbsp;{{'月'|_}}</span>
                            <span v-else></span>
                        </li>
                    </ul>
                    <ul class="dat" @touchstart.stop="dat.touchStart($event)" @touchmove.stop="dat.touchMove($event)" @touchend.stop="dat.touchEnd()">
                        <li v-for="(v) in dat.date.arr">
                            <span v-if="v">{{v}}&nbsp;{{'日'|_}}</span>
                            <span v-else></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div @click.stop="closeF()" class="mask"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnSelectSelectDate',
        props: {'show_':Boolean|Number, 'select_index_': Number, 'style_': String},
        data() {
            return {
                show:this.show_,
                value:'',
                style: this.style_,
                select_index:this.select_index_,
                year:{
                    value:0,
                    month:()=>{
                        return this.month;
                    },
                    dat:()=>{
                        return this.dat;
                    },
                    date:{
                        start:1950,
                        end:2020,
                        arr:[],
                    },
                    move:{
                        stateX:0,//左右状态
                        stateY:0,//上下状态
                        space:8,//间隔次
                        space_time:300,//间隔时间
                        clientX_arr:[],
                        clientY_arr:[],
                        xF(type)
                        {
                            this.stateX=0;
                            this.clientX_arr=[];
                        },
                        yF(type,this_,quicken)
                        {
                            this.clientY_arr=[];
                            if(type){
                                if(quicken){
                                    let i=0;
                                    let b=setInterval(()=>{
                                        i++;
                                        this_.generateF();
                                        if(i>6){
                                            clearInterval(b);
                                        }
                                    },100);
                                }else{
                                    this_.generateF();
                                }
                            }else{
                                if(quicken){
                                    let i=0;
                                    let b=setInterval(()=>{
                                        i++;
                                        this_.generate1F();
                                        if(i>6){
                                            clearInterval(b);
                                        }
                                    },100);
                                }else{
                                    this_.generate1F();
                                }
                            }
                            setTimeout(()=>{
                                this.stateY=0;
                            }, this.space_time);
                        }
                    },
                    generateF()
                    {
                        this.date.arr=[];
                        let v=this.date.start-4;
                        if(v<this.date.end-4){
                            this.date.start++;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                        if(!this.value){
                            this.value=this.date.arr[4];
                        }
                    },
                    generate1F()
                    {
                        this.date.arr=[];
                        let v=this.date.start-4;
                        if(v>-3){
                            v=this.date.start--;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                    },
                    touchStart(e){/*触摸控件时*/
                        this.move.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            this.move.clientY_arr.push(e.touches[0].clientY);
                            if(this.move.clientY_arr.length>this.move.space){
                                if(!this.move.stateY){
                                    this.move.stateY=1;
                                    if(Math.abs(this.move.clientY_arr[this.move.clientY_arr.length-1]-this.move.clientY_arr[this.move.clientY_arr.length-(this.move.space+1)])>50){
                                        if(this.move.clientY_arr[this.move.clientY_arr.length-2] > this.move.clientY_arr[this.move.clientY_arr.length-1]) {
                                            this.move.yF(1,this,1);
                                        }else{
                                            this.move.yF(0,this,1);
                                        }
                                    }else{
                                        if(this.move.clientY_arr[this.move.clientY_arr.length-2] > this.move.clientY_arr[this.move.clientY_arr.length-1]) {
                                            this.move.yF(1,this);
                                        }else{
                                            this.move.yF(0,this);
                                        }
                                    }
                                }
                            }
                        }
                    },
                    touchEnd(){
                        this.value=this.date.arr[4];
                        let a = new Date(this.value, this.month()['value'], 0);
                        this.dat()['date'].end=a.getDate();
                    }
                },
                month:{
                    value:0,
                    year:()=>{
                        return this.year;
                    },
                    dat:()=>{
                        return this.dat;
                    },
                    date:{
                        start:1,
                        end:12,
                        arr:[],
                    },
                    move:{
                        stateX:0,//左右状态
                        stateY:0,//上下状态
                        space:8,//间隔
                        clientX_arr:[],
                        clientY_arr:[],
                        xF(type)
                        {
                            this.stateX=0;
                            this.clientX_arr=[];
                        },
                        yF(type,this_)
                        {
                            this.stateY=0;
                            this.clientY_arr=[];
                            if(type){
                                this_.generateF();
                            }else{
                                this_.generate1F();
                            }
                        }
                    },
                    generateF(v)
                    {
                        this.date.arr=[];
                        v=this.date.start-4;
                        if(v<this.date.end-4){
                            this.date.start++;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                        if(!this.value){
                            this.value=this.date.arr[4];
                        }
                    },
                    generate1F(v)
                    {
                        this.date.arr=[];
                        v=this.date.start-4;
                        if(v>-3){
                            this.date.start--;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                    },
                    touchStart(){/*触摸控件时*/
                        this.move.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            this.move.clientY_arr.push(e.touches[0].clientY);
                            if(this.move.clientY_arr.length>this.move.space){
                                if(!this.move.stateY){
                                    this.move.stateY=1;
                                    if(this.move.clientY_arr[this.move.clientY_arr.length-this.move.space+1] > this.move.clientY_arr[this.move.clientY_arr.length-1]) {
                                        this.move.yF(1,this);
                                    }else{
                                        this.move.yF(0,this);
                                    }
                                }
                            }
                        }
                    },
                    touchEnd(){
                        this.value=this.date.arr[4];
                        let a = new Date(this.year()['value'], this.value, 0);
                        this.dat()['date'].end=a.getDate();
                    }
                },
                dat:{
                    value:0,
                    date:{
                        start:1,
                        end:30,
                        arr:[],
                    },
                    move:{
                        stateX:0,//左右状态
                        stateY:0,//上下状态
                        space:8,//间隔
                        clientX_arr:[],
                        clientY_arr:[],
                        xF(type)
                        {
                            this.stateX=0;
                            this.clientX_arr=[];
                        },
                        yF(type,this_)
                        {
                            this.stateY=0;
                            this.clientY_arr=[];
                            if(type){
                                this_.generateF();
                            }else{
                                this_.generate1F();
                            }
                        }
                    },
                    generateF(v)
                    {
                        this.date.arr=[];
                        v=this.date.start-4;
                        if(v<this.date.end-4){
                            this.date.start++;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                        if(!this.value){
                            this.value=this.date.arr[4];
                        }
                    },
                    generate1F(v)
                    {
                        this.date.arr=[];
                        v=this.date.start-4;
                        if(v>-3){
                            this.date.start--;
                        }
                        for(let i=0;i<9;i++){
                            if(v+i<0||v+i>this.date.end){
                                this.date.arr[i]=0;
                            }else{
                                this.date.arr[i]=v+i;
                            }
                        }
                    },
                    touchStart(){/*触摸控件时*/
                        this.move.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            this.move.clientY_arr.push(e.touches[0].clientY);
                            if(this.move.clientY_arr.length>this.move.space){
                                if(!this.move.stateY){
                                    this.move.stateY=1;
                                    if(this.move.clientY_arr[this.move.clientY_arr.length-this.move.space+1] > this.move.clientY_arr[this.move.clientY_arr.length-1]) {
                                        this.move.yF(1,this);
                                    }else{
                                        this.move.yF(0,this);
                                    }
                                }
                            }
                        }
                    },
                    touchEnd(){
                        this.value=this.date.arr[4];
                    }
                },
            }
        },
        watch: {
            show_(val){
                this.show=val;
            },
            data_(val) {
                this.data = val;
            },
            select_index_(val) {
                this.select_index=val;
                if(this.data_.length){
                    if(this.select_index>-1){
                        if(this.select_index>=this.data_.length){
                            this.value=this.data_[this.data_.length-1].value;
                        }else{
                            this.value=this.data_[this.select_index].value;
                        }
                    }else{
                        this.value='';
                    }
                }else{
                    this.value='';
                }
            }
        },
        methods: {
            selectF() {
                this.show=false;
                this.value=this.year.value+'/'+this.month.value+'/'+this.dat.value;
                this.$emit('AnSelectSelectDateF', {'show':this.show,'value': this.value});
            },
            closeF() {
                this.show=false;
            }
        },
        created() {},
        mounted() {
            this.year.generateF();
            let cTime = new Date();
            this.year.date.end=cTime.getFullYear();
            this.month.generateF();
            this.dat.generateF();
        },
        destroyed() {}
    }
</script>

<style scoped lang="scss">
    .container {
        position: relative;
        width: 100%;

        .text {
            position: relative;
            width: 100%;
        }

        .cont {
            .alert {
                position: fixed;
                right: 0;
                bottom: 0;
                z-index: 100;
                width: 100%;
                height: 376px;
                overflow: auto;
                text-align: center;
                background: #D8D8D8;
                .button{
                    width:100%;
                    height:35px;
                    line-height: 35px;
                    background: #fff;
                    .aa1{
                        position:relative;
                        width:80%;
                        margin:auto;
                        font-weight:600;
                        color:#00a0ff;
                        .left{
                            position:absolute;
                            left:0;
                        }
                        .right{
                            position:absolute;
                            right:0;
                        }
                    }
                }
                .date{
                    position:relative;
                    width:100%;
                    height:76%;
                    margin:auto;
                    ul{
                        width:33.3%;
                        height:100%;
                        margin:15px auto;
                        overflow-y:auto;
                        li{
                            height:50px;
                            line-height: 50px;
                            font-size:16px;
                            color:#333;
                        }
                        li:nth-child(1){
                            height:20px;
                            line-height: 20px;
                            font-size:10px;
                            opacity: 0.1;
                            transform:rotate3d(1,0,0,65deg);
                        }
                        li:nth-child(2){
                            height:22px;
                            line-height: 22px;
                            font-size:12px;
                            opacity: 0.3;
                            transform:rotate3d(1,0,0,55deg);
                        }
                        li:nth-child(3){
                            height:35px;
                            line-height: 35px;
                            font-size:13px;
                            opacity: 0.6;
                            transform:rotate3d(1,0,0,40deg);
                        }
                        li:nth-child(4){
                            height:40px;
                            line-height: 40px;
                            font-size:14px;
                            opacity: 0.7;
                            transform:rotate3d(1,0,0,30deg);
                        }
                        li:nth-child(5){
                            opacity: 1;
                            font-weight:600;
                            border-top:solid 1px #888;
                            border-bottom:solid 1px #888;
                        }
                        li:nth-child(6){
                            height:40px;
                            line-height: 40px;
                            font-size:14px;
                            opacity: 0.7;
                            transform:rotate3d(1,0,0,30deg);
                        }
                        li:nth-child(7){
                            height:35px;
                            line-height: 35px;
                            font-size:13px;
                            opacity: 0.6;
                            transform:rotate3d(1,0,0,40deg);
                        }
                        li:nth-child(8){
                            height:22px;
                            line-height: 22px;
                            font-size:12px;
                            opacity: 0.3;
                            transform:rotate3d(1,0,0,55deg);
                        }
                        li:nth-child(9){
                            height:20px;
                            line-height: 20px;
                            font-size:10px;
                            opacity: 0.1;
                            transform:rotate3d(1,0,0,65deg);
                        }
                    }
                    ul::-webkit-scrollbar{
                        display: none;
                    }
                    .year{
                        position:absolute;
                        top:0;left:0;
                        li:nth-child(5){
                            opacity: 1;
                            border-top:solid 1px #888;
                            border-bottom:solid 1px #888;
                        }
                    }
                    .month{
                        position:absolute;
                        top:0;left:50%;
                        transform: translate(-50%,0);
                    }
                    .dat{
                        position:absolute;
                        top:0;right:0;
                    }
                }
            }
        }
    }
</style>
