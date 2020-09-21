import AlertText from './src/Alert/Text.vue';
import BannerDiv from './src/Banner/Div.vue';
import BannerDiv1 from './src/Banner/Div1.vue';
import BannerImage from './src/Banner/Image.vue';
import LoadStart from './src/Load/Start.vue';
import ProductImage from './src/Product/Image.vue';
import ScrollLoad from './src/Scroll/Load.vue';
import RefreshRefresh from './src/Scroll/Refresh.vue';
import SelectCheckbox from './src/Select/Checkbox.vue';
import SelectRadio from './src/Select/Radio.vue';
import SelectSelect from './src/Select/Select.vue';

const components = [
    AlertText,
    BannerDiv,
    BannerDiv1,
    BannerImage,
    LoadStart,
    ProductImage,
    ScrollLoad,
    RefreshRefresh,
    SelectCheckbox,
    SelectRadio,
    SelectSelect,
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$ELEMENT = {
        size: opts.size || '',
        zIndex: opts.zIndex || 2000
    };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.01.2',
    install,
    AlertText,
    BannerDiv,
    BannerDiv1,
    BannerImage,
    LoadStart,
    ProductImage,
    ScrollLoad,
    RefreshRefresh,
    SelectCheckbox,
    SelectRadio,
    SelectSelect,
};
