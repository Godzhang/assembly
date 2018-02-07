import './scrollbar.css';
import './index.css';
import pub from 'util/public.js';

class ScrollBar{
    constructor(el, params = {}){
        const defaults = {
            wh: 0,      //滚动条的宽或高
            distance: 20,   //每次滚动距离
            direction: 'y', //滚动方向
            initPos: 0,
            toTop: function(){},
            onScroll: function(){},
            toBottom: function(){}
        };
        this.params = Object.assign({}, defaults, params);
        this.el = typeof el === 'string' ? document.querySelector(el) : el;     
        this.container = null;  //外层容器
        this.wrapper = null;    //内容容器
        //检测是否是firfox浏览器
        this.isMoz = 'MozTransform' in document.createElement('div').style;
        this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
        this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
        this.touchend = this.isTouch ? 'touchend' : 'mouseup';
        this.wheelEvent = this.isTouch ? 'DOMMouseScroll' : 'mousewheel';
        
        this.delta = null;      //滚动参数
        this.scrollPos = 0;     //记录滚动条位置
        this.start = null;      
        this.move = null;
        this.isMouseDown = false;   //鼠标是否被按下
        this.timer = null;
        this.resizeTimer = null;

        this.os = this.direction === 'x' ? 'offsetWidth' : 'offsetHeight';
        this.ot = this.direction === 'x' ? 'offsetLeft' : 'offsetTop';

        this.init();
    }

    init(){
        this.initDom();     //调整结构

        //如果内容高度不大于容器高度
        if(this.wrapper.offsetHeight <= this.el.offsetHeight){
            return false;
        }

        this.createScrollbar();     //创建滚动条

        this.bindEvent();       //绑定事件

        pub.addEvent(window, 'resize', () => {
            this.resize();
        });
    }
    //把container所有子项放进scroll-wrapper和scroll-container中
    initDom(){
        this.container = createDom('div', 'scroll-container');
        this.wrapper = createDom('div', 'scroll-wrapper');
        [...this.el.children].forEach((val) => {
            this.wrapper.appendChild(val);
        });
        this.container.appendChild(this.wrapper);
        pub.setTransform(this.wrapper, `translate3d(0, 0, 0)`);
        this.el.innerHTML = '';
        this.el.appendChild(this.container);
    }
    //创建滚动条
    createScrollbar(){
        this.scrollBox = createDom('div', 'scroll-box');
        this.scrollRail = createDom('div', 'scroll-rail');
        this.scrollBar = createDom('div', 'scroll-bar');
        //设置高度
        this.scrollBox.style.height = this.container.offsetHeight + 'px';
        this.scrollRail.style.height = this.container.offsetHeight + 'px';
        //如果滚动条设置宽高大于容器，或者未设置，则设为容器宽高的1/3
        if(this.params.wh >= this.container.offsetHeight || this.params.wh === 0){
            this.params.wh = this.container.offsetHeight / 3;
        }
        this.scrollBar.style.height = this.params.wh + 'px';
        pub.setTransform(this.scrollBar, `translate3d(0, 0, 0)`);
        //添加dom
        this.scrollBox.appendChild(this.scrollRail);
        this.scrollBox.appendChild(this.scrollBar);
        this.container.appendChild(this.scrollBox);
        //计算一些数据
        this.scrollHeight = Math.abs(this.el.offsetHeight - this.wrapper.offsetHeight); //容器的可滚动距离
        this.barScrollHeight = this.scrollBox.offsetHeight - this.scrollBar.offsetHeight;   //滚动条的可滚动距离
        this.percent = this.barScrollHeight / this.scrollHeight;    //容器滚动距离与滚动条滚动距离比例
        //如果有initPos参数
        if(this.params.initPos !== 0){
            this.scrollTo(this.params.initPos);
            this.scrollPos = this.params.initPos;
        }
    }

    bindEvent(){
        //滚动事件
        pub.addEvent(this.container, this.wheelEvent, (e) => {
            e.preventDefault();
            this.delta = this.isMoz ? (-e.detail/3) : e.wheelDelta/120;
            this.scroll();
        });
        //滚动条拖动事件
        this._mouseDown = this.mouseDown.bind(this);
        this._mouseMove = this.mouseMove.bind(this);
        this._mouseUp = this.mouseUp.bind(this);

        pub.addEvent(this.scrollBar, this.touchstart, this._mouseDown);
        //滚动轨道点击事件
        this._railEvent = this.railEvent.bind(this);
        pub.addEvent(this.scrollRail, 'click', this._railEvent)
    }

