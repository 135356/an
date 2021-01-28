<template>
    <div :id="id">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'AnScrollTop',
    props: {'id_':String|Number},
    data() {
        return {
            id:'a',
            elem:'',
        }
    },
    watch: {},
    methods: {
        alwaysScroll(){
            this.$store.dispatch('scroll_topA', {'id':this.id,'data':this.elem.getBoundingClientRect()});
        }
    },
    created() {
        window.addEventListener('load', function () {window.scroll(0, 100)});
    },
    mounted() {
        if(this.id_){this.id=this.id_;}else{this.id='AnScrollTop'+parseInt(Math.random()*(999+1),10);}
        this.$nextTick(() => {
            this.elem=document.getElementById(this.id);
            window.addEventListener('scroll', this.alwaysScroll, true);
        });
    },
    destroyed() {
        window.removeEventListener('scroll', () => {
            console.log('removeEventListener scroll');
        });
    }
}
</script>

<style scoped>

</style>