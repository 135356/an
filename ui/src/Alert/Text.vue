<template>
    <div class="tips" v-if="tips">
        <div class="text">{{tips}}</div>
    </div>
</template>
<script>
    export default {
        name: "AnAlertText",
        props:{'tips_':String},
        data() {
            return {
                tips:'',
                timeout:'',
            }
        },
        watch: {
            tips_(v)
            {
                if(!this.tips){
                    this.tips=v;
                    this.timeout=setTimeout(()=>{
                        this.tips='';
                        clearTimeout(this.timeout);
                        this.$emit('AnAlertTextF', '');
                    }, 2000);
                }
            }
        },
        created() {}
    }
</script>

<style scoped>
    .tips .text{
        position:fixed;
        top:50%;
        left:50%;
        width:80%;
        z-index: 9999;
        font-size:2.6rem;
        color:#fff;
        padding:15px 5px;
        border-radius:5px;
        transform: translate(-50%,-50%);
        background:rgba(0,0,0,0.9);
    }
</style>
