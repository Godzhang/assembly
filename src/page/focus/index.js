import './index.css';
import pub from 'util/public.js';

class Focus{
    constructor(container, options){
        this.params = Object.assign({
            pointTag: 'b',
            active: 'act',
            event: 'click',
            pointEvent: 'click',
            time: 0,
            speed: 300,
            slide: false,
            minRange: 100,
            onSlideEnd: function(){}
        }, options);
        this.container = container;
        this.list = this.container.querySelector(this.params.list);
        this.item = [...this.list.querySelectorAll(this.params.item)];
        this.len = this.item.length;
        this.width = this.container.offsetWidth;
        this.prev = this.container.querySelector(this.params.prev) || '';
        this.next = this.container.querySelector(this.params.next) || '';
        this.point = this.container.querySelector(this.params.point);
        this.timer = null;
        this.index = 0;
        this.nextIndex = null;
        this.flag = true;
        this.current = null;
        this.previous = null;
        this.init();
    }

    init(){
        this.item[this.index].style.display = 'block';
        pub.setTransitionDuration(this.list, 0);
        this._transitionend = this.transitionend.bind(this);
        //绑定左右箭头点击事件
        this._moveToLeft = this.moveToLeft.bind(this);
        this._moveToRight = this.moveToRight.bind(this);
        this.prev && pub.addEvent(this.prev, this.params.event, this._moveToLeft);
        this.next && pub.addEvent(this.next, this.params.event, this._moveToRight);
        //初始化焦点,绑定焦点事件(默认点击)
        if(!!this.point){
            this.initialPoint();
            this.bindPointEvent();
        }
        //自动轮播
        if(this.params.time){
            this.run();
            pub.addEvent(this.container, 'mouseover', () => {
                clearInterval(this.timer);
            });
            pub.addEvent(this.container, 'mouseleave', () => {
                this.run();
            });
        }
        //手指滑动切换
        if(this.params.slide){
            this.initSlide();
        }
    }

    initSlide(){
        this.startX = null;
        this.move = null;
        this.isMoving = false;
        this.minRange = this.params.minRange || 80;
        this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
        this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
        this.touchend = this.isTouch ? 'touchend' : 'mouseup';

        this._moveStart = this.moveStart.bind(this);
        this._moving = this.moving.bind(this);
        this._moveEnd = this.moveEnd.bind(this);

        pub.addEvent(this.list, this.touchstart, this._moveStart);
        
    }

    moveStart(e){
        e.preventDefault();

        this.isMoving = true;

        pub.addEvent(this.list, this.touchmove, this._moving);
        pub.addEvent(this.list, this.touchend, this._moveEnd);
        pub.addEvent(this.list, 'mouseleave', this._moveEnd);
        //把当前图的前后两张图都放上
        let prevIndex = this.index === 0 ? this.len - 1 : this.index - 1;
        let nextIndex = this.index === this.len - 1 ? 0 : this.index + 1;
        pub.setTransform(this.item[prevIndex], `translate3d(${-this.width}px, 0, 0)`);
        pub.setTransform(this.item[nextIndex], `translate3d(${this.width}px, 0, 0)`);
        this.item[prevIndex].style.display = 'block';
        this.item[nextIndex].style.display = 'block';

        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.startX = e.pageX;
    }

    moving(e){
        if(!this.isMoving) return;

        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.move = e.pageX - this.startX;
        pub.setTransform(this.list, `translate3d(${this.move}px, 0, 0)`);
    }

    moveEnd(){
        if(this.move > this.minRange){
            this.moveToLeft();
        }else if(this.move < -this.minRange){
            this.moveToRight();
        }else if(this.move !== 0){
            this.reset();
        }
        pub.removeEvent(this.list, this.touchmove, this._moving);
        pub.removeEvent(this.list, this.touchend, this._moveEnd);
        pub.removeEvent(this.list, 'mouseleave', this._moveEnd);
    }

    reset(){
        this.current = this.item[this.index];
        this.nextIndex = this.index;
        pub.setTransitionDuration(this.list, this.params.speed);
        pub.setTransform(this.list, `translate3d(0, 0, 0)`);
        pub.transitionEnd(this.list, this._transitionend);
    }

    initialPoint(){
        let frag = document.createDocumentFragment();
        for(let i = 0; i < this.len; i++){
            let tag = document.createElement(this.params.pointTag);
            tag.innerHTML = i + 1;
            if(i === 0){
                tag.className = this.params.active;
            }
            frag.appendChild(tag);
        }
        this.point.appendChild(frag);
    }

    bindPointEvent(){
        const point = [...this.point.children];
        point.forEach((val, index) => {
            pub.addEvent(val, this.params.event, () => {
                if(index < this.index){
                    this.nextIndex = index;
                    this.moveTo('left');
                }else if(index > this.index){
                    this.nextIndex = index;
                    this.moveTo('right');
                }else{
                    return;
                }
            });
        });
    }

    switchPoint(){
        const point = [...this.point.children];
        point[this.index].classList.remove(this.params.active);
        point[this.nextIndex].classList.add(this.params.active);
    }

    run(){
        this.timer = setInterval(this.moveToRight.bind(this), this.params.time);
    }

    moveToLeft(){
        this.nextIndex = this.index === 0 ? this.len - 1 : this.index - 1;
        this.moveTo('left');
    }

    moveToRight(){
        this.nextIndex = this.index === this.len - 1 ? 0 : this.index + 1;
        this.moveTo('right');
    }

    moveTo(dir){
        if(!this.flag) return;
        this.flag = false;

        let current = this.current = this.item[this.nextIndex],
            d = dir === 'left' ? -1 : 1;
        this.previous = this.item[this.index];
        //设置过渡时间
        pub.setTransitionDuration(this.list, this.params.speed);

        pub.setTransform(current, `translate3d(${d * this.width}px, 0, 0)`);
        current.style.display = 'block';
        pub.setTransform(this.list, `translate3d(${-d * this.width}px, 0, 0)`);

        pub.transitionEnd(this.list, this._transitionend);
    }

    transitionend(){
        pub.setTransitionDuration(this.list, 0);
        pub.setTransform(this.list, `translate3d(0, 0, 0)`);
        pub.setTransform(this.current, `translate3d(0, 0, 0)`);
        if(!!this.point){
            this.switchPoint();
        }
        if(this.params.slide){
            this.move = 0;
            this.isMoving = false;
        }
        this.index = this.nextIndex;
        this.flag = true;
        for(let i = 0; i < this.len; i++){
            if(i !== this.index){
                this.item[i].style.display = 'none';
            }
        }
        this.params.onSlideEnd && this.params.onSlideEnd.call(this, this.index, this.current);
    }
}

new Focus(document.querySelector('.container'), {
    list: '#list',
    item: '.slide',
    point: '#point',
    prev: '#prev',
    next: '#next',
    slide: true
});