    mouseDown(e){
        e.preventDefault();

        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.start = e.pageY;
        this.startBarPos = getPos(pub.getStyle(this.scrollBar, 'transform'), this.params.direction);    //保存鼠标按下时滚动条的位置
        this.isMouseDown = true;

        pub.addEvent(document, this.touchmove, this._mouseMove);
        pub.addEvent(document, this.touchend, this._mouseUp);
    }

    mouseMove(e){
        if(!this.isMouseDown) return;
        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        this.move = this.startBarPos + (e.pageY - this.start);

        if(this.move <= 0){
            this.move = 0;
        }else if(this.move >= this.barScrollHeight){
            this.move = this.barScrollHeight;
        }

        this.scrollTo(this.move);
    }

    mouseUp(){
        //保存内容最新的位置
        this.scrollPos = getPos(pub.getStyle(this.scrollBar, 'transform'), this.params.direction);
        this.isMouseDown = false;
        pub.removeEvent(document, this.touchmove, this._mouseMove);
        pub.removeEvent(document, this.touchend, this._mouseUp);
    }

    railEvent(e){
        if(e.changedTouches){
            e = e.changedTouches[0];
        }

        let dis = e.pageY - pub.getOffsetTop(this.el);  //计算点击位置坐标
        let pos = dis - this.params.wh / 2;

        if(dis < this.params.wh / 2){
            pos = 0;
        }else if(dis > (this.scrollBox.offsetHeight - this.params.wh / 2)){
            pos = this.scrollBox.offsetHeight - this.params.wh;
        }

        this.animateTo(pos);
    }

    scroll(){
        const params = this.params;

        if(this.delta < 0){ //向下滚动
            if(this.scrollPos + this.params.distance >= this.barScrollHeight){
                this.scrollPos = this.barScrollHeight;
                params.toBottom && params.toBottom.call(this);
            }else{
                this.scrollPos += this.params.distance;
                params.onScroll && params.onScroll.call(this, -this.scrollPos/this.percent);
            }
        }else if(this.delta > 0){   //向上滚动
            if(this.scrollPos - this.params.distance <= 0){
                this.scrollPos = 0;
                params.toTop && params.toTop.call(this);
            }else{
                this.scrollPos -= this.params.distance;
                params.onScroll && params.onScroll.call(this, -this.scrollPos/this.percent);
            }
        }
        this.scrollTo(this.scrollPos);
    }

    scrollTo(pos){
        pub.setTransform(this.scrollBar, `translate3d(0, ${pos}px, 0)`);
        pub.setTransform(this.wrapper, `translate3d(0, ${-pos / this.percent}px, 0)`);
    }

    animateTo(dir){
        this.timer = setTimeout(() => {
            if(Math.abs(dir - this.scrollPos) < 1){
                this.scrollTo(dir);
                clearTimeout(this.timer);
            }else{
                let diff = (dir - this.scrollPos) / 2;
                this.scrollPos += diff;
                this.scrollTo(this.scrollPos);
                this.animateTo(dir);
            }
        }, 20);
    }

    resize(){
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.scrollBox.style.height = this.container.offsetHeight + 'px';
            this.scrollRail.style.height = this.container.offsetHeight + 'px';
            this.scrollBar.style.height = this.params.wh + 'px';
        }, 300);
    }
}

function createDom(tag, className){
    const elem = document.createElement(tag);
    elem.className = className;
    return elem;
}

function getPos(str, dir){
    const arr = str.replace(/matrix\(([^)]*)\)/g, '$1').replace(/\s/g, '').split(',');
    if(dir === 'y'){
        return parseInt(arr[5]);
    }
}


window.onload = function(){
    new ScrollBar('.container', {
        // toTop(){
        //  console.log('top');
        // },
        // toBottom(){
        //  console.log('bottom');
        // },
        // onScroll(pos){
        //  console.log(pos);
        // }
    });
}
    




