<template>
    <div class="container" @click.stop="selectF()">
        <div :class="{'active':select}"><i class="an1_iconfont">&#xe61c;</i></div>
    </div>
</template>

<script>
    export default {
        name: "AnSelectCheckbox",
        props: {index_:Number,value_:String|Number,select_:Boolean|Number},
        data() {
            return {
                select:this.select_,
                value:this.value_,
            }
        },
        watch: {
            select_(val)
            {
                this.select=val;
            },
            value_(val)
            {
                this.value=val;
            }
        },
        methods: {
            selectF() {
                this.select=!this.select;
                this.$emit('AnSelectCheckboxF', {'index':this.index_,'val':this.value,'select':this.select});
            }
        },
        created() {},
        mounted() {},
        destroyed() {}
    }
</script>

<style scoped lang="scss">
    .container {
        display:inline-block;
        div{
            width:21px;
            height:21px;
            line-height: 21px;
            border-radius:3px;
            display:inline-block;
            text-align: center;
            border:solid 1px #eee;
            background:#fff;
            i{
                color:#fff;
                visibility: hidden;
            }
        }
        div.active{
            border:solid 1px #2299ff;
            background:#3399ff;
            i{
                color:#fff;
                visibility: visible;
            }
        }
    }
</style>
