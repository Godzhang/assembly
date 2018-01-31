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
		this.width = this.tabContents[0].parentNode.offsetWidth;
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
		this.initSlider();

		const box = this.box;

		pub.addEvent(box, this.touchstart, (e) => {
			this.moving = true;

			this.startX = e.pageX;
			this.startY = e.pageY;
		});
		pub.addEvent(box, this.touchmove, (e) => {
			e.preventDefault();
			e.stopPropagation();

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
		});
		pub.addEvent(box, this.touchend, (e) => {
			e.preventDefault();
			this.moving = false;
			this.minRange = parseInt(this.width / 5);
			let current = this.getCurrent();
			let next = current.nextElementSibling;
			let prev = current.previousElementSibling;

			current.classList.remove('moving');
			next && next.classList.remove('moving');
			prev && prev.classList.remove('moving');

			if(this.move < -this.minRange && next){
				return this.next();
			}
			if(this.move > this.minRange && prev){
				return this.prev();
			}
			this.reset();
		});

		//鼠标移出区域也要出发touchend事件
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
		let d = index < this.index ? -1 : 1;

		if(index === this.index || index < 0 || index >= total) return;
		this.index = index;
		pub.setTransform(current, 'translate3d('+ (-d * this.width) +'px, 0, 0)');
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
				tc[i].classList.remove(cc);
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


