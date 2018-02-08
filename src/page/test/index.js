import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public.js';

window.onload = function(){
    
    class Slider{
        constructor(container, params = {}){
            const defaults = {
                wrapper: '.box'
            }
            this.container = document.querySelector(container);
            this.params = Object.assign({}, defaults, params);
            this.wrapper = this.container.querySelector(this.params.wrapper);

            this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
            this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
            this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
            this.touchend = this.isTouch ? 'touchend' : 'mouseup';
            this.start = null;
            this.move = null;
            this.res = 0;
            this.isMoving = false;
            //内容可滑动的上下边界
            this.top = 0;
            this.bottom = this.container.offsetHeight - this.wrapper.offsetHeight;
            //时间
            this.startTime = null;

            this.init();
        }

        init(){
            this.bindEvent();
        }

        bindEvent(){
            this._mousedown = this.mousedown.bind(this);
            this._mousemove = this.mousemove.bind(this);
            this._mouseup = this.mouseup.bind(this);

            pub.addEvent(this.wrapper, this.touchstart, this._mousedown);
        }

        mousedown(e){
            if(e.changedTouches){
                e = e.changedTouches[0];
            }
            //设置开关
            this.isMoving = true;
            //记录初始位置
            this.start = e.pageY;
            //记录初始时间
            this.startTime = Date.now();

            pub.addEvent(this.wrapper, this.touchmove, this._mousemove);
            pub.addEvent(this.wrapper, this.touchend, this._mouseup);
            pub.addEvent(this.wrapper, 'mouseleave', this._mouseup);
        }

        mousemove(e){
            if(!this.isMoving) return;
            if(e.changedTouches){
                e = e.changedTouches[0];
            }

            this.move = this.res + (e.pageY - this.start);

            if(this.move > this.top){
                this.move = this.top;
            }else if(this.move < this.bottom){
                this.move = this.bottom;
            }

            pub.setTransform(this.wrapper, `translate3d(0, ${this.move}px, 0)`);
        }

        mouseup(){
            //关闭开关
            this.isMoving = false;
            //计算时间差
            let lastTime = Date.now();
            const time = lastTime - this.startTime;

            this.res = this.move;

            let speed = (this.res - this.start) / time;
            if(time <= 300){
                this.moveTo(speed, lastTime, this.res);
            }

            pub.removeEvent(this.wrapper, this.touchmove, this._mousemove);
            pub.removeEvent(this.wrapper, this.touchend, this._mouseup);
            pub.removeEvent(this.wrapper, 'mouseleave', this._mouseup);
        }

        moveTo(v, startTime, res){
            console.log(v)
        }
    }

    new Slider('.container');
}




