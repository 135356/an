import an from './an/index.js';
import data from './data/index.js';
import jq from './jq/index.js';
import language from './language/index.js';
import link from './link/index.js';
import random from './random/index.js';
import video from './video/index.js';

const install = function(Vue, opts = {}) {
    Vue.prototype.$An_an=new an();
    Vue.prototype.$An_data=new data();
    Vue.prototype.$An_jq=new jq();
    Vue.prototype.$An_language=new language();
    Vue.prototype.$An_link=new link();
    Vue.prototype.$An_random=new random();
    Vue.prototype.$An_video=new video();
    Vue.prototype._=(value)=>{return Vue.prototype.$An_language.to(value)};
    Vue.filter('_',(value)=>{
        return Vue.prototype.$An_language.to(value);
    });
    Vue.prototype.$An_data.load.model=2; //1进度条,2转圈圈
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.01.2',
    install,
    an,
    data,
    jq,
    language,
    link,
    random,
    video,
};