class Address {
    this__ = '';
    data = {
        country:'',
        province:'',
        city:'',
        area:'',
        other:{
            name:'', //收货人姓名
            phone:'', //收货人手机号
            tel:'', //收货人固话
            postcode:'', //邮编
            detailed:'', //详细地址信息
        }
    };
    /*需要去掉的文字*/
    filtered = {
        special: ['县', '区', '旗', '市', '盟', '州'],/*特殊地区*/
        province: ['特别行政区', '古自治区', '维吾尔自治区', '壮族自治区', '回族自治区', '自治区', '省省直辖', '省', '市'],//省
        city: ['布依族苗族自治州', '苗族侗族自治州', '自治州', '州', '市', '县'],//市
        other: ['地址', '收货地址', '收货人', '收件人', '收货', '邮编', '电话', '手机号码', '所在地区', '：', ':', '；', ';', '，', ',', '。', ' '],//其它
    }
    /*用户输入的地址*/
    address = '';

    constructor() {
    }

    this_(this_) {
        this.this__ = this_;
        return this;
    }

    /*设置地址*/
    setAddress(address) {
        this.address = address;
        this.filtered.other.forEach(str => {
            this.address = this.address.replace(new RegExp(str, 'g'), ' ')
        });
        //多个空格替换为一个
        this.address = this.address.replace(/ {2,}/g, ' ');
    }

    /*过滤电话*/
    filterPhone() {
        this.address = this.address.replace(/(\d{3})-(\d{4})-(\d{4})/g, '$1$2$3'); //整理电话格式
        let r_data={'phone':'','tel':''};
        //移动电话
        let mobile = (/(86-[1][0-9]{10})|(86[1][0-9]{10})|([1][0-9]{10})/g).exec(this.address);
        if (mobile) {
            r_data['phone']=mobile[0];
            this.address = this.address.replace(mobile[0], ' ');
        }
        //固话
        let tel = (/(([0-9]{3,4}-)[0-9]{7,8})|([0-9]{12})|([0-9]{11})|([0-9]{10})|([0-9]{9})|([0-9]{8})|([0-9]{7})/g).exec(this.address);
        if (tel) {
            r_data['tel']=tel[0];
            this.address = this.address.replace(tel[0], ' ');
        }
        return r_data;
    }

    getCountry(){
        let is = 0;
        let index_of = -1;
        return new Promise((resolve)=>{
            this.this__.$An_data.getCountry().then(res => {
                let r_data={'data':res,'select_i':-1};
                for (let i=0;i<res.length;i++) {
                    index_of = this.address.indexOf(res[i]['name']);
                    if (index_of > -1) {
                        is = 1;
                        r_data['select_i'] = i;
                        this.address = this.address.replace(res[i]['name'], '');
                    }
                }
                if (!is) {
                    r_data['select_i'] = 3; //默认中国
                }
                resolve(r_data);
            });
        });
    }

    getProvince(data){
        let is = 0;
        let index_of = -1;
        return new Promise((resolve)=>{
            this.this__.$An_data.getProvince(data).then(res => {
                let r_data={'data':res,'select_i':-1};
                for (let i=0;i<res.length;i++) {
                    index_of = this.address.indexOf(res[i]['name']);
                    if (index_of > -1) {
                        is = 1;
                        r_data['select_i'] = i;
                        if (index_of > 0) {//省份不在第一位，将省份之前的字段截取出来识别为收货人名称
                            this.data.other.name = this.address.substr(0, index_of).trim();
                        }
                        this.address = this.address.substr(index_of + res[i]['name'].length);
                        for (let k in this.filtered.province) {
                            if (this.address.indexOf(this.filtered.province[k]) === 0) {
                                this.address = this.address.substr(this.filtered.province[k].length);
                            }
                        }

                    }
                }
                resolve(r_data);
            });
        });
    }

    getCity(data){
        let is = 0;
        let index_of = -1;
        return new Promise((resolve)=>{
            this.this__.$An_data.getCity(data).then(res => {
                let r_data={'data':res,'select_i':-1};
                for (let i=0;i<res.length;i++) {
                    index_of = this.address.indexOf(res[i]['name']);
                    if (index_of > -1 && index_of < 3) {
                        is = 1;
                        r_data['select_i'] = i;
                        this.address = this.address.substr(index_of + res[i]['name'].length);
                        for (let k in this.filtered.city) {
                            if (this.address.indexOf(this.filtered.city[k]) === 0) {
                                this.address = this.address.substr(this.filtered.city[k].length);
                            }
                        }
                    }
                }
                resolve(r_data);
            });
        });
    }

    getArea(data){
        let is = 0;
        let index_of = -1;
        return new Promise((resolve)=>{
            this.this__.$An_data.getArea(data).then(res => {
                let r_data={'data':res,'select_i':-1};
                for (let i=0;i<res.length;i++) {
                    index_of = this.address.indexOf(res[i]['name']);
                    if (index_of > -1 && index_of < 3) {
                        is = 1;
                        r_data['select_i'] = i;
                        this.address = this.address.substr(index_of + res[i]['name'].length);
                        this.data.other.detailed = this.address;
                    }
                }
                resolve(r_data);
            });
        });
    }

    antiClockwise(){}

    /*正向匹配*/
    clockwise(address,tipsF) {
        return new Promise((resolve)=>{
            this.setAddress(address);
            let phone = this.filterPhone();
            this.data.other.tel=phone['tel'];
            this.data.other.phone=phone['phone'];
            this.getCountry().then(res=>{
                this.data.country=res;
                if(res['select_i']>-1){
                    this.getProvince({'id':res['data'][res['select_i']]['id']}).then(res=>{
                        this.data.province=res;
                        if(res['select_i']>-1){
                            this.getCity({'id':res['data'][res['select_i']]['id']}).then(res=>{
                                this.data.city=res;
                                if(res['select_i']>-1){
                                    this.getArea({'id':res['data'][res['select_i']]['id']}).then(res=>{
                                        this.data.area=res;
                                        resolve(this.data);
                                        if(res['select_i']<0){
                                            tipsF('alertA','未识别到：区');
                                        }
                                    });
                                }else{
                                    resolve(this.data);
                                    tipsF('alertA','未识别到：市');
                                }
                            });
                        }else{
                            resolve(this.data);
                            tipsF('alertA','未识别到：省');
                        }
                    });
                }else{
                    resolve(this.data);
                    tipsF('alertA','未识别到：国家');
                }
            });
        });
    }

    aiArea(address) {
        return this.clockwise(address);
    }
}

export default Address;
