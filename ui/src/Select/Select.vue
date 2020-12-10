<template>
    <div class="container">
        <div class="text" :style="style">
            <slot></slot>
        </div>
        <div class="cont" v-if="show">
            <div class="alert">
                <ul>
                    <li v-for="(v,i) in data" @click.stop="selectF(i)" :class="{'active':v.value == value}">{{v.name}}</li>
                </ul>
                <div class="close_"></div>
                <div @click.stop="closeF()" class="close">{{'取消'|_}}</div>
            </div>
            <div @click.stop="closeF()" class="mask"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AnSelectSelect',
        props: {'show_':Boolean|Number,'data_': Array, 'select_index_': Number, 'style_': String},
        data() {
            return {
                show:this.show_,
                data: this.data_,
                value:'',
                style: this.style_,
                select_index:this.select_index_,
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
            selectF(i) {
                this.show=false;
                this.select_index = i;
                this.value = this.data[i].value;
                this.$emit('AnSelectSelectF', {'show':this.show,'value': this.value,'index':this.select_index});
            },
            closeF() {
                this.show=false;
                this.$emit('AnSelectSelectF', {'show':this.show,'value': this.value,'index':this.select_index});
            }
        },
        created() {},
        mounted() {
            if(this.data_.length){
                if(this.select_index_>-1){
                    if(this.select_index_>=this.data_.length){
                        this.value=this.data_[this.data_.length-1].value;
                    }else{
                        this.value=this.data_[this.select_index_].value;
                    }
                }else{
                    this.value='';
                }
            }else{
                this.value='';
            }
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
                max-height: 300px;
                overflow: auto;
                background: #fff;

                ul {
                    width: 100%;
                    text-align: center;
                    font-size: 16px;

                    .active {
                        background: #f6f6f6;
                    }

                    li {
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        margin: auto;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        border-bottom: 1px solid #ddd;
                    }
                }

                .close_{
                    width:100%;
                    height:60px;
                }
                .close {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 60px;
                    line-height: 40px;
                    text-align: center;
                    border-top: 5px solid #ddd;
                    border-bottom: none;
                    color: #666;
                    background: #f6f6f6;
                }
            }
        }
    }
</style>
