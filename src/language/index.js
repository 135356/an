import store from '@/store'

class Language {
    state = 1;
    language_pack = {};
    language_current = 'zh';

    constructor(lang) {
        this.set(lang); //设置语言
        this.appLanguage(); //原生语言
    }

    set(lang){
        /*如果有传递语言就使用传递过来的语言，否则使用浏览器语言*/
        if (lang) {
            lang = this.get(2,lang);
        }else{
            lang = this.getNavigator(2);
        }
        this.language_current = lang;
        try {
            if (lang === 'zh') {//中文不匹配
                this.state = 0;
                return;
            }
            this.language_pack = require('@/assets/language/' + lang + '.json');
        } catch (err) {
            this.language_pack = require('@/assets/language/en.json');
            console.error(err);
        }
    }

    /*原生语言*/
    appLanguage(){
        this.getApp().then(res=>{
            if(res!==-1){
                let language_current = this.get();
                if(language_current!==res){
                    localStorage.setItem('price_appLanguage',res);
                    window.location.reload(true); //刷新页面
                }
            }else{
                return localStorage.removeItem('price_appLanguage');
            }
        });
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
    get(length,language) {
        length = length || 2;
        language = language || this.language_current;
        language = language.toLowerCase();
        switch (language) {
            case 'cn':
                language = 'zh';
                break;
        }
        return language.substr(0, length);
    }
    //获取浏览器系统语言
    getNavigator(length){
        length = length || 2;
        //当前的浏览器语言Firefox、Chrome、Safari、Opera/操作系统设定的自然语言IE6、IE7、IE8/当前操作系统的缺省语言/当前的浏览器语言
        let language = navigator.language || navigator.userLanguage || navigator.systemLanguage || navigator.browserLanguage;
        return this.get(length,language);
    }
    //获取原生app语言
    getApp(length){
        length = length || 2;
        return new Promise((resolve)=> {
            price.getData({
                key: 'appLanguage', //'localelang',
                onSuccess:(data)=>{
                    let r_data;
                    if (data.value && data.value != '' && data.value!='undefined') {
                        r_data = data.value.toLowerCase();
                        switch(r_data){ //原生设置的语言
                            case 'big5': //繁体
                                r_data='zh';
                                break;
                            case 'zh-hans': //简体
                                r_data='zh';
                                break;
                        }
                    }
                    if(r_data){
                        resolve(this.get(length,r_data));
                    }else{
                        resolve(-1);
                    }
                }, onError:function(){
                    resolve(-1);
                }
            });
        });
    }

    /*转换*/
    to(text) {
        if (!text) return '';
        if (this.state) {
            if (this.language_pack[text]) {
                return this.language_pack[text];
            } else {
                console.info(text + '|null:' + this.language_current);
                return text;
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
