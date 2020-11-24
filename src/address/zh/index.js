class Address{
  this__='';
  /*后台请求到的数据*/
  out_y={
    'country':0,//国
    'province':0,//省
    'city':0,//市
    'area':0,//区
  }
  /*过滤好的地址*/
  out_i={
    'mobile':'',//移动电话
    'phone':'',//固定电话
    'zip_code':'',//邮政编码
    'user_name':'',//用户名
    'country':0,//国
    'province':0,//省
    'city':0,//市
    'area':0,//区
    'detailed':0,//详细地址
  };
  /*需要去掉的文字*/
  filtered={
    special:['县','区','旗','市','盟','州'],/*特殊地区*/
    province:['特别行政区', '古自治区', '维吾尔自治区', '壮族自治区', '回族自治区', '自治区', '省省直辖', '省', '市'],//省
    city:['布依族苗族自治州', '苗族侗族自治州', '自治州', '州', '市', '县'],//市
    other:['地址', '收货地址', '收货人', '收件人', '收货', '邮编', '电话', '手机号码','所在地区','：', ':', '；', ';', '，', ',', '。',' '],//其它
  }
  /*用户输入的地址*/
  address='';

  constructor()
  {}

  this_(this_) {
    this.this__ = this_;
    return this;
  }

  /*设置地址*/
  setAddress(address)
  {
    this.address=address;
    this.filtered.other.forEach(str => {
      this.address = this.address.replace(new RegExp(str, 'g'), ' ')
    });
    //多个空格替换为一个
    this.address = this.address.replace(/ {2,}/g, ' ');
  }

  /*过滤电话*/
  filterPhone()
  {
    this.address=this.address.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3'); //整理电话格式
    //移动电话
    let mobile = (/(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g).exec(this.address);
    if (mobile) {
      this.out_i.mobile = mobile[0];
      this.address = this.address.replace(mobile[0], ' ');
    }
    //固话
    let phone = (/(([0-9]{3,4}-)[0-9]{7,8})|([0-9]{12})|([0-9]{11})|([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})/g).exec(this.address);
    if (phone) {
      this.out_i.phone = phone[0];
      this.address = this.address.replace(phone[0], ' ');
    }
  }

  /*正向匹配*/
  filter(yF,iF,addr,type) {
    type=type||'country';
    let is=0;
    let index_of=-1;
    this.this__.$An_data.getAddress(addr).then(res => {
        if(res['country']){
          switch (type) {
            case 'country':
              for(let k in res['country']){
                index_of=this.address.indexOf(k);
                if(index_of>-1){
                  is=1;
                  this.out_i.country=res['country'][k];
                  this.address = this.address.replace(k,'');
                  this.filter(yF,iF,{'country':res['country'][k]['id']},'province');
                  break;
                }
              }
              if(!is){
                this.out_i.country=res['country']['中国'];
                this.filter(yF,iF,{'country':res['country']['中国']['id']},'province');
              }
              break;
            case 'province':
              is=0;
              if(res['province']){
                this.out_y=res;
                for(let k in res['province']){
                  index_of=this.address.indexOf(k);
                  if (index_of > -1) {
                    is=1;
                    if (index_of > 0) {//省份不在第一位，将省份之前的字段截取出来识别为名称
                      this.out_i.user_name = this.address.substr(0, index_of).trim();
                    }
                    this.out_i.province = res['province'][k];
                    this.address = this.address.substr(index_of + k.length);
                    for (let kk in this.filtered.province) {
                      if (this.address.indexOf(this.filtered.province[kk]) === 0) {
                        this.address = this.address.substr(this.filtered.province[kk].length);
                      }
                    }
                    this.filter(yF,iF,Object.assign(addr,{'province':res['province'][k]['id']}),'city');
                    break;
                  }
                }
                if(!is){
                  this.out_i['province']=0;
                  this.out_i['city']=0;
                  this.out_i['area']=0;
                  this.out_i.detailed=this.address;
                  iF(this.out_i);
                  yF(this.out_y);
                }
              }
              break;
            case 'city':
              is=0;
              if(res['city']){
                this.out_y=res;
                for(let k in res['city']){
                  index_of=this.address.indexOf(k);
                  if (index_of > -1 && index_of < 3) {
                    is=1;
                    this.out_i.city = res['city'][k];
                    this.address = this.address.substr(index_of + k.length);
                    for (let kk in this.filtered.city) {
                      if (this.address.indexOf(this.filtered.city[kk]) === 0) {
                        this.address = this.address.substr(this.filtered.city[kk].length);
                      }
                    }
                    this.filter(yF,iF,Object.assign(addr,{'city':res['city'][k]['id']}),'area');
                    break;
                  }
                }
                if(!is){
                  this.out_i['city']=0;
                  this.out_i['area']=0;
                  this.out_i.detailed=this.address;
                  iF(this.out_i);
                  yF(this.out_y);
                }
              }
              break;
            case 'area':
              is=0;
              this.out_y=res;
              if(res['area']){
                for(let k in res['area']){
                  index_of=this.address.indexOf(k);
                  if (index_of > -1 && index_of < 3) {
                    is=1;
                    this.out_i.area = res['area'][k];
                    this.address = this.address.substr(index_of + k.length);
                    this.out_i.detailed = this.address.trim();
                    iF(this.out_i);
                    break;
                  }
                }
                if(!is){
                  this.out_i['area']=0;
                  iF(this.out_i);
                }
              }
              yF(this.out_y);
              break;
          }
        }
      });
  }

  getCity(address,yF,iF)
  {
    this.setAddress(address);
    this.filterPhone();
    this.filter(yF,iF);
  }
}

export default Address;
