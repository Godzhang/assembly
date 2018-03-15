import Core from './core';

class Timeline{
    constructor(opt){
        this.queue = [new Core(opt)];
    }

    to(opt){
        this.queue.push(new Core(opt));
        return this;
    }

    play(){
        const queue = this.queue;
        this.queue.map((core, index) => {
            if(queue[index + 1]){
                const callback = core.onEnd;
                core.onEnd = () => {
                    callback && callback();
                    queue[index + 1].play();
                }
            }
        });
    }
}

export default Timeline;








