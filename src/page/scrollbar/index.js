import './scrollbar.css';
import './index.css';
import pub from 'util/public.js';

class ScrollBar{
	constructor(el, params = {}){
		const defaults = {
			wh: 100,		//滚动条的宽或高
			distance: 30,	//每次滚动距离
			direction: 'y',	//滚动方向
			slide: true,	//是否允许拖动
			toTop: function(){},
			onScroll: function(){},
			toBottom: function(){}
		};
		this.params = Object.assign({}, defaults, params);
		this.el = typeof el === 'string' ? document.querySelector(el) : el;		
		this.container = null;	//外层容器
		this.wrapper = null;	//内容容器
		//检测是否是firfox浏览器
		this.isMoz = 'MozTransform' in document.createElement('div').style;
		this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
		this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
		this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
		this.touchend = this.isTouch ? 'touchend' : 'mouseup';
		this.wheelEvent = this.isTouch ? 'DOMMouseScroll' : 'mousewheel';
		
		this.delta = null;		//滚动参数
		this.scrollPos = 0;		//记录滚动位置
		this.topPos = 0;		//上边缘
		this.bottomPos = null;	//下边缘
		this.start = null;		//
		this.move = null;
		this.isMouseDown = false;	//鼠标是否被按下

		this.init();
	}

	init(){
		this.initDom();		//调整结构

		//如果内容高度不大于容器高度
		if(this.wrapper.offsetHeight <= this.el.offsetHeight){
			return false;
		}

		this.bottomPos = this.el.offsetHeight - this.wrapper.offsetHeight;	//计算容器可滚动距离

		this.createScrollbar();		//创建滚动条

		this.bindEvent();		//绑定事件

		// pub.addEvent(window, 'resize', () => {

		// });
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
		this.scrollBar.style.height = this.params.wh + 'px';
		pub.setTransform(this.scrollBar, `translate3d(0, 0, 0)`);
		//添加dom
		this.scrollBox.appendChild(this.scrollRail);
		this.scrollBox.appendChild(this.scrollBar);
		this.container.appendChild(this.scrollBox);
		//计算一些数据
		this.scrollHeight = Math.abs(this.bottomPos);	//容器的可滚动距离
		this.barScrollHeight = this.scrollBox.offsetHeight - this.scrollBar.offsetHeight;	//滚动条的可滚动距离
		this.percent = this.barScrollHeight / this.scrollHeight;	//容器滚动距离与滚动条滚动距离比例
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
	}

	mouseDown(e){
		e.preventDefault();

		if(e.changedTouches){
			e = e.changedTouches[0];
		}

		this.start = e.pageY;
		this.startBarPos = getPos(pub.getStyle(this.scrollBar, 'transform'), this.params.direction);	//保存鼠标按下时滚动条的位置
		this.isMouseDown = true;

		//滚动条距离顶部和距离底部的差值
		this.topDistance = 0 - this.startBarPos;
		this.bottomDistance = this.barScrollHeight - this.startBarPos;

		pub.addEvent(document, this.touchmove, this._mouseMove);
		pub.addEvent(document, this.touchend, this._mouseUp);
	}

	mouseMove(e){
		if(!this.isMouseDown) return;
		if(e.changedTouches){
			e = e.changedTouches[0];
		}

		this.move = this.startBarPos - (e.pageY - this.start);


		if(this.move <= this.topDistance){
			this.move = this.topDistance;
		}else if(this.move >= this.bottomDistance){
			this.move = this.bottomDistance;
		}

		this.scrollTo(-(this.move)/this.percent);
	}

	mouseUp(){
		//保存内容最新的位置
		this.scrollPos = -getPos(pub.getStyle(this.scrollBar, 'transform'), this.params.direction) / this.percent;
		this.isMouseDown = false;
	}

	scroll(){
		const params = this.params;

		if(this.delta < 0){	//向下滚动
			if(this.scrollPos - this.params.distance <= this.bottomPos){
				this.scrollPos = this.bottomPos;
				params.toBottom && params.toBottom.call(this);
			}else{
				this.scrollPos -= this.params.distance;
				params.onProgress && params.onProgress.call(this, -this.scrollPos);
			}
		}else if(this.delta > 0){	//向上滚动
			if(this.scrollPos + this.params.distance >= 0){
				this.scrollPos = 0;
				params.toTop && params.toTop.call(this);
			}else{
				this.scrollPos += this.params.distance;
				params.onScroll && params.onScroll.call(this, -this.scrollPos);
			}
		}
		this.scrollTo(this.scrollPos);
	}

	scrollTo(pos){
		pub.setTransform(this.wrapper, `translate3d(0, ${pos}px, 0)`);
		pub.setTransform(this.scrollBar, `translate3d(0, ${-pos * this.percent}px, 0)`);
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
		return arr[5];
	}
}

new ScrollBar('.container', {
	// toTop(){
	// 	console.log('top');
	// },
	// toBottom(){
	// 	console.log('bottom');
	// },
	// onScroll(pos){
	// 	console.log(pos);
	// }
});





