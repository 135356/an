<template>
    <div class="container">
        <div class="aa1">
            <div v-if="data_str" class="img">
                <div>
                    <div class="img0">
                        <img :src="data_str" />
                    </div>
                </div>
            </div>
            <div v-else-if="data_arr" class="img">
                <div v-if="data_arr.length===1">
                    <div class="img0">
                        <img :src="data_arr[0]" />
                    </div>
                </div>
                <div class="img_1" v-else-if="data_arr.length%2">
                    <div class="top">
                        <div class="left">
                            <img :src="data_arr[0]" />
                        </div>
                        <div class="right">
                            <img :src="data_arr[1]" />
                            <img :src="data_arr[2]" />
                        </div>
                    </div>
                    <div class="img_2" v-if="data_arr.length>2">
                        <img v-for="(vv,ii) in data_arr" v-if="ii>2" :src="vv" />
                    </div>
                </div>
                <div class="img_2" v-else-if="!(data_arr.length%2)">
                    <img v-for="vv in data_arr" :src="vv" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnProductImage",
        props:{'data_':Array|String},
        data() {
            return {
                data_str:'',
                data_arr:'',
            }
        },
        mounted() {
            if(this.data_){
                if(typeof this.data_==='object'){
                    if(this.data_.length){
                        this.data_arr=this.data_;
                    }
                }else{
                    this.data_str=this.data_;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width:100%;
        overflow:hidden;
        .aa1{
            border-bottom:solid 1px #eee;
            .img{
                img{
                    width:100%;
                    height:100%;
                    border-radius:5px;
                    object-fit: cover;
                }
                .img0{
                    width:100%;
                    height:200px;
                }
                .img_1{
                    width:100%;
                    .top{
                        width:100%;
                        height:200px;
                        .left{
                            width:49%;
                            height:99%;
                            float:left;
                        }
                        .right{
                            width:49%;
                            height:49%;
                            float:right;
                        }
                    }
                }
                .img_2{
                    display: -webkit-flex;
                    display: flex;
                    justify-content: space-between;
                    flex-flow: row wrap;
                    align-content:space-around;
                    img{
                        width:49%;
                        height:100px;
                        margin:3px auto;
                    }
                }
            }
        }
    }
</style>