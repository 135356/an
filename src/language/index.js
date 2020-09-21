class Language {
    state = 1;
    language_pack = {};
    language_current = 'zh';

    constructor(lang) {
        if (lang) {
            lang = lang.toLowerCase();
            switch (lang) {
                case 'cn':
                    lang = 'zh';
                    break;
            }
        }
        this.language_current = lang ? lang : navigator.language || navigator.userLanguage;//用户使用的语言或常规浏览器语言和IE浏览器
        try {
            if (this.get() == 'zh') {//中文不需要匹配
                this.state = 0;
                return;
            }
            this.language_pack = require('./assets/language/' + this.get() + '.json');
        } catch (err) {
            this.state = 0;
            console.error(err);
        }
    }

    /*获取语言，截取前2位字符*/
    get(length) {
        length = length || 2;
        return this.language_current.substr(0, length);
    }

    to(text) {
        if (!text) return '';
        if (this.state) {
            if (this.language_pack[text]) {
                return this.language_pack[text];
            } else {
                console.info(text + '|未配置' + this.language_current + '语言');
                return text;
            }
        } else {
            return text;
        }
    }
}

export default Language;
