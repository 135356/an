<template>
    <div class="container" :class="{'active':active}" @click="selectF()">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'AnSelectRadio',
        props: {'select_index_':Number,'index_':Number},
        data() {
            return {
                active:false,
                index:this.index_,
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
        },
        destroyed() {}
    }
</script>

<style scoped lang="scss">
    .content{
        display:inline-block;
    }
</style>