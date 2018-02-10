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
            //过程选项            
            this.p = null;              //wrapper的起始位置
            this._p = null;             //wrapper的结束位置或目标位置
            this.startTime = null;      //鼠标点击或touch开始的时间
            this.start = null;          //鼠标或touch 起始位置   
            this.stop = null;           //鼠标或touch 终点位置
            //可设置选项
            this.min = 0;
            this.max = this.container.offsetHeight - this.wrapper.offsetHeight;

            this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
            this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
            this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
            this.touchend = this.isTouch ? 'touchend' : 'mouseup';

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
            e.preventDefault();
            e.stopPropagation();

            this.start = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;    //记录起点坐标
            this.startTime = new Date();                                            //记录开始点击时间
            this.p = this._getPosition() || 0;                                      //记录wrapper位置

            this._onScroll(this.p);     //处理移动中点击定位

            pub.addEvent(this.wrapper, this.touchmove, this._mousemove);
            pub.addEvent(this.wrapper, this.touchend, this._mouseup);
            pub.addEvent(this.wrapper, 'mouseleave', this._mouseup);
        }

        mousemove(e){
            e.preventDefault();
            e.stopPropagation();

            this.stop = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

            if(Math.abs(this.stop - this.start) > 3){
                //从低处开始，上下滑动出现空白区域
                let nowPos = this._adjustPosition((this.p + this.stop - this.start), this.min + 50, this.max - 50);
                this._onScroll( nowPos );
            }
        }

        mouseup(e){
            e.preventDefault();
            e.stopPropagation();

            this.stop = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

            let speed,
                dist = this.stop - this.start,          //鼠标滑动距离
                time = new Date() - this.startTime;     //滑动时间

            if(time < 300){
                speed = dist / time;
                if(dist < 0){
                    dist = - Math.min( (speed * speed) / 0.0012 , this.wrapper.offsetHeight / 5);
                }else{
                    dist = Math.min( (speed * speed) / 0.0012 , this.wrapper.offsetHeight / 5);
                }
            }

            let val = this._adjustPosition((this.p + dist), this.min, this.max);
                
            time = speed ? Math.max(0.1, Math.abs(dist / speed) * 0.0015) : 0.1;

            this._p = val;

            this._onScroll(val, time);

            pub.removeEvent(this.wrapper, this.touchmove, this._mousemove);
            pub.removeEvent(this.wrapper, this.touchend, this._mouseup);
            pub.removeEvent(this.wrapper, 'mouseleave', this._mouseup);
        }

        _adjustPosition(val, min, max){
            return Math.min(min, Math.max(val, max));
        }

        _getPosition(){
            const matrix = pub.getStyle(this.wrapper, 'transform').split(')')[0].split(', ');
            const y = matrix[13] || matrix[5];
            return parseInt(y);
        }

        _onScroll(val, time, noAnimation){
            this.wrapper.style['transition'] = `transform ${time ? time.toFixed(3) : 0}s ease-out`;
            pub.setTransform(this.wrapper, `translate3d(0, ${val}px, 0)`);
        }
    }

    new Slider('.container');

}




