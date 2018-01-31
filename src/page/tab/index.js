import './index.css';
import pub from 'util/public.js';

class Tab {
	constructor(container, params = {}){
		const defaults = {
			type: '',
			tabEvent: 'click',
			autoPlay: false,
			speed: 2000,
			buttonActiveClass: 'active',
			contentActiveClass: 'active',
			slide: false
		}
		this.params = Object.assign({}, defaults, params);
		this.container = typeof container === 'string' ? document.querySelector(container) : container;	
		this.tabButtons = Array.from(this.container.querySelectorAll('.tab-button'));
		this.tabContents = Array.from(this.container.querySelectorAll('.tab-item'));
		this.box = this.container.querySelector('.tab-body');
		
		this.isTouch = 'touchstart' in window;
		this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
		this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
		this.touchend = this.isTouch ? 'touchend' : 'mouseup';
		this.startX = null;
		// this.startY = null;
		this.moveX = null;
		// this.moveY = null;
		this.moving = false;

		this.timer = null;
		this.index = 0;
		this.init();
	}

	init(){
		//给第一个按钮添加选中样式
		this.tabButtons[0].classList.add(this.params.buttonActiveClass);
		this.tabContents[0].classList.add(this.params.contentActiveClass);
		//给按钮绑定事件
		this.bindEvent();
		//滑动事件
		if(this.params.slide || this.isTouch){
			this.bindSlider();
		}		
		//自动切换
		if(this.params.autoPlay){
			this.run();
		}
	}

	bindEvent(){
		this.tabButtons.forEach((btn, index) => {
			pub.addEvent(btn, this.params.tabEvent, () => {
				if(!btn.classList.contains(this.params.buttonActiveClass)){
					this.switchTab(index);
				}
			});
		});
		if(this.params.autoPlay){
			pub.addEvent(this.container, 'mouseover', () => {
				clearInterval(this.timer);
			});
			pub.addEvent(this.container, 'mouseleave', () => {
				this.run();
			});
		}
	}

	bindSlider(){

		// pub.addEvent(this.box, this.touchstart, this.moveTab.bind(this));
		// pub.addEvent(this.box, this.touchmove, this.moveTab.bind(this));
		// pub.addEvent(this.box, this.touchend, this.moveTab.bind(this));
		const tb = this.tabButtons,
			  tc = this.tabContents,
			  bc = this.params.buttonActiveClass,
			  cc = this.params.contentActiveClass,
			  box = this.box;

		pub.addEvent(box, this.touchstart, (e) => {
			this.moving = true;

			this.startX = e.clientX;
			this.startY = e.clientY;
		});
		pub.addEvent(box, this.touchmove, (e) => {
			if(this.moving){
				this.moveX = e.clientX - this.startX;

				pub.setTransform(this.box, 'translate3d('+ this.moveX +'px, 0, 0)');
			}		
		});
		pub.addEvent(box, this.touchend, (e) => {
			this.moving = false;
		});
	}

	// moveTab(e){
	// 	const type = e.type;
		
	// 	switch(type){
	// 		case: 
	// 	}
	// }

	run(){
		this.timer = setInterval(() => {
			let index = (this.index === this.tabButtons.length - 1) ? 0 : this.index + 1;
			this.switchTab(index);
		}, this.params.speed);
	}

	switchTab(index){
		const tb = this.tabButtons,
			  tc = this.tabContents,
			  bc = this.params.buttonActiveClass,
			  cc = this.params.contentActiveClass;

		for(let i = 0, len = tb.length; i < len; i++){
			if(i === index){
				tb[i].classList.add(bc);
				tc[i].classList.add(cc);
				this.index = index;
				//如果是其他切换方式
				if(this.params.type === 'line'){
					this.moveBg = this.container.querySelector('.tab-move-bg');
					let w = tb[i].offsetLeft;
					this.moveBg.style.left = w + 'px';
				}
			}else{
				tb[i].classList.remove(bc);
				tc[i].classList.remove(cc);
			}
		}
	}

}

const tab = new Tab('#tab-default', {
	slide: true
});
const tab2 = new Tab('#tab-default-2', {
	tabEvent: 'mouseover'
});
const tab3 = new Tab('#tab-default-3', {
	autoPlay: true
});
const tab4 = new Tab('#tab-line', {
	type: 'line'
});


