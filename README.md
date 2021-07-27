# 结合vue使用的js组件
    轮播图、弹框、单选、多选、上拉刷新、下拉加载更多、加载动画、实时滚动条高度
    智能地址填充、多语言、本地缓存、自动px转rem、路由跳转、错图替换、h5视频播放
    因为要同一时期制作和维护多个vue项目，然后这些项目又都设计的花里胡哨的(ui比较闲)，所以就出现了很多功能相同但样式都不相同的需求。用传统的开源组件完成这些奇葩需求就会出现改起来比重新做还费劲，甚至得重新换别的开源组件才能完成的情况，所以我自己写了这些组件，样式跟功能都是分开的

##### 贴出一些简单示例，如果有人关注该项目在更新并补充吧
**\src\main.js:**
```
    import An from '@/libs/an/src'
    import An_ui from '@/libs/an/ui'
    Vue.use(An);
    Vue.use(An_ui);
```
**轮播图**
```
<div class="banner">
  <AnBannerDiv>
    <div class="banner_img">
      <div><img src="img.png" /></div>
      <div><img src="img.png" /></div>
      <div><img src="img.png" /></div>
    </div>
  </AnBannerDiv>
</div>
----
.banner {
    position: relative;
    width: 93%;
    margin: 12px auto 0;
    overflow: hidden;

    .banner_img {
      width: 100%;
      height: 128px;
    }
}
```
**弹框**
```
    this.$store.dispatch('alertA','成功');
    this.$store.dispatch('alertA',{'text':'成功','time':500});
```
**单选**
```
<AnSelectRadio :value_="radio.data[0].value" :select_="radio.value" style_="img" @AnSelectRadioF="radio.monitorF">
  <div class="select_icon">
    <img v-if="radio.value" src="../assets/img/aaa_1.png" />
    <img v-else src="../assets/img/aaa_0.png" />
  </div>
</AnSelectRadio>
----
data() {
    return {
        radio:{
            value:0,
            data:[
                {'value':1},
            ],
            triggerF:(i)=>{
                let this_=this.radio;
                this_.value=this_.data[i].value;
            },
            monitorF:(v)=>{
                let this_=this.radio;
                if(this_.value){
                    this_.value=0;
                }else{
                    this_.value=1;
                    if(this.img.file.length){
                    this.$emit('AnHelpF', {'img':this.img.file[0]});
                }
            }
        }
    }
}
```
**多选**
```
<ul>
    <li v-for="(v,i) in classify['data']" :class="{'active':v['select']}">
        <AnSelectCheckbox :select_index_="classify.select_i" :index_="i" class="icon" @AnSelectCheckboxF="classify.monitorF">
            <img v-if="classify['data'][i]" src="../assets/img/aaa_1.png"/>
            <img v-else src="../assets/img/aaa_0.png"/>
        </AnSelectCheckbox>
    </li>
</ul>
----
data() {
    return {
        classify: {
            show: 0,
            value: 0,
            select_i: 0,
            data: {},
            triggerF(i) {},
            monitorF: (v) => {}
        }
    }
}
```
**上拉刷新**
```
<AnScrollRefresh :fun_="scroll_refresh.triggerF">
    <router-view></router-view>
</AnScrollRefresh>
----
data(){
    return {
        scroll_refresh: {
            triggerF: () => {
                /*将api请求放这里面，在拖动往下拉时会进行触发*/
                return new Promise((resolve) => {
                    this.$An_data.createLocal_('reload_is',1,30);
                    window.location.reload(true);
                    setTimeout(function(){
                        resolve(1);
                    }, 200);
                });
            }
        }
    }
}
```
**下拉加载更多**
```
<AnScrollLoad :fun_="scroll_load.triggerF" :remove_="scroll_load.remove">
    <div v-if="scroll_load.data.length" v-for="v in scroll_load.data" style="width:100%;height:100px;border-top:solid 1px #f00;">{{v}}</div>
</AnScrollLoad>
----
data() {
    return {
        scroll_load: {
            data:[],
            remove:0, //为1表示删除，在不刷新的情况下(通过模块换页时)如果需要恢复原始状态设置为1
            triggerF: () => {
                /*将api请求放这里面，在滚动条到底部时触发*/
                return new Promise((resolve) => {
                    setTimeout(()=>{
                        if(1){
                            this.scroll_load.data=this.scroll_load.data.concat([1,2,3,4,5,6]);
                            resolve(1); //必须收到回调参数才会触发下次请求
                        }else{
                            resolve(-1); //同上
                        }
                    }, 500);
                });
            }
        }
    }
```
**加载动画**
```
<AnLoadStart>
    <router-view></router-view>
</AnLoadStart>
```
**实时滚动条高度**
```
    <AnScrollTop id_="an_scroll_id">
        <router-view></router-view>
    </AnScrollTop>
```
**智能地址填充**
```
<div class="input">
    <textarea v-model="other.ai_distinguish" :placeholder="_('智能识别 请将地址信息粘贴在此处')" cols="30" rows="10"></textarea>
</div>
<div @click="ai_distinguishF()" class="button">
    <span>识别</span>
</div>
----
ai_distinguishF()
{
    if(!this.other.ai_distinguish){
        this.$store.dispatch('alertA',this._('请在智能识别框内输入地址信息'));
        return ;
    }
    let address=this.other.ai_distinguish;
    if(address.length>10){
        this.$An_address.aiArea(address,this.$store.dispatch).then(res=>{
            this.country.data=res['country']['data'];
            this.country.select_i=res['country']['select_i'];
            this.country.value=res['country']['data'][res['country']['select_i']]['id'];
            this.province.data=res['province']['data'];
            this.province.select_i=res['province']['select_i'];
            this.province.value=res['province']['data'][res['province']['select_i']]['id'];
            this.city.data=res['city']['data'];
            this.city.select_i=res['city']['select_i'];
            this.city.value=res['city']['data'][res['city']['select_i']]['id'];
            this.area.data=res['area']['data'];
            this.area.select_i=res['area']['select_i'];
            this.area.value=res['area']['data'][res['area']['select_i']]['id'];
            this.other['name']=res['other']['name'];
            this.other['phone']=res['other']['phone'];
            this.other['postcode']=res['other']['postcode'];
            this.other['detailed']=res['other']['detailed'];
        });
    }else{
        this.$store.dispatch('alertA',this._('未能正确识别,可能您输入的地址信息过于简单'));
    }
}
```
**本地缓存**
```
mounted() {
    //创建缓存
    this.$An_data.createLocal('aaa', 'aaa');
    //同上，存对象
    this.$An_data.createLocal('aaa', {'a':'aaa','b':'aaa'});
    //同上，存数组
    this.$An_data.createLocal('aaa', [1,2,3]);
    //同上，3200秒之后过期
    this.$An_data.createLocal('aaa', 'aaa',3200);
    
    //向后追加，并限制存储时间
    this.$An_data.addLocal('aaa',[1,2,3],2592000);
    //同上，并限制最大存储长度
    this.$An_data.addLocal('aaa',[1,2,3],2592000,50);
    
    //获取缓存
    this.$An_data.getLocal('aaa').then(res => {
      console.log(res);
    });
    //同上，只要第i条的数据
    this.$An_data.getLocal('aaa',i).then(res => {
      console.log(res);
    });
    
    //删除'aaa'缓存
    this.$An_data.deleteLocal('aaa').then(()=>{});
    //同上，删除aaa的第i条
    this.$An_data.deleteLocal('aaa',i).then(()=>{});
}
```
**链接与跳转**
```
跳转到百度
<li @click="$An_link.to('https://www.baidu.com')"></li>

跳转到路由路径为 /aaa 的页面
<li @click="$An_link.to('/aaa')"></li>

同上，并以get携带参数{ aaa: 100 }
<li @click="$An_link.to('/aaa', { aaa: 100 })"></li>

跳转到路由名称为aaa的页面，并以post携带参数
<li @click="$An_link.to('aaa', { aaa: 100 })"></li>
----
mounted() {
    this.$An_link.to('/aaa', { aaa: 100 }); //同上
    
    this.$An_link.get(); //获取路由传递的全部参数
    this.$An_link.get('aaa'); //获取key为aaa的参数
}
```
**错图替换**
```
<img src="aaa.png" @error="$An.imgError()" />
```
**h5视频播放**
```
this.H5Video.play(this.current['elem']) //播放，返回当前状态
this.H5Video.pause() //暂停，返回当前状态
```
