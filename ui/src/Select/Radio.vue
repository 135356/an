<template>
    <div class="container" :class="{'active':active}" @click="selectF()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'AnSelectRadio',
        props: {'select_index_':Number,'index_':Number|Array},
        data() {
            return {
                active:false,
                index:0,
                data:'',
                select_index:this.select_index_,
            }
        },
        watch: {
            select_index_(val)
            {
                this.select_index=val;
                if(this.select_index===this.index){
                    this.active=true;
                }else{
                    this.active=false;
                }
            },
            index_(v)
            {
                if(typeof this.index_==='number'){
                    this.index=v;
                }else if(typeof this.index_==='object'){
                    this.data=v;
                }
            }
        },
        methods: {
            selectF() {
                this.active=true;
                this.$emit('AnSelectRadioF', {'index':this.index});
            }
        },
        created() {},
        mounted() {
            if(this.select_index===this.index){
                this.active=true;
            }else{
                this.active=false;
            }
            if(typeof this.index_==='number'){
                this.index=this.index_;
            }else if(typeof this.index_==='object'){
                this.data=this.index_;
            }
        },
        destroyed() {}
    }
</script>

<style scoped lang="scss">
    .content{
        display:inline-block;
    }
</style>