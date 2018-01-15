import './index.css';
import pub from 'util/public.js';

(function(){
	class Marquee{
		constructor(options){
			this.options = options || {};
			this.container = this.options.container || document.querySelectorAll('.marquee-box');
			this.inner = this.options.inner || this.container.querySelector('.marquee-inner');
			this.distance = this.options.distance || 5;
			this.speed = this.options.speed || 80;
			this.loop = this.options.loop || false;
			this.direction = this.options.direction || 'ltr';
			this.containerWidth = this.container.offsetWidth;
			this.innerWidth = this.inner.offsetWidth;
			this.startPos = null;
			this.endPos = null;
			this.timer = null;

			this.init();
		}

		init(){
			if(this.loop){
				this.cloneList();
			}
			this.initPosition();
			this.bindEvent();
			this.move();
		}

		cloneList(){
			// if(innerWidth > containerWidth/2){

			// }
		}

		initPosition(){
			if(this.direction === 'ltr'){
				this.startPos = -this.innerWidth;
				this.endPos = this.containerWidth;
				pub.setTransform(this.inner, 'translate(' + this.startPos + 'px, 0)');
			}else if(this.direction === 'rtl'){
				this.startPos = this.containerWidth;
				this.endPos = -this.innerWidth;
				pub.setTransform(this.inner, 'translate(' + this.endPos + 'px, 0)');
			}
		}

		bindEvent(){

		}

		move(){
			this.timer = setInterval(() => {
				if(this.direction === 'ltr'){
					this.startPos += this.distance;
				}else if(this.direction === 'rtl'){
					this.startPos -= this.distance;
				}

				if(this.startPos >= this.endPos){
					pub.setTransform(this.inner, 'translate(' + this.endPos + 'px, 0)');
				}else{
					pub.setTransform(this.inner, 'translate(' + this.startPos + 'px, 0)');
				}
				
			}, this.speed);
		}


	}

	window.Marquee = Marquee;






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
})();

let marquee = new Marquee({
	container: document.querySelector('.marquee-box')
});