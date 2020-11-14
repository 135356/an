<template>
    <div class="container">
        <div class="aa1" v-for="(v,i) in data">
            <div class="user">
                <table>
                    <tr>
                        <td width="16%" style="text-align: left;"><img :src="v.user.img" /></td>
                        <td width="80%" style="text-align: left;">
                            <div class="name">{{v.user.name}}</div>
                            <div class="date">{{v.date}}</div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="img">
                <div v-if="v.img.length===1">
                    <div class="img0">
                        <img :src="v.img[0]" />
                    </div>
                </div>
                <div class="img_1" v-else-if="v.img.length%2">
                    <div class="top">
                        <div class="left">
                            <img :src="v.img[0]" />
                        </div>
                        <div class="right">
                            <img :src="v.img[1]" />
                            <img :src="v.img[2]" />
                        </div>
                    </div>
                    <div class="img_2" v-if="v.img.length>2">
                        <img v-for="(vv,ii) in v.img" v-if="ii>2" :src="vv" />
                    </div>
                </div>
                <div class="img_2" v-else-if="!(v.img.length%2)">
                    <img v-for="vv in v.img" :src="vv" />
                </div>
            </div>
            <div class="content1">{{v.content}}</div>
            <div class="other">
                <table>
                    <tr>
                        <td width="60%"></td>
                        <td width="40%">
                            <div class="icon">
                                <img />
                                {{v.discuss}}
                            </div>
                            <div class="icon">
                                <img />
                                {{v.likes}}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AnProductImage",
        props:{'data_':Array},
        data() {
            return {
                data:this.data_
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
        }
        .user{
            margin:20px 0 10px 0;
            img{
                width:50px;
                height:50px;
                border-radius:5px;
            }
        }
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
        .content1{
            text-align: left;
            font-size:14px;
            font-weight: bold;
        }
        .other{
            width:100%;
            margin:10px auto 0;
            .icon{
                img{
                    width:15px;
                }
                display:inline-block;
                margin-left:10px;
            }
        }
    }
</style>