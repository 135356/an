# an
```
<AnScrollLoad :fun_="scroll_load.triggerF" :remove_="scroll_load.remove">
    <div v-if="scroll_load.data.length" v-for="v in scroll_load.data" style="width:100%;height:100px;border-top:solid 1px #f00;">{{v}}</div>
</AnScrollLoad>
----
scroll_load: {
    data:[],
    remove:0, //删除
    triggerF: () => { //触发器
        /*将api请求放这里面，在滚动条到底部时触发*/
        return new Promise((resolve) => {
            setTimeout(()=>{
                if(1){
                    this.scroll_load.data=this.scroll_load.data.concat([1,2,3,4,5,6]);
                    resolve(1); //必须收到回调参数才会触发下次请求
                }else{
                    resolve(-1); //必须收到回调参数才会触发下次请求
                }
            }, 500);
        });
    },
},
```
