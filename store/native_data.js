export default {
    state: {
        'scroll_top':{'an_scroll_id':{bottom: 0,height: 0,left: 0,right: 0,top: 0,width: 0,x: 0,y: 0}},
        'load':{
            'state':-1
        }
    },
    mutations: {
        scroll_topM(state, data)
        {
            state['scroll_top'][data['id']] = data['data'];
        },
        loadM(state, data){
            state['load'] = data;
        }
    },
    actions: {
        /*监听滚动高度*/
        scroll_topA({commit},data) {
            if(data){commit('scroll_topM', data);}
        },
        /*加载动画*/
        loadA({commit},data){
            if(data){commit('loadM', data);}
        }
    }
}