import './index.css';
import pub from 'util/public.js';


class Marquee{
	constructor(options){
		this.options = options || {};
		this.container = this.options.container || document.querySelectorAll('.marquee-box');
		this.inner = this.options.inner || this.container.querySelector('.marquee-inner');
		this.distance = this.options.distance || 2;
		this.speed = this.options.speed || 80;
		this.loop = this.options.loop || false;
		// this.repeat = this.options.repeat || false;
		this.direction = this.options.direction || 'ltr';
		this.containerWidth = this.container.offsetWidth;
		this.innerWidth = this.inner.offsetWidth;
		this.startPos = null;
		this.endPos = null;
		this.timer = null;
		this.startPosObj = {
			'ltr': -this.innerWidth,
			'rtl': this.containerWidth
		};
		this.endPosObj = {
			'ltr': this.containerWidth,
			'rtl': -this.innerWidth
		};

		this.init();
	}

	init(){
		// if(this.repeat){
		// 	this.cloneList();
		// }
		this.initPosition();
		this.bindEvent();
		this.move();
	}

	// cloneList(){
	// 	this.cloneNum = Math.ceil(this.containerWidth / this.innerWidth) + 1;
		
	// 	for(let i = 1; i <= this.cloneNum; i++){
	// 		this['co-' + i] = this.inner.cloneNode(true);
	// 		this.container.appendChild(this['co-' + i]);
	// 	}

	// 	this.childlist = this.container.querySelectorAll('.marquee-inner');
	// }

	initPosition(){
		// let innerWidth = this.direction === 'ltr' ? -this.innerWidth : this.innerWidth;
		this.startPos = this.startPosObj[this.direction];
		this.endPos = this.endPosObj[this.direction];

		// if(this.repeat){
		// 	for(let i = 0, len = this.cloneNum + 1; i < len; i++){
		// 		pub.setTransform(this.childlist[i], 'translate(' + (this.startPos + i * innerWidth) + 'px, 0)')
		// 	}
		// }else{
			pub.setTransform(this.inner, 'translate(' + this.startPos + 'px, 0)');
		// }
	}

	bindEvent(){
		pub.addEvent(this.container, 'mouseover', () => {
			clearInterval(this.timer);
		}, false);
		pub.addEvent(this.container, 'mouseout', () => {
			this.move();
		}, false);
	}

	move(){
		this.timer = setInterval(() => {
			if(this.direction === 'ltr'){
				this.startPos += this.distance;
			}else if(this.direction === 'rtl'){
				this.startPos -= this.distance;
			}

			if((this.direction === 'ltr' && this.startPos >= this.endPos) || (this.direction === 'rtl' && this.startPos <= this.endPos)){
				pub.setTransform(this.inner, 'translate(' + this.endPos + 'px, 0)');
				this.moveEnd();
			}else{
				pub.setTransform(this.inner, 'translate(' + this.startPos + 'px, 0)');
			}
		}, this.speed);
	}

	moveEnd(){
		clearInterval(this.timer);							//清除定时器
		
		if(this.loop){
			this.startPos = this.startPosObj[this.direction];   //重置初始位置
			pub.setTransform(this.inner, 'translate(' + this.startPos + 'px, 0)');
			this.move();
		}
	}
}

export default Marquee;






	// function anim(m, a, p, n, s, w){
	// 	m.timer = setInterval(function(){
	// 		a.translateX -= s;
	// 		p.translateX -= s;
	// 		n.translateX -= s;
	// 		if(a.translateX <= -w){
	// 			a.translateX = w * 2;
	// 		};
	// 		if(p.translateX <= -w){
	// 			p.translateX = w * 2;
	// 		};
	// 		if(n.translateX <= -w){
	// 			n.translateX = w * 2;
	// 		};
	// 		pub.setTransform(a, 'translate(' + a.translateX + 'px, 0)');
	// 		pub.setTransform(p, 'translate(' + p.translateX + 'px, 0)');
	// 		pub.setTransform(n, 'translate(' + n.translateX + 'px, 0)');
	// 	}, 80);
	// }

	// let marquee = document.querySelectorAll('.marquee-box');
	// for(let i = 0, len = marquee.length; i < len; i++){
	// 	let m = marquee[i],
	// 		inner = m.querySelector('.marquee-inner'),
	// 		width = inner.offsetWidth,
	// 		bWidth = m.offsetWidth;

	// 	if(bWidth < width * 2){
	// 		let clonePrev = inner.cloneNode(true);
	// 		let cloneNext = inner.cloneNode(true);
	// 		m.insertBefore(clonePrev, inner);
	// 		m.appendChild(cloneNext);
	// 		let ax = 3;
	// 		pub.setTransform(cloneNext, 'translate(' + width + 'px, 0)');
	// 		pub.setTransform(clonePrev, 'translate(' + (-width) + 'px, 0)');
	// 		inner.translateX = 0;
	// 		clonePrev.translateX = -width;
	// 		cloneNext.translateX = width;
	// 		anim(m, inner, clonePrev, cloneNext, ax, width);
	// 		pub.addEvent(m, 'mouseover', function(){
	// 			clearInterval(this.timer);
	// 		});
	// 		pub.addEvent(m, 'mouseout', function(){
	// 			anim(m, inner, clonePrev, cloneNext, ax, width);
	// 		});
	// 	}
	// }

let marquee = new Marquee({
	container: document.querySelector('.marquee-box'),
	// direction: 'rtl',
	loop: true,
	speed: 19,
	// repeat: true
});