class Rem {
    min_size=0;

    constructor(){}

    set(size,width)
    {
        size=size||6;
        width=width||320;
        let docEl = document.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = ()=>{
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            this.min_size=size*(clientWidth/width);
            if(!this.min_size||this.min_size<size){this.min_size=size;}
            docEl.style.fontSize = this.min_size+'px';
            localStorage.setItem('font_size_', this.min_size+'');
        };
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }

    get()
    {
        return this.min_size;
    }
}

export default Rem;