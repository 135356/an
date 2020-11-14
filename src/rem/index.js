class Rem {
    constructor() {
        let docEl = document.documentElement;
        let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            let size=6*(clientWidth / 320);
            if(!size||size<6){size=6;}
            docEl.style.fontSize = size+'px';
            localStorage.setItem('font_size_', size);
        };
        if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);
    }
}

export default new Rem();