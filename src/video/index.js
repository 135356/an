import H5Video from "./H5Video"
import H5Audio from "./H5Audio"

function mix(...mixins) {
    class Mix {
        prefix='An_';
        constructor(prototype) {
            for (let mixin of mixins) {
                prototype['$'+this.prefix+mixin.name]=new mixin();
            }
        }
    }
    return Mix;
}

class Video extends mix(H5Video,H5Audio){
    constructor(prototype)
    {
        super(prototype);
    }
}

export default Video;