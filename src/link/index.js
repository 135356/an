class Link {
    this__ = '';

    constructor() {
    }

    this_(this_) {
        this.this__ = this_;
        return this;
    }

    /*返回时跳转*/
    back(link, data) {
        let this_ = this.this__;
    }

    /*
    点击时跳转
    link里没有 / 则是以name跳转并使用的是params传参
    */
    to(link, data) {
        let number = link ? parseInt(link) : 0;
        if (number || number == 0) {
            window.history.go(number);
            //this_.$router.go(number);
        } else if(link.toLowerCase()==='close'){
            price.closeWeb({}); //关闭
        }else{
            let data_ = {};
            if (link.indexOf('//') != -1) {
                window.location.href = link;
                return;
            } else if ((/^\//).test(link)) {//链接地址
                data_['path'] = link;
                if (data) {
                    data_['query'] = data;
                }
            } else {
                if ((/^:/).test(link)){
                    data_['name'] = link.substr(1);
                }else{
                    data_['name'] = link;
                }
                if (data) {
                    data_['params'] = data;
                }
            }
            this.this__.$router.push(data_);
        }
    }

    set() {
    }

    /*
    获取链接里传递的参数
    接收params参数时key应该为:key，params的key在路由层定义的
    */
    get(key) {
        let data = [];
        let data1 = {};
        let this_ = this.this__;
        let get=window.location.href.replace(/(\?)|(#)/ig, '&');
        get=get.substr(get.indexOf('&'));
        if (get) {
            get=get.replace(/(\/)|(\\)/ig, '&');
            get=get.replace(/&{2,}/ig, '&');
            get=get.replace(/^&|&$/ig, '');
            get = get.split('&');
            for (let i = 0; i < get.length; i++) {
                data = get[i].split('=');
                if (data[1]) {
                    data1[data[0]] = data[1];
                }
            }
        }

        if (this_) {
            Object.assign(data1, this_.$route.query);
            if (key) {
                if ((/^:/).test(key)) {
                    if(key.substr(1)){
                        return this_.$route.params[key.substr(1)];
                    }else{
                        return this_.$route.params;
                    }
                } else {
                    return data1[key];
                }
            } else {
                return data1;
            }
        } else {
            if (key) {
                return data1[key];
            } else {
                return data1;
            }
        }
    }
}

export default Link;
