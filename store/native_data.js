export default {
    state: {
        'height':{
            'top':5,
            'bottom':0
        },
        'scroll_top':{'an_scroll_id':{bottom: 0,height: 0,left: 0,right: 0,top: 0,width: 0,x: 0,y: 0}},
        'font_size':6
    },
    mutations: {
        heightM(state, data)
        {
            state['height'] = {
                'top':state['height']['top']+data['top'],
                'bottom':state['height']['bottom']+data['bottom']
            };
        },
        scroll_topM(state, data)
        {
            state['scroll_top'][data['id']] = data['data'];
        },
        font_sizeM(state, data)
        {
            state['font_size'] = data;
        }
    },
    actions: {
        /*获取原生顶部与底部高度*/
        getHeight({commit}) {
            return new Promise((resolve)=>{
                price.getData({
                    key: "top_bottom",
                    //完成
                    onFinish: function (data) {},
                    //成功
                    onSuccess: function (data) {
                        if(parseInt(data.returncode)===0){
                            data=data.value.split(',');
                            commit('heightM', {'top':parseInt(data[0])||0,'bottom':parseInt(data[1])||0});
                        }
                        resolve(this.state.native_data.height);
                    },
                    //失败
                    onError: function(error) {
                        console.error(error);
                        resolve('error');
                    }
                });
            });
        },
        /*监听滚动高度*/
        scroll_topA({commit},data) {
            if(data){commit('scroll_topM', data);}
        },
        /*监听字号*/
        font_sizeA({commit},data) {
            return new Promise((resolve)=> {
                let r_data;
                price.getData({
                    key: 'appfontsize',
                    onSuccess: function (data) {
                        if (parseInt(data.returncode) === 0) {
                            switch(parseFloat(data.value)){
                                case 1:r_data=6;
                                    break;
                                case 1.5:r_data=6.5;
                                    break;
                                case 2:r_data=7;
                                    break;
                                case 2.5:r_data=7.5;
                                    break;
                                case 3:r_data=8;
                                    break;
                            }
                            if(r_data){commit('font_sizeM', r_data);}
                        }
                        resolve(r_data);
                    },
                    onError: function (error) {
                        console.error(error);
                    }
                });
            });
        }
    }
}