import Axios from 'axios'
import Qs from 'qs'

class Ajax {
    axios;
    api = ''; //api头
    asset = 'http://a1.a/'; //资源路径头
    debug = 0;
    this__ = '';
    price = ''; //app交互
    language=''; //语言
    load = {
        model: 1,
        request: 0,
        is_repeat: {},
    }

    constructor() {
        if (typeof(price) !== "undefined") {
            this.price=price;
            this.api=this.price.host;
        }
        this.axios = Axios.create({
            baseURL: this.api, //基础url前缀
            headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'}, //请求头信息XMLHttpRequest是Ajax异步请求方式，为null则传统同步请求
            timeout: 30000, //设置超时时间
            responseType: 'json', //返回数据类型,默认也是json
            transformRequest: [function (data) {
                return Qs.stringify(data) //对json数据转成&字符拼接的形式
            }],
        });
    }

    /*请求拦截器*/
    request(fun) {
        this.axios.interceptors.request.use((config) => {
            this.load.request++;
            fun && fun(this.load.request);
            return config;
        }, function (error) {
            console.error(error);
        });
    }

    /*响应拦截器*/
    response(fun) {
        this.axios.interceptors.response.use((response) => {
            this.load.request--;
            if (!this.load.request) {
                fun && fun();
            }
            return response;
        }, function (error) {
            console.error(error);
        });
    }

    setAuth_(access_token) {
        if (access_token) {
            this.axios.interceptors.request.use(function (config) {
                /*会生成一个Authorization: Bearer token头信息*/
                config.headers['Authorization'] = 'Bearer ' + access_token;
                return config;
            }, function (error) {
                return Promise.reject(error);
            });
        }
    }

    /*地址方法*/
    map() {
        return new Promise((resolve) => {
            this.price.on("GPSLocation", function (data) {
                resolve(data);
            });
        });
    }

    /*上传图片，通过安卓api*/
    uploadMedia(){
        return new Promise((resolve)=> {
            this.price.getPhoto ({
                type:"all",
                totalcount: 1, //上传总数，每调用一次上传一张
                iscroppic:this.isIOS(), //是否ios终端
                from:"AddInfo", //未发现作用
                onSuccess: function(data){
                    let type = data.photos[0].split('.')[1];
                    if (type==='png' || type==='gif' || type==='jpeg' || type==='jpg' || type==='bmp'){
                        type='img';
                    }else if (type==='mp4'){
                        type='video';
                    }else if(type==='mp3'){
                        type='music';
                    }
                    resolve({'address':data.photos[0],'code':1,'type':type});
                }, onError:function(){
                    resolve({'address':null,'code':0,'type':null});
                }
            });
        });
    }

    /*上传图片常用，返回的是图片地址*/
    uploadMedia1()
    {
        return new Promise((resolve)=> {
            let file = event.target.files;
            let createObjectURL = function(blob){
                return window[window.webkitURL?'webkitURL':'URL']['createObjectURL'](blob);
            };
            if(file[0]){
                let type = file[0]['type'];
                let code = 1;
                if (type==='image/png' || type==='image/gif' || type==='image/jpeg' || type==='image/bmp'){
                    type='img';
                }else if (type==='mp4'){
                    type='video';
                }else if(type==='mp3'){
                    type='music';
                }else{
                    code=0;
                }
                resolve({'address':createObjectURL(file[0]),'code':code,'type':type});
            }
        });
    }

    /*上传图片，返回的是资源码*/
    uploadMedia2()
    {
        return new Promise((resolve)=> {
            let file = event.target.files;
            let reader = new FileReader();
            for(let i = 0;i<file.length;i++){
                //上传类型判断
                let name = file[i].name;
                let place = name.lastIndexOf(".");
                if (place !== -1){
                    let postfix = name.substr(place+1).toLowerCase();
                    if (postfix=='jpg' || postfix=='jpeg' || postfix=='png' || postfix=='bmp' || postfix=='gif'){
                        reader.onload = (e)=>{
                            resolve({'media':reader.result,'code':1,'type':postfix});
                        }
                    }
                }else{
                    resolve({'media':place,'code':0,'type':null});
                }
            }
        });
    }

    /*登录*/
    login(access_token) {
        access_token = access_token || this.link_get['access_token'];
        return new Promise((resolve) => {
            this.axios.post('/applogin/loginfo2.php', {}, {
                headers: {access_token: access_token}
            }).then(res => {
                res = res.data;
                res.returncode = parseInt(res.returncode);
                if (res.returncode == 0) {
                    res.loginUser.sex = parseInt(res.loginUser.sex)||0;
                    res.loginUser.iscompleted = parseInt(res.loginUser.iscompleted)||0;
                    //res.loginUser.ccidlist = res.ccidlist;
                    //res.loginUser.returncode = res.returncode;
                    let r_data={
                        'id': res.loginUser['userid'],
                        'accid': res.loginUser['accid'],
                        'md5accid': res.loginUser['md5accid'],
                        'sex': res.loginUser['sex'],
                        'email': res.loginUser['email'],
                        'iscompleted': res.loginUser['iscompleted'],
                        'name': res.loginUser['nickname'],
                        'img': res.loginUser['headimg'],
                        'sign': res.loginUser['sign'],
                        'current_city': res.loginUser['currentcity'],
                        'language': this.this__.$An_language.get(),//res.loginUser['defaultlanguage'],
                        'language_code': res.loginUser['procode'],
                        'access_token': this.link_get['access_token'],
                    }
                    this.createLocal_('user_', r_data);
                    this.this__.$store.dispatch('userA', r_data).then(()=>{
                        resolve(res);
                    });
                } else {
                    this.deleteLocal_('user_');
                    this.this__.$store.dispatch('userA', {}).then(()=>{
                        resolve(res);
                    });
                    console.error(res);
                }
                resolve(res);
            });
        });
    }

    /*注销登录*/
    logOff()
    {
        this.deleteLocal_('user_');
        this.deleteLocal('user_');
    }

    /*获取缓存的用户信息*/
    getUserLocal(key)
    {
        this.language = this.this__.$An_language.get();
        if(this.language==='zh'){this.language='ch';} //java后台请求数据时需要的是ch
        let set_user = (F)=>{
            this.user(this.this__.$store.state.user['id']);
            if(key){
                F(this.this__.$store.state.user[key]);
            }else{
                F(this.this__.$store.state.user);
            }
        }
        let is_longin = ()=>{
            if(this.this__.$store.state.user){
                if(this.this__.$store.state.user['access_token']){
                    if(this.this__.$store.state.user['access_token']===this.link_get['access_token']){
                        return 200;
                    }else{
                        return 0;
                    }
                }else{
                    return 100;
                }
            }else{
                return 0;
            }
        }
        return new Promise((resolve)=>{
            if(!is_longin()){
                this.login().then(() => {
                    set_user(resolve);
                }).catch(err => {
                    console.error(err);
                    resolve(0);
                });
            }else if(is_longin()===100){
                let long_in = this.getLocal_('user_');
                if(long_in){
                    if(long_in['access_token']&&long_in['access_token']===this.link_get['access_token']){
                        this.this__.$store.dispatch('userA', long_in).then(()=>{
                            set_user(resolve);
                        });
                    }else{
                        this.login().then(() => {
                            set_user(resolve);
                        }).catch(err => {
                            console.error(err);
                            resolve(0);
                        });
                    }
                }else{
                    this.login().then(() => {
                        set_user(resolve);
                    }).catch(err => {
                        console.error(err);
                        resolve(0);
                    });
                }
            }else if(is_longin()===200){
                set_user(resolve);
            }
        });
    }
}

export default Ajax;
