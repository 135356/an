# address
```
<td class="ai">
    <div class="input">
        <textarea v-model="other.ai_distinguish" :placeholder="_('智能识别 请将地址信息粘贴在此处')" cols="30" rows="10"></textarea>
    </div>
    <div @click="ai_distinguishF()" class="button">
        <span>识别</span>
    </div>
</td>
```
```
ai_distinguishF()
{
    if(!this.other.ai_distinguish){
        this.$store.dispatch('alertA',this._('请在智能识别框内粘贴地址信息'));
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
        this.$store.dispatch('alertA',this._('未能正确识别,可能地址信息过短'));
    }
}
```