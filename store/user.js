export default {
    state: {
        data:''
    },
    mutations: {
        userM(state, data)
        {
            state.data = data;
        },
    },
    actions: {
        /*登录*/
        login({commit}, data) {
            commit('userM', data);
        },
        /*注销登录*/
        logOff({commit})
        {
            commit('userM', '');
        }
    }
}
