import './index.css';
import pub from 'util/public.js';

let transitionendEvent = null;

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
		this.contentBox = this.container.querySelector('.tab-body');

		this.isTouch = 'touchstart' in window;
		this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
		this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
		this.touchend = this.isTouch ? 'touchend' : 'mouseup';
		this.startX = null;
		// this.startY = null;
		this.move = null;
		this.moving = false;

		this.timer = null;
		this.index = 0;
		this.init();
	}

	init(){
		//给第一个按钮添加选中样式
		this.tabButtons[0].classList.add(this.params.buttonActiveClass);
		this.tabContents[0].classList.add(this.params.contentActiveClass);
		//获取切换内容容器宽度
		this.width = this.tabContents[0].parentNode.offsetWidth;
		//给按钮绑定事件
		this.bindEvent();
		//绑定滑动事件
		if(this.params.slide || this.isTouch){
			this.initSlider();
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

	initSlider(){
		let current = this.tabContents[0];
		current.classList.add('play');
		pub.setTransform(current, 'translate3d(0, 0, 0)');

		for(let i = 1, len = this.tabContents.length; i < len; i++){
			let tc = this.tabContents[i];
			tc.style.display = 'block';
			pub.setTransform(tc, 'translate3d('+ this.width +'px, 0, 0)');
		}

		this.bindSlider();
	}

	bindSlider(){	
		const box = this.contentBox;

		pub.addEvent(box, this.touchstart, this.touchstartEvent.bind(this));
		pub.addEvent(box, this.touchmove, this.touchmoveEvent.bind(this));
		pub.addEvent(box, this.touchend, this.touchendEvent.bind(this));
		
	}

	touchstartEvent(e){
		e.preventDefault();
		this.moving = true;

		if(e.changedTouches){
			e = e.changedTouches[0];
		}

		this.startX = e.pageX;
		this.startY = e.pageY;

		for(let i = 0, len = this.tabContents.length; i < len; i++){
			let tc = this.tabContents[i];
			pub.setTransitionDuration(tc, 0);
		}

		//鼠标移出区域也要出发touchend事件
		pub.addEvent(this.contentBox, 'mouseleave', this.touchendEvent.bind(this));
	}

	touchmoveEvent(e){
		if(this.moving){
			this.move = e.pageX - this.startX;
			let current = this.getCurrent();
			let next = current.nextElementSibling;
			let prev = current.previousElementSibling;
			current.classList.add('moving');
			next && next.classList.add('moving');
			prev && prev.classList.add('moving');

			pub.setTransform(current, 'translate3d('+ this.move +'px, 0, 0)');
			next && pub.setTransform(next, 'translate3d('+ (this.move + this.width) +'px, 0, 0)');
			prev && pub.setTransform(prev, 'translate3d('+ (this.move - this.width) +'px, 0, 0)');
		}
	}

	touchendEvent(e){
		e.preventDefault();
		this.moving = false;
		const move = this.move;
		const minRange = parseInt(this.width / 5);
		let current = this.getCurrent();
		let next = current.nextElementSibling;
		let prev = current.previousElementSibling;

		current.classList.remove('moving');
		pub.setTransitionDuration(current, 300);
		next && next.classList.remove('moving');
		next && pub.setTransitionDuration(next, 300);
		prev && prev.classList.remove('moving');
		prev && pub.setTransitionDuration(prev, 300);

		this.move = 0;
		// pub.removeEvent(this.contentBox, 'mouseleave', this.touchendEvent.bind(this));

		if(move < -minRange && next){
			this.next();
		}else if(move > minRange && prev){
			this.prev();
		}else{
			this.reset();
		}
		this.switchTab(this.index);
	}

	next(){
		this.go(this.index + 1);
	}

	prev(){
		this.go(this.index - 1);
	}

	go(index){
		let current = this.getCurrent();
		let total = this.tabContents.length;
		let target = this.tabContents[index];
		let d = index < this.index ? 1 : -1;

		if(index === this.index || index < 0 || index >= total) return;
		this.index = index;
		pub.transitionEnd(current, () => {
			this.switchTab(this.index);
		});
		pub.setTransform(current, 'translate3d('+ (d * this.width) +'px, 0, 0)');
		pub.setTransform(target, 'translate3d(0, 0, 0)');
		this.finish(current, target);
	}

	finish(cur, target){
		setTimeout(() => {
			cur && cur.classList.remove('play');
			target && target.classList.add('play');
		}, 300);
	}

	reset(){
		let current = this.getCurrent();
		let next = current.nextElementSibling;
		let prev = current.previousElementSibling;

		pub.setTransform(current, 'translate3d(0, 0, 0)');
		prev && pub.setTransform(prev, 'translate3d('+ (-this.width) +'px, 0, 0)');
		next && pub.setTransform(next, 'translate3d('+ this.width +'px, 0, 0)');
	}
	//获取当前操作项
	getCurrent(){
		return this.tabContents[this.index];
	}

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
				if(!this.params.slide){
					tc[i].classList.remove(cc);
				}
			}
		}
	}

	getIndex(index){
		if(index > this.tabButtons.length){
			return 0;
		}else if(index < 0){
			return this.tabButtons.length - 1;
		}else{
			return index;
		}
	}
}

const tab = new Tab('#tab-default');
const tab2 = new Tab('#tab-default-2', {
	tabEvent: 'mouseover'
});
const tab3 = new Tab('#tab-default-3', {
	autoPlay: true
});
const tab4 = new Tab('#tab-line', {
	type: 'line'
});
const tab5 = new Tab('#tab-default-4', {
	slide: true
});

