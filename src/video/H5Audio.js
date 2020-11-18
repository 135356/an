class H5Audio {
    state=false;
    elem='';
    elem1='';
    volume=0;//音量
    total_time=0;//总时长(毫秒)
    current_time=0;//当前播放时间

    constructor() {}

    elem_(e)
    {
        if(e){
            if(this.elem){
                this.elem1=this.elem;
            }
            this.elem=e;
        }else{
            this.total_time=0;
            this.current_time=0;
        }
    }

    getTotalTime(e)
    {
        return parseInt(e.duration*1000);
    }

    /*设置播放点*/
    setPlayTime(v)
    {}

    /*设置音量*/
    setVol(number)
    {}

    /*播放*/
    play(e)
    {
        this.elem_(e);
        this.state=true;
        if(!this.state){
            this.elem.play();
        }else{
            if(this.elem1){
                this.elem1.pause();
            }
            this.elem.play();
        }
        return this;
    }

    /*暂停*/
    pause()
    {
        this.elem_();
        if(this.state){
            this.state=false;
            this.elem.pause();
        }
        return this;
    }
}

export default H5Audio;