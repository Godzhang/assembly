import './index.css';
import pub from 'util/public.js';

class LazyIScroll {
	constructor(container, params = {}){
		const t = this;
		const defaults = {
			scrollbar: true,
			fadeScrollbar: false,
			bounce: false
		}
		this.params = Object.assign({}, defaults, params);
		//此处省略container其他情况，只考虑字符串
		this.container = document.querySelector(container);
		//检测是否是firfox浏览器
		this.isMoz = 'MozTransform' in document.createElement('div').style;
		this.isTouch = 'touchstart' in window;
		this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
		this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
		this.touchend = this.isTouch ? 'touchend' : 'mouseup';
		this.wheelEvent = this.isTouch ? 'DOMMouseScroll' : 'mousewheel';
		this.isPressed = false;
		this.mouseXY = {};

		this.init();
	}

	init(){
		this.bindEvent();
	}

	bindEvent(){
		// pub.addEvent(this.container, this.touchstart, (e) => {
			
		// })
	}

	css(dom, styles){
		for(let s in styles){
			dom.style[s] = styles[s];
		}
	}
	
	getPoint(event){
		/*将当前的触摸点坐标值减去元素的偏移位置，返回触摸点相对于element的坐标值*/
		event = event || window.event;
		let touchEvent = this.isTouch ? event.changedTouches[0] : event;
		let x = (touchEvent.pageX || touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
		x -= this.container.offsetLeft;
		let y = (touchEvent.pageY || touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
		y -= this.container.offsetTop;

		return {
			x,
			y
		}
	}


}








