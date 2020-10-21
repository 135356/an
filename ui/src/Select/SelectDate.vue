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
                    <ul class="year" @touchstart.stop="year.touchStart()" @touchmove.stop="year.touchMove($event)" @touchend.stop="year.touchEnd()">
                        <li v-for="(v) in year.date.arr">
                            <span v-if="v">{{v}}{{'年'|_}}</span>
                            <span v-else></span>
                        </li>
                    </ul>
                    <ul class="month" @touchstart.stop="month.touchStart()" @touchmove.stop="month.touchMove($event)" @touchend.stop="month.touchEnd()">
                        <li v-for="(v) in month.date.arr">
                            <span v-if="v">{{v}}{{'月'|_}}</span>
                            <span v-else></span>
                        </li>
                    </ul>
                    <ul class="dat" @touchstart.stop="dat.touchStart()" @touchmove.stop="dat.touchMove($event)" @touchend.stop="dat.touchEnd()">
                        <li v-for="(v) in dat.date.arr">
                            <span v-if="v">{{v}}{{'日'|_}}</span>
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
                    direction: {
                        clientY:0,
                        clientY_arr:[],
                    },//方向
                    timer:'',
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
                        this.direction.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            if(this.timer){
                                clearTimeout(this.timer);
                            }
                            this.timer = setTimeout(()=>{
                                this.direction.clientY_arr.push(e.touches[0].clientY);
                                if(this.direction.clientY_arr[this.direction.clientY_arr.length-2]>e.touches[0].clientY){
                                    this.generateF();
                                }else{
                                    this.generate1F();
                                }
                            },8);
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
                    direction: {
                        clientY:0,
                        clientY_arr:[],
                    },//方向
                    timer:'',
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
                        this.direction.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            if(this.timer){
                                clearTimeout(this.timer);
                            }
                            this.timer = setTimeout(()=>{
                                this.direction.clientY_arr.push(e.touches[0].clientY);
                                if(this.direction.clientY_arr[this.direction.clientY_arr.length-2]>e.touches[0].clientY){
                                    this.generateF();
                                }else{
                                    this.generate1F();
                                }
                            },15);
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
                    direction: {
                        clientY:0,
                        clientY_arr:[],
                    },//方向
                    timer:'',
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
                        this.direction.clientY_arr=[];
                    },
                    touchMove(e){/*滑动时*/
                        if (e.changedTouches.length) {
                            if(this.timer){
                                clearTimeout(this.timer);
                            }
                            this.timer = setTimeout(()=>{
                                this.direction.clientY_arr.push(e.touches[0].clientY);
                                if(this.direction.clientY_arr[this.direction.clientY_arr.length-2]>e.touches[0].clientY){
                                    this.generateF();
                                }else{
                                    this.generate1F();
                                }
                            },10);
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
                height: 260px;
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
                        margin:20px auto 5px;
                        overflow-y:auto;
                        li{
                            height:30px;
                            line-height: 30px;
                            font-size:2.6rem;
                            color:#333;
                        }
                        li:nth-child(1){
                            height:10px;
                            line-height: 10px;
                            font-size:1.8rem;
                            opacity: 0.3;
                            transform:rotate3d(1,0,0,65deg);
                        }
                        li:nth-child(2){
                            height:20px;
                            line-height: 20px;
                            font-size:2.2rem;
                            opacity: 0.4;
                            transform:rotate3d(1,0,0,55deg);
                        }
                        li:nth-child(3){
                            height:23px;
                            line-height: 23px;
                            font-size:2.4rem;
                            opacity: 0.6;
                            transform:rotate3d(1,0,0,40deg);
                        }
                        li:nth-child(4){
                            height:25px;
                            line-height: 25px;
                            font-size:2.5rem;
                            opacity: 0.7;
                            transform:rotate3d(1,0,0,30deg);
                        }
                        li:nth-child(5){
                            opacity: 1;
                            border-top:solid 1px #888;
                            border-bottom:solid 1px #888;
                        }
                        li:nth-child(6){
                            height:25px;
                            line-height: 25px;
                            font-size:2.5rem;
                            opacity: 0.7;
                            transform:rotate3d(1,0,0,30deg);
                        }
                        li:nth-child(7){
                            height:23px;
                            line-height: 23px;
                            font-size:2.4rem;
                            opacity: 0.6;
                            transform:rotate3d(1,0,0,40deg);
                        }
                        li:nth-child(8){
                            height:20px;
                            line-height: 20px;
                            font-size:2.2rem;
                            opacity: 0.4;
                            transform:rotate3d(1,0,0,55deg);
                        }
                        li:nth-child(9){
                            height:10px;
                            line-height: 10px;
                            font-size:1.8rem;
                            opacity: 0.3;
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
