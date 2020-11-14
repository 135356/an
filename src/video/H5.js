/*多个视频点击前就自动加载了视频仅控制是否播放*/
class H5 {
    state=false;
    elem={};
    volume=0;//音量
    total_time=0;//总时长
    current_time=0;//当前播放时间

    constructor() {}

    elem_(e)
    {
        if(e){
            this.state=true;
            //this.elem=event.target;
            this.elem=e;
            this.elem.addEventListener("volumechange", ()=>{
                this.volume = this.elem.volume;//获取当前音量
                //console.log(this.volume);
            });
            this.elem.addEventListener("loadedmetadata", ()=>{
                this.total_time = this.elem.duration;//获取总时长
            });
            this.elem.addEventListener("timeupdate", ()=>{
                this.current_time = this.elem.currentTime;//获取当前播放时间
                //console.log(this.current_time);
            });
        }else{
            this.state=false;
            this.elem={};
            this.volume=0;
            this.total_time=0;
            this.current_time=0;
        }
    }

    /*设置播放点*/
    setPlayTime(v){
        if(this.state){
            if(v){
                this.elem.currentTime=this.current_time+10;
            }else{
                this.elem.currentTime=this.current_time-10;
            }
        }
        return this;
    }

    /*设置音量*/
    setVol(number){
        if(this.state){
            this.elem.volume=number||0;
        }
        return this;
    }

    /*播放*/
    playMp4(e)
    {
        this.elem_(e);
        if(this.state){
            this.elem.play();
        }
        return this;
    }

    /*暂停*/
    pauseMp4()
    {
        if(this.state){
            this.elem.pause();
        }
        this.elem_();
        return this;
    }
}

export default H5;