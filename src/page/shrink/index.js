import './index.css';

(function(){
    let setTransform = function(element, animation) {
        element.style.webkitTransform = animation;
        element.style.mozTransform = animation;
        element.style.oTransform = animation;
        element.style.msTransform = animation;
        element.style.transform = animation;
    };

    var addEvent = function(dom, type, handle, capture) {
        if(dom.addEventListener) {
            dom.addEventListener(type, handle, capture);
        } else if(dom.attachEvent) {
            dom.attachEvent("on" + type, handle);
        }
    };

    const LazySuspend = function(container, params){
        if(!(this instanceof LazySuspend)) return new LazySuspend(params);
        const defaults = {
            type: 'horizontal',
            distance: 10,
            angle: 45,
            delay: 100,
            direction: 'rb'
        };
        params = params || {};
        let originalParams = Object.assign({}, params);
        params = Object.assign({}, defaults, params);

        this.params = params;
        this.originalParams = originalParams;
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
        this.container = this.container.length ? this.container[0] : this.container;

        this.init();
    };
    LazySuspend.prototype.init = function(){
        var self = this;

        this.reverse = false;
        this.items = this.container.querySelectorAll('.suspend-item');
        this.itemWidth = this.items[0].offsetWidth;
        this.btn = this.container.querySelector('.suspend-btn');
        addEvent(this.btn, 'click', this.toggle.bind(self), false);
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
        let op = this.reverse ? '-' : '';
        this.btn.classList.add('burge-open');
        switch(this.params.type){
            case 'horizontal':
                for(let i = 0, len = this.items.length; i < len; i++){
                    let x = 'translate(' + op + ((this.itemWidth + this.params.distance) * (i + 1)) + 'px, 0)';
                    setTransform(this.items[i], x);
                    this.items[i].style.top = '0px';
                    this.items[i].style.opacity = 1;
                }
                break;
        }
        this.container.classList.add('suspend-expanded');
    };
    LazySuspend.prototype.close = function(){
        for(let i = 0, len = this.items.length; i < len; i++){
            setTransform(this.items[i], 'translate(0, 0)');
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