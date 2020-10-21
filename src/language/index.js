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
            if (this.get() === 'zh') {//中文不匹配
                this.state = 0;
                return;
            }
            this.language_pack = require('@/assets/language/' + this.get() + '.json');
        } catch (err) {
            this.language_pack = require('@/assets/language/en.json');
            console.error(err);
        }
    }

    replace_(text)
    {
        text = encodeURIComponent(text);
        return text.replace(/^[0-9]+|%|\.|\*|!|-|'|\(|\)|~/g,'');
    }

    /*保存转码语言包*/
    saveJSON_(data, filename){
        if(!data) {
            console.error('Data Null');
            return;
        }
        if(!filename){filename = 'json.json';}
        if(typeof data === 'object'){
            data = JSON.stringify(data, undefined, 4);
        }
        let blob = new Blob([data], {type: 'text/json'}),e = document.createEvent('MouseEvents'),a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }

    /*获取语言，截取前2位字符*/
    get(length) {
        length = length || 2;
        return this.language_current.substr(0, length);
    }

    /*转换*/
    to(text) {
        if (!text) return '';
        if (this.state) {
            if (this.language_pack[text]) {
                return this.language_pack[text];
            } else {
                console.info(text + '|null:' + this.language_current);
                return '.@.'; //匹配不到为.@.，避免出现中文
            }
        } else {
            return text;
        }
    }

    /*显示*/
    show()
    {
        let data= [];
        for(let key in this.language_pack){
            data.push(this.replace_(key));
            //data[this.replace_(key)]=key;
        }
        //this.saveJSON_(data,this.get()+'.json');
        console.log(data);
    }
}

export default Language;
