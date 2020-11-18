import Ccc from './ccc/index.js';
import Data from './data/index.js';
import Dom from './dom/index.js';
import Language from './language/index.js';
import Link from './link/index.js';
import Random from './random/index.js';
import Rem from './rem/index.js';
import video from './video/index.js';

const install = function(Vue, opts = {}) {
    Vue.prototype.$An=new Ccc();
    Vue.prototype.$An_data=new Data();
    Vue.prototype.$An_jq=new Dom();//将被遗弃
    Vue.prototype.$An_dom=new Dom();
    Vue.prototype.$An_link=new Link();
    Vue.prototype.$An_language=new Language(Vue.prototype.$An_link.get('ipcode'));
    Vue.prototype.$An_random=new Random();
    Vue.prototype.$An_rem=new Rem();
    Vue.prototype._=(value)=>{return Vue.prototype.$An_language.to(value)};
    Vue.filter('_',(value)=>{
        return Vue.prototype.$An_language.to(value);
    });
    new video(Vue.prototype);
    Vue.prototype.$An_rem.set();
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
    Rem,
    video,
};