class Ccc {
    constructor() {
    }

    this_(this_) {
        this.this__ = this_;
        return this;
    }

    imgError(photo) {
        photo = photo || require('./assets/img/img_load.png');
        let element = event.srcElement;
        element.src = photo;
        element.onerror = null;
        return false;
    }

    tips(msg)
    {
        setTimeout(()=>{
        }, 1600);
    }
}

export default Ccc;
