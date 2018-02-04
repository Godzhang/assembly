import './index.css';
import pub from 'util/public';

class Range{
    constructor(container, params){
        this.params = Object.assign({
            min: 0,
            max: 100,
            value: 0,   //默认显示的值
            step: 1,
            onSlide: function(){}
        }, params);
        this.container = container;
        this.bar = this.container.querySelectorAll('.range-bar')[1];
        this.hand = this.container.querySelector('.range-hand');
        this.info = this.container.querySelector('.range-info');

        this.width = this.container.offsetWidth;
        this.mostLeft = this.width - this.hand.offsetWidth;

        this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
        this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
        this.touchend = this.isTouch ? 'touchend' : 'mouseup';
        
        this.startWidth = parseInt(pub.getStyle(this.hand, 'width')) / 2;
        this.hasMoved = 0;
        this.current = null;

        this.init();
    }

    init(){
        const params = this.params;

        this.bar.style.width = this.startWidth + 'px';  //初始化轨道变色宽度
        this.info.innerHTML = params.min;               //初始化位置值
        //判断范围值是否正确
        if(params.min > params.max){
            [params.min, params.max] = [params.max, params.min];
        }
        this.range = this.params.max - this.params.min;

        //初始化滑块初始位置
        if(params.value < params.min){
            params.value = params.min;
        }else if(params.value > params.max){
            params.value = params.max;
        }
        let initPos = ((params.value - params.min) / this.range) * this.mostLeft;
        this.setRange(initPos);
        this.hasMoved = initPos;    //初始化已经移动的距离

        this.bindEvent();
    }

    bindEvent(){
        this._startEvent = this.startEvent.bind(this);
        this._moveEvent = this.moveEvent.bind(this);
        this._endEvent = this.endEvent.bind(this);
        this.moving = false;
        this.startX = 0;
        this.dir = 0;

        pub.addEvent(this.hand, this.touchstart, this._startEvent);

    }

    startEvent(e){
        e.preventDefault();
        this.moving = true;

        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.startX = e.pageX;

        pub.addEvent(document, this.touchmove, this._moveEvent);
        pub.addEvent(document, this.touchend, this._endEvent);
    }

    moveEvent(e){
        if(!this.moving) return;

        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.dir = e.pageX - this.startX;
        
        let direction = this.hasMoved + this.dir;
        if(direction > this.mostLeft){
            direction = this.mostLeft;
            this.dir = this.mostLeft - this.hasMoved;
        }else if(direction < 0){
            direction = 0;
            this.dir = 0 - this.hasMoved;
        }

        this.setRange(direction);
    }

    setRange(direction){
        // this.hand.style.left = direction + 'px';
        pub.setTransform(this.hand, `translate3d(${direction}px, 0, 0)`);   //设置滑动块位置
        this.bar.style.width = this.startWidth + direction + 'px';          //设置滑动条宽度

        let dir = Math.round((direction / this.mostLeft) * this.range);
        if((dir % this.params.step) !== 0){
            dir -= (dir % this.params.step);
        }        
        if(direction === this.mostLeft){                //如果到终点，设为100%,不按step值计算
            dir = this.params.max - this.params.min;
        }
        this.current = dir + this.params.min;
        this.info.innerHTML = this.current;
        if(this.moving){    //初始化不执行回调
            this.params.onSlide && this.params.onSlide.call(this, this.current);
        }        
    }

    endEvent(){
        this.moving = false;

        this.hasMoved += this.dir;

        this.params.onSlideEnd && this.params.onSlideEnd.call(this, this.current);
        pub.removeEvent(document, this.touchmove, this._moveEvent);
        pub.removeEvent(document, this.touchend, this._endEvent);
    }
}

new Range(document.querySelector('.range-box-1'), {
    min: 0,
    max: 100,
    onSlide(val){
        console.log(val);
    },
    onSlideEnd(val){
        console.log(`结束值: ${val}`);
    }
});