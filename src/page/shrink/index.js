import './index.css';
import pub from 'util/public.js';

(function(){
    const LazySuspend = function(container, params){
        if(!(this instanceof LazySuspend)) return new LazySuspend(container, params);
        const defaults = {
            type: 'horizontal',
            distance: 10,
            angle: 45,
            delay: 100,
            direction: 'rb'
        };
        this.params = Object.assign({}, defaults, params);
        this.container = typeof container === 'string' ? document.querySelectorAll(container) : container;

        let len = this.container.length;
        if(len === 0) return;
        if(len > 1){
            let suspends = [];
            for(let i = 0; i < len; i++){
                suspends.push(new LazySuspend(this.container[i], params));
            }
            return suspends;
        }
        this.container = this.container[0];
        this.init();
    };
    LazySuspend.prototype.init = function(){
        var self = this;

        this.reverse = false;
        this.items = this.container.querySelectorAll('.suspend-item');
        this.itemWidth = this.items[0].offsetWidth;
        this.itemHeight = this.items[0].offsetHeight;
        this.btn = this.container.querySelector('.suspend-btn');
        pub.addEvent(this.btn, 'click', this.toggle.bind(self), false);
        let type = this.params.type.split('-');
        if(type[1] && type[1] === 'reverse'){
            this.params.type = type[0];
            this.reverse = true;
        }
    };
    LazySuspend.prototype.toggle = function(){
        if(this.container.classList.contains('suspend-expanded')){
            this.close();
        }else{
            this.open();
        }
    };
    LazySuspend.prototype.open = function(){
        let self = this;
        let op = this.reverse ? '-' : '';
        this.btn.classList.add('burge-open');
        switch(this.params.type){
            case 'horizontal':
                for(let i = 0, len = this.items.length; i < len; i++){
                    let x = 'translate(' + op + ((this.itemWidth + this.params.distance) * (i + 1)) + 'px, 0)';
                    pub.setTransform(this.items[i], x);
                    this.items[i].style.top = '0px';
                    this.items[i].style.opacity = 1;
                }
                break;
            case 'vertical':
                for(let i = 0, len = this.items.length; i < len; i++){
                    let y = 'translate(0, ' + op + ((this.itemHeight + this.params.distance) * (i + 1)) + 'px)';
                    pub.setTransform(this.items[i], y);
                    this.items[i].style.left = '0px';
                    this.items[i].style.opacity = 1;
                }
                break;
            case 'circle':
                let r = this.itemWidth + this.params.distance,
                    dir = {
                        lt: -180,
                        lb: 90,
                        rt: -90,
                        rb: 0
                    },
                    rotation = dir[this.params.direction];

                    function anim(i){
                        // -180/左上(lt)、 90/左下(lb)、-90/右上(rt)、0/右下(rb)
                        let angle = (self.params.angle * i - rotation) / 180 * Math.PI,
                            x = (Math.sin(angle) * r).toFixed(3),
                            y = (Math.cos(angle) * r).toFixed(3),
                            xy = 'translate(' + x + 'px, ' + y + 'px)';

                        pub.setTransform(self.items[i], xy);
                        self.items[i].style.top = '0px';
                        self.items[i].style.left = '0px';
                        self.items[i].style.opacity = 1;
                    }

                    this.params.delay = parseInt(this.params.delay);
                    for(let i = 0, len = this.items.length; i < len; i++){
                        if(this.params.delay){
                            (function(i){
                                self.items[i].intervalId = setInterval(function(){
                                    anim(i);
                                }, self.params.delay * i);
                            })(i);
                            pub.transitionEnd(this.items[i], function(){
                                clearInterval(this.intervalId);
                            });
                        }else{
                            anim(i);
                        }
                    }
                break;
        }
        this.container.classList.add('suspend-expanded');
    };
    LazySuspend.prototype.close = function(){
        for(let i = 0, len = this.items.length; i < len; i++){
            pub.setTransform(this.items[i], 'translate(0, 0)');
            this.items[i].style.left = '0px';
            this.items[i].style.top = '0px';
            this.items[i].style.opacity = 0;
        }
        this.btn.classList.remove('burge-open');
        this.container.classList.remove('suspend-expanded');
    };

    window.LazySuspend = LazySuspend;
})();

var suspend = new LazySuspend('.suspend-horizontal', {
    type: 'horizontal'
});
var suspend2 = new LazySuspend('.suspend-vertical', {
    type: 'vertical'
});
var suspend3 = new LazySuspend('.suspend-horizontal-reverse', {
    type: 'horizontal-reverse'
});
var suspend4 = new LazySuspend('.suspend-vertical-reverse', {
    type: 'vertical-reverse'
});
var suspend5 = new LazySuspend('.suspend-circle', {
    type: 'circle',
    distance: 30,
    direction: 'lb'
});