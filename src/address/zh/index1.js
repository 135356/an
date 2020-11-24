class Address{
  /*原数据包*/
  in={
    all:[],
    special:[]
  }
  /*格式化之后的数据*/
  format={
    province:[],//省
    city:[],//市
    area:[],//区
  };
  /*需要去掉的文字*/
  filtered={
    special:['县','区','旗','市','盟','州'],/*特殊地区*/
    province:['特别行政区', '古自治区', '维吾尔自治区', '壮族自治区', '回族自治区', '自治区', '省省直辖', '省', '市'],//省
    city:['布依族苗族自治州', '苗族侗族自治州', '自治州', '州', '市', '县'],//市
    other:['地址', '收货地址', '收货人', '收件人', '收货', '邮编', '电话', '：', ':', '；', ';', '，', ',', '。',' '],//其它
  }
  /*过滤好的地址*/
  out={
    'mobile':'',//移动电话
    'phone':'',//固定电话
    'zip_code':'',//邮政编码
    'user_name':'',//用户名
    'province':'',//省
    'city':'',//市
    'area':'',//区
    'detailed':'',//详细地址
  };
  /*用户输入的地址*/
  address='';

  constructor()
  {
    this.in.all = require('./city.json');
    this.in.special = require('./special.json');
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

  /*格式化地址,省*/
  formatProvince(data)
  {
    //let country=['America','Italy','Australia','中国'];
    let r_data=[];
    for(let i=0;i<data.length;i++){
      r_data[data[i]['name']]=i;
    }
    return r_data;
  }

  /*格式化地址,市*/
  formatCity(data)
  {
    let r_data=[];
    for(let i=0;i<data.length;i++){
      r_data[data[i]['name']]=i;
    }
    return r_data;
  }

  /*格式化地址,区*/
  formatArea(data)
  {
    let r_data=[];
    for(let i=0;i<data.length;i++){
      r_data[data[i]]=i;
    }
    return r_data;
  }

  /*格式化特殊地区*/
  formatSpecialArea()
  {
    let special=['县','区','旗','市','盟','州'];
    let data={
      'province': {},//省
      'city': {},//市
      'area': {},//区
    };
    for(let i in this.in.all){
      for(let j in special){
        if(this.in.all[i]['name'].indexOf(special[j])>-1){
          data['province'][this.in.all[i]['name']]=i+1;
        }
        for(let ii in this.in.all[i]['city']){
          if(this.in.all[i]['city'][ii]['name'].indexOf(special[j])>-1){
            data['city'][this.in.all[i]['city'][ii]['name']]=ii+1;
          }
          for(let iii in this.in.all[i]['city'][ii]['area']){
            if(this.in.all[i]['city'][ii]['area'][iii].indexOf(special[j])>-1){
              data['area'][this.in.all[i]['city'][ii]['area'][iii]]=iii;
            }
          }
        }
      }
    }
    //this.saveJSON_(data);
    console.log(data);
  }

  /*格式化所有的区*/
  formatSpecialArea()
  {
    let data={
      'province': {},//省
      'city': {},//市
      'area': {},//区
    };
    for(let i in this.in.all){
      data['province'][this.in.all[i]['name']]={'i':i};
      for(let ii in this.in.all[i]['city']){
        data['city'][this.in.all[i]['city'][ii]['name']]={'i':i,'ii':ii};
        for(let iii in this.in.all[i]['city'][ii]['area']){
          data['area'][this.in.all[i]['city'][ii]['area'][iii]]={'i':i,'ii':ii,'iii':iii};
        }
      }
    }
    //this.saveJSON_(data,'aaa');
    //console.log(data);
  }

  /*过滤电话*/
  filterPhone()
  {
    this.address=this.address.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3'); //整理电话格式
    //移动电话
    let mobile = (/(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g).exec(this.address);
    if (mobile) {
      this.out.mobile = mobile[0];
      this.address = this.address.replace(mobile[0], ' ');
    }
    //固话
    let phone = (/(([0-9]{3,4}-)[0-9]{7,8})|([0-9]{12})|([0-9]{11})|([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})/g).exec(this.address);
    if (phone) {
      this.out.phone = phone[0];
      this.address = this.address.replace(phone[0], ' ');
    }
  }

  /*过滤省*/
  filterProvince(province)
  {
    for(let k in province){
      let index = this.address.indexOf(k);
      if (index > -1) {
        if (index > 0) {//省份不在第一位，将省份之前的字段截取出来识别为名称
          this.out.user_name = this.address.substr(0, index).trim();
        }
        this.out.province = k;
        this.address = this.address.substr(index + k.length);
        for (let kk in this.filtered.province) {
          if (this.address.indexOf(this.filtered.province[kk]) === 0) {
            this.address = this.address.substr(this.filtered.province[kk].length);
          }
        }
        return province[k]+1;
      }
    }
  }

  /*过滤市*/
  filterCity(city)
  {
    for (let k in city) {
      let index = this.address.indexOf(k);
      if (index > -1 && index < 3) {
        this.out.city = k;
        this.address = this.address.substr(index + this.out.city.length);
        for (let kk in this.filtered.city) {
          if (this.address.indexOf(this.filtered.city[kk]) === 0) {
            this.address = this.address.substr(this.filtered.city[kk].length);
          }
        }
        return city[k]+1;
      }
    }
    return null;
  }

  /*过滤区*/
  filterArea(area)
  {
    if (area) {
      for (let k in area) {
        let index = this.address.indexOf(k);
        if (index > -1 && index < 3) {
          this.out.area = k;
          this.address = this.address.substr(index + this.out.area.length);
          this.out.detailed = this.address.trim();
          return area[k]+1;
        }
      }
    }
  }

  getCity(address)
  {
    address = '收货人: 宝工 手机号码: 13535135356 所在地区: 浙江省杭州市余杭区仓前街道 详细地址: 良睦路1399号 昌源清苑8栋4单元';
    address = '收货人: 宝工 北京市朝阳区富康路姚家园3楼150-0000-0000马云';
    address = '陕西省西安市未央区草滩八路中心小区5排35号，张黄宇 13700278269';
    address = '李澳 13020550835 山东省 聊城市 东昌府区 松桂路孟达国际新城';
    address = '陕西省西安市未央区草滩八路中心小区菜鸟驿站（请放菜鸟驿站，其他地方拒收并投诉到底）';

    //this.setAddress(address);
    this.formatSpecialArea();
    this.getCity1();
    return ;
    this.setAddress(address);
    this.filterPhone();
    this.format.province = this.formatProvince(this.in.all);/*格式化省*/
    let select_province = this.filterProvince(this.format.province);/*省*/
    if(select_province){
      this.format.city = this.formatCity(this.in.all[select_province-1]['city']);/*格式化市*/
      let select_city = this.filterCity(this.format.city);/*市*/
      if(select_city){
        this.format.area = this.formatArea(this.in.all[select_province-1]['city'][select_city-1]['area']);/*格式化区*/
        let select_area = this.filterArea(this.format.area);/*区*/
        if(select_area){

        }else{
          this.getCity1();
        }
      }else{
        this.getCity1();
      }
    }
    console.log(this.out);
  }

  getCity1()
  {
    let out={
      'user_name':'',//用户名
      'province':'',//省
      'city':'',//市
      'area':'',//区
      '_area':'',//_区
      'detailed':'',//详细地址
    };
    let indexOf={
      'area':0,
      'city':0
    }
    let area_arr=['县','区','旗'];
    for(let i=0;i<area_arr.length;i++){
      indexOf.area=this.address.indexOf(area_arr[i]);
      if (indexOf.area > -1){
        if (area_arr[i]==='旗') {
          out.area = this.address.substr(indexOf.area - 1, 2);
        }
        indexOf.city=this.address.lastIndexOf('市', indexOf.area);
        if (indexOf.city > -1){
          out.area = this.address.substr(indexOf.city + 1, indexOf.area - indexOf.city);
        }else{
          out.area = this.address.substr(indexOf.area - 2, 3);
        }
      }
    }
    if (indexOf.area > -1){
      out.detailed=this.address.substr(indexOf.area + 1);
    }else{
      if (this.address.indexOf('市') > -1) {
        indexOf.area=this.address.split(" ")[0].indexOf("市");
        if (indexOf.area > -1) {
          out.area = this.address.split(" ")[0].substr(0, indexOf.area + 1);
          out.detailed = this.address.split(" ")[0].substr(indexOf.area + 1);
          out.user_name  = this.address.split(" ")[1];
        } else {
          indexOf.area=this.address.split(" ")[1].indexOf("市");
          out.area = this.address.split(" ")[1].substr(0, indexOf.area + 1);
          out.detailed = this.address.split(" ")[1].substr(indexOf.area + 1);
          out.user_name  = this.address.split(" ")[0];
        }
      } else {
        out.detailed=this.address;
      }
    }
    console.log(out.detailed);
    area_arr=['市','盟','州'];
    return ;
    for(let i=0;i<area_arr.length;i++){
      indexOf.area=this.address.indexOf(area_arr[i]);
      if (indexOf.area > -1){
        if (area_arr[i]==='市') {
          out._area = this.address.substr(indexOf.area - 2, 2);
        }
        if(!mCity[out._area]){
          out._area = this.address.substr(indexOf.area - 2, 2);
        }
      }
    }
  }
}

export default Address;
