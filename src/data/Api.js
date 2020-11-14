class Api{
    /*用户基本信息*/
    getUserInfo(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/getuserinfo',{
                        'tuserid':data['id'],
                        'userid':this.user_id
                    }).then(res=>{
                        let r_data = '';
                        if(parseInt(res.data.returncode)===0){
                            r_data = {};
                            res = res.data.userinfo;
                            r_data['id']=data['id'];
                            r_data['name']=res['username'];
                            r_data['img']=res['headimg']; //头像
                            r_data['sex']=parseInt(res['sex']); //性别 1男 2女
                            r_data['age']=res['age']; //年龄
                            r_data['birthday']=res['birth']; //生日
                            r_data['phone']=res['phone']; //手机号
                            r_data['signature']=res['autograph']; //签名
                            r_data['is_buddy']=parseInt(res['friends']); //是否好友
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*推荐的人*/
    getRecommend()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/getrecommend',{
                        'userid':this.user_id
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.recommonlist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['longitude']=res[i]['lbslgt']; //经度
                                r_data[i]['latitude']=res[i]['lbslat']; //纬度
                                r_data[i]['sex']=parseInt(res[i]['sex'])||1; //性别 1男 2女
                                r_data[i]['signature']=res[i]['sign']||res[i]['username']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*附近的人*/
    getNearby()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/getnearby',{
                        'userid':this.user_id
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.nearbylist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['sex']=parseInt(res[i]['sex']); //性别 1男 2女
                                r_data[i]['signature']=res[i]['sign']||res[i]['username']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*同城的人*/
    getSameCity()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/selCityDynamic',{
                        'userid':this.user_id
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.cityDynamicList;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['city_arr']=res[i]['cityDynamicList']; //同城数组
                                r_data[i]['classify_id']=res[i]['scatid']; //分类id
                                r_data[i]['longitude']=res[i]['lbslgt']; //经度
                                r_data[i]['latitude']=res[i]['lbslat']; //纬度
                                r_data[i]['sex']=parseInt(res[i]['sex']); //性别 1男 2女
                                r_data[i]['signature']=res[i]['sign']||res[i]['username']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*兴趣的人*/
    getInterest(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/selinterest',{
                        'scatid':data['classify_id'],
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.catlist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['longitude']=res[i]['lbslgt']; //经度
                                r_data[i]['latitude']=res[i]['lbslat']; //纬度
                                r_data[i]['sex']=parseInt(res[i]['sex']); //性别 1男 2女
                                r_data[i]['signature']=res[i]['sign']||res[i]['username']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*声优的人*/
    getVoice()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/getexcellent',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.excellentlist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                    'img':res[i]['headimg'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['voice']=res[i]['audio']; //声音
                                r_data[i]['longitude']=res[i]['lbslgt']; //经度
                                r_data[i]['latitude']=res[i]['lbslat']; //纬度
                                r_data[i]['sex']=parseInt(res[i]['sex']); //性别 1男 2女
                                r_data[i]['signature']=res[i]['sign']||res[i]['username']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                                r_data[i]['play']=false; //是否播放
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我的好友*/
    getBuddy()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/friend',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.back;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                    'img':res[i]['headimg'],
                                };
                                r_data[i]['voice']=res[i]['audio']; //声音
                                r_data[i]['sex']=parseInt(res[i]['sex']); //性别 1男 2女
                                r_data[i]['signature']=res[i]['autograph']; //签名
                                r_data[i]['distances']=res[i]['distance']; //距离
                                r_data[i]['is_buddy']=parseInt(res[i]['status1']); //是否好友
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我关注的人*/
    getAttention(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/myfollow',{
                        'start':data['page'],
                        'limit':data['limit'],
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.followlist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['fuserid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我的粉丝*/
    getFans(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/fanslist',{
                        'page':data['page'],
                        'rows':data['limit'],
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.fanslist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'img':res[i]['headimg'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['sex']=res[i]['sex'];
                                r_data[i]['signature']=res[i]['autograph'];
                                r_data[i]['is_buddy']=res[i]['eachfollow'];//是否关注的人
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*猜你喜欢的人*/
    getLike()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/apphome/getuserlike',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = [];
                        if(parseInt(res.data.returncode)===0){
                            res = res.data.likelist;
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['user']={
                                    'id':res[i]['userid'],
                                    'name':res[i]['username'],
                                };
                                r_data[i]['img']=res[i]['coverimg']; //封面
                                r_data[i]['city']=res[i]['lbsareaname']; //城市
                                r_data[i]['longitude']=res[i]['lbslgt']; //经度
                                r_data[i]['latitude']=res[i]['lbslat']; //纬度
                                r_data[i]['signature']=res[i]['autograph']; //签名
                                r_data[i]['distances']=res[i]['kill']; //距离
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*交友目的*/
    getPurpose()
    {
        return new Promise((resolve)=>{
            this.axios.post('/apphome/getuserpurpose').then(res=>{
                let r_data = [];
                if(parseInt(res.data.returncode)===0){
                    res = res.data.purposelist;
                    for(let i=0;i<res.length;i++){
                        r_data[i]={};
                        r_data[i]['id']=res[i]['spid'];
                        r_data[i]['img']=res[i]['img'];
                        r_data[i]['name']=res[i]['pname'];
                        r_data[i]['value']=res[i]['spid'];
                    }
                }else{
                    console.error(res);
                }
                resolve(r_data);
            });
        });
    }

    /*添加/删除好友*/
    setBuddy(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/appfriend/getaddfriend',{
                        'friendid':data['id'],
                        'status':data['state'],//0删除，1添加
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=1;
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*添加/取消关注*/
    setAttention(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/appfriend/getaddfriend',{
                        'friendid':data['id'],
                        'status':data['state']||0,//0删除，1添加
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=1;
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*个人动态*/
    getUserDynamic()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/dynamicinterface',{
                        'userid':this.user_id
                    }).then(res=>{
                        let r_data = '';
                        if(parseInt(res.data.returncode)===0){
                            r_data = {};
                            res = res.data['userinfodb'];
                            r_data['id']=res['userid'];
                            r_data['name']=res['username'];
                            r_data['state']=res['status'];
                            r_data['age']=res['age']; //年龄
                            r_data['sex']=res['sex']; //性别
                            r_data['accid']=res['2u_accid'];
                            r_data['a2u_id']=res['a2u_accid'];
                            r_data['area_code']=res['areacode']; //国家电话区号
                            r_data['phone']=res['phone']; //手机号
                            r_data['type']=res['acctype']; //用户类型
                            r_data['signature']=res['autograph']; //个人签名
                            r_data['birthday']=res['birth']; //生日
                            r_data['create_time']=res['createtime']; //创建时间
                            r_data['modify_time']=res['modifytime']; //修改时间
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*粉丝数量*/
    getTotalFans()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/fanss',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=res.data['fanss'];
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我的组数量*/
    getTotalGroup()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/groupnums',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=res.data['groupnums'];
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我的好友数量*/
    getTotalBuddy()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/friendnums',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=res.data['friendnums'];
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我关注的人数量*/
    getTotalAttention()
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/myfollow1',{
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data=0;
                        if(parseInt(res.data.returncode)===0){
                            r_data=res.data['myfollow1'];
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }

    /*我的动态内容*/
    getDynamic(data)
    {
        return new Promise((resolve)=>{
            this.repeatedly_(20).then(res=> {
                if (res) {
                    this.axios.post('/dynamichh/userdynamic',{
                        'page':data['page'],
                        'rows':data['limit'],
                        'userid':this.user_id,
                    }).then(res=>{
                        let r_data = '';
                        if(parseInt(res.data.returncode)===0){
                            r_data = [];
                            res = res.data['userdynamics'];
                            for(let i=0;i<res.length;i++){
                                r_data[i]={};
                                r_data[i]['state']=res[i]['status']; //状态
                                r_data[i]['city']=res[i]['lbsname']; //城市
                                r_data[i]['img']=res[i]['imgs']; //图片
                                r_data[i]['voice']=res[i]['audio']; //声音
                                r_data[i]['video']=res[i]['video']; //视频
                                r_data[i]['content']=res[i]['content']; //内容
                                r_data[i]['comment']=res[i]['countcomment']; //评论数量
                                r_data[i]['like']=res[i]['countlike']; //点赞数量
                                r_data[i]['create_time']=res['createtime']; //创建时间
                                r_data[i]['modify_time']=res['modifytime']; //修改时间
                                r_data[i]['play']=false; //是否播放
                            }
                        }else{
                            console.error(res);
                        }
                        resolve(r_data);
                    });
                }
            });
        });
    }
}

export default Api;