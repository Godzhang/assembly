import './index.css';
import pub from 'util/public.js';

class ScrollBar{
	constructor(container, params = {}){
		const t = this;
		const defaults = {

		}
		this.params = Object.assign({}, defaults, params);
		//此处省略container其他情况，只考虑字符串
		this.container = document.querySelector(container);
		this.wrapper = this.container.firstElementChild;
		//检测是否是firfox浏览器
		this.isMoz = 'MozTransform' in document.createElement('div').style;
		this.isTouch = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
		this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
		this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
		this.touchend = this.isTouch ? 'touchend' : 'mouseup';
		this.wheelEvent = this.isTouch ? 'DOMMouseScroll' : 'mousewheel';
		
		this.delta = null;
		this.scrollPos = 0;
		this.topPos = 0;
		this.bottomPos = this.container.offsetHeight - this.wrapper.offsetHeight;

		this.init();
	}

	init(){
		this.createScrollbar();
		this.bindEvent();
	}

	createScrollbar(){
		this.scrollBox = document.createElement('div');
		this.scrollBox.className = 'scroll-box';
		this.scrollRail = document.createElement('div');
		this.scrollRail.className = 'scroll-rail';
		this.scrollBar = document.createElement('div');
		this.scrollBar.className = 'scroll-bar';
		this.scrollBox.appendChild(this.scrollRail);
		this.scrollBox.appendChild(this.scrollBar);
		this.container.appendChild(this.scrollBox);

		this.scrollHeight = Math.abs(this.bottomPos);	//容器的可滚动距离
		this.barScrollHeight = this.scrollBox.offsetHeight - this.scrollBar.offsetHeight;	//滚动条的可滚动距离
		this.percent = this.barScrollHeight / this.scrollHeight;
	}

	bindEvent(){
		pub.addEvent(this.container, this.wheelEvent, (e) => {
			e.preventDefault();
			this.delta = this.isMoz ? (-e.detail/3) : e.wheelDelta/120;
			this.scroll();
			
		});
	}

	scroll(){
		if(this.delta < 0){	//向下滚动
			if(this.scrollPos > this.topPos){
				this.scrollPos = this.topPos;
			}else if(this.scrollPos < this.bottomPos){
				this.scrollPos = this.bottomPos;
			}else{
				this.scrollPos -= 10;
			}
			pub.setTransform(this.wrapper, `translate3d(0, ${this.scrollPos}px, 0)`);
			pub.setTransform(this.scrollBar, `translate3d(0, ${-this.scrollPos * this.percent}px, 0)`);
		}else{	//向上滚动
			if(this.scrollPos > this.topPos){
				this.scrollPos = this.topPos;
			}else if(this.scrollPos < this.bottomPos){
				this.scrollPos = this.bottomPos;
			}else{
				this.scrollPos += 10;
			}
			pub.setTransform(this.wrapper, `translate3d(0, ${this.scrollPos}px, 0)`);
			pub.setTransform(this.scrollBar, `translate3d(0, ${-this.scrollPos * this.percent}px, 0)`);
		}
	}

}

new ScrollBar('.scroll-container', {

});






