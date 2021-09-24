import Ccc from './ccc/index.js';
import Data from './data/index.js';
import Dom from './dom/index.js';
import Language from './language/index.js';
import Link from './link/index.js';
import Random from './random/index.js';
import PxRem from './px_rem/index.js';
import video from './video/index.js';
import Address from './address/index.js';

const install = function(Vue, opts = {}) {
    Vue.prototype.$An=new Ccc();
    Vue.prototype.$An_dom=new Dom();
    Vue.prototype.$An_link=new Link();
    Vue.prototype.$An_language=new Language(localStorage.getItem('price_appLanguage'));
    Vue.prototype.$An_data=new Data();
    Vue.prototype.$An_data.setLanguage(Vue.prototype.$An_language.get()); //设置api的语言
    Vue.prototype.$An_random=new Random();
    Vue.prototype.$An_px_rem=new PxRem();
    Vue.prototype.$An_address=new Address();
    Vue.prototype._=(value)=>{return Vue.prototype.$An_language.to(value)};
    Vue.filter('_',(value)=>{
        return Vue.prototype.$An_language.to(value);
    });
    new video(Vue.prototype);
    Vue.prototype.$An_px_rem.set();
    Vue.prototype.$An_data.load.model=2; //1进度条,2转圈圈
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.01.2',
    install,
    Ccc,
    Data,
    Dom,
    Language,
    Link,
    Random,
    PxRem,
    video,
    Address,
};