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
    }

    constructor() {
        if (typeof(price) !== "undefined") {
            this.price=price;
            this.api=this.price.host;
        }
        this.axios = Axios.create({
            baseURL: this.api, //基础url前缀
            //headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/x-www-form-urlencoded'}, //请求头信息XMLHttpRequest是Ajax异步请求方式，为null则传统同步请求
            timeout: 30000, //设置超时时间
            responseType: 'json', //返回数据类型,默认也是json
            /*transformRequest: [function (data) {
                return Qs.stringify(data) //对json数据转成&字符拼接的形式
            }],*/
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
                        'language': this.this__.$An2_Language.get(),//res.loginUser['defaultlanguage'],
                        'language_code': res.loginUser['procode'],
                        'access_token': this.link_get['access_token'],
                    }
                    this.createStorage_('user_', r_data);
                    this.this__.$store.dispatch('userA', r_data).then(()=>{
                        resolve(res);
                    });
                } else {
                    this.deleteStorage_('user_');
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
        this.deleteStorage_('user_');
        this.deleteStorage('user_');
    }

    /*获取缓存的用户信息*/
    getUserLocal(key)
    {
        this.language = this.this__.$An2_Language.get();
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
                let long_in = this.getStorage_('user_');
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
