import Local from './Local'
import Ajax from './Ajax'
import Api from './Api'

function mix(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

class Data extends mix(Local,Ajax,Api) {
    user_id = ''; //在调用了login登录之后才会有
    link_get = []; //链接里的参数
    is_repeatedly_ = 0; //开始请求时为真，避免多个重复请求

    constructor() {
        super();
    }

    this_(this_) {
        this.this__ = this_;
        this.link_get = this.this__.$An_link.get();
        this.this__.$store.dispatch('login', this.link_get).then((res)=>{
            this.user_id=res.id;
        });//vuex登录保存
        return this;
    }

    /*
    主要作用避免反复请求登录接口，当一个需要登录的接口进行登录之后另一个需要登录的接口则直接登录
    反复获取user_id获取不到超出number次后重新登录
    */
    repeatedly_(number) {
        number = number || 10;
        return new Promise((resolve) => {
            let interval_i = 0;
            let interval = setInterval(() => {
                if (this.user_id) {
                    clearInterval(interval);
                    resolve(1);
                } else {
                    if (interval_i++ > number) {//实在没有就调登录来获取
                        if (!this.is_repeatedly_) {//避免多个地方同时调用而产生多个循环
                            this.is_repeatedly_ = 1;
                            this.this__.$store.dispatch('login', this.link_get['access_token']).then((res)=>{
                                this.user_id=res.id;
                                clearInterval(interval);
                            });
                        }
                    }
                }
            }, 200);
        });
    }
}

export default Data;
