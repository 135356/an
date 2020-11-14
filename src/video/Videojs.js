import video_js from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'

/*单个播放器，点击后加载视频并进行控制*/
class Videojs {
    this__ = '';
    audio_1 = {
        'state': false,
        'link': '',
        'Audio': {},
        'elem': {},
    }
    video_1 = {
        'state': false,
        'link': '',
        'Video': {},
        'elem': {},
    }

    constructor() {
        //this.audio_1.Audio = new Audio();
        this.audio_1.elem = document.createElement("AUDIO");
        this.audio_1.elem.onended = () => {
            this.audio_1.state = false;
            this.audio_1.link = '';
        };
    }

    this_(this_) {
        this.this__ = this_;
        return this;
    }

    /*播放视频基本配置*/
    playVideo_(monitorF) {
        return new Promise((resolve) => {
            let width = this.video_1.elem.offsetWidth + 'px';
            let height = this.video_1.elem.offsetHeight + 'px';
            this.video_1.elem.childNodes[0].childNodes[0].src = this.video_1.link;
            this.video_1.Video = video_js(this.video_1.elem.childNodes[0]);
            this.video_1.Video.ready(() => {
                this.video_1.Video.width(width);//设置宽度
                this.video_1.Video.height(height);//设置高度
                /*播放结束*/
                this.video_1.Video.on("ended", () => {
                    monitorF['ended']();
                });
                /*暂停mp3*/
                if (this.audio_1.state) {
                    this.mp3();
                }
                resolve(true);
            });
        });
    }

    /*播放mp3*/
    mp3(link) {
        if (link) {
            this.audio_1.elem.src = link;
            if (this.audio_1.link == link) {//同mp3被点击
                if (this.audio_1.state) {
                    this.audio_1.state = false;
                    this.audio_1.link = '';
                    this.audio_1.elem.pause();
                } else {
                    this.audio_1.state = true;
                    this.audio_1.link = link;
                    this.audio_1.elem.play();
                    if (this.video_1.state) {
                        this.mp4();
                    }
                }
            } else {//不同mp3被点击
                if (this.audio_1.state) {
                    this.audio_1.state = true;
                    this.audio_1.link = link;
                    this.audio_1.elem.pause();
                    this.audio_1.elem.play();
                    if (this.video_1.state) {
                        this.mp4();
                    }
                } else {
                    this.audio_1.state = true;
                    this.audio_1.link = link;
                    this.audio_1.elem.play();
                    if (this.video_1.state) {
                        this.mp4();
                    }
                }
            }
        } else {
            this.audio_1.state = false;
            this.audio_1.link = '';
            this.audio_1.elem.pause();
        }
        return this.audio_1.state;
    }

    /*播放m3u8*/
    m3u8(obj) {
        //event.target.children[0].setAttribute('type','application/x-mpegURL');
        this.playVideo_(obj);
    }

    /*播放mp4*/
    mp4(elem, link, monitorF) {
        return new Promise((resolve) => {
            if (!elem || !link) {
                this.video_1.state = false;
                this.video_1.link = '';
                this.video_1.Video.pause();//暂停
                resolve(false);
            } else {
                this.video_1.elem = elem;
                this.video_1.link = link;
                this.playVideo_(monitorF).then(res => {
                    /*开始播放*/
                    if (res) {
                        this.video_1.state = true;
                        this.video_1.link = link;
                        this.video_1.Video.play();
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            }
        });
    }
}

export default Videojs;
