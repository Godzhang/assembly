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
			this.containerWidth = this.container.innerWidth;
			this.innerWidth = this.inner.innerWidth;
		}

		init(){

		}

		move(){

		}


	}








	function anim(m, a, p, n, s, w){
		m.timer = setInterval(function(){
			a.translateX -= s;
			p.translateX -= s;
			n.translateX -= s;
			if(a.translateX <= -w){
				a.translateX = w * 2;
			};
			if(p.translateX <= -w){
				p.translateX = w * 2;
			};
			if(n.translateX <= -w){
				n.translateX = w * 2;
			};
			pub.setTransform(a, 'translate(' + a.translateX + 'px, 0)');
			pub.setTransform(p, 'translate(' + p.translateX + 'px, 0)');
			pub.setTransform(n, 'translate(' + n.translateX + 'px, 0)');
		}, 80);
	}

	let marquee = document.querySelectorAll('.marquee-box');
	for(let i = 0, len = marquee.length; i < len; i++){
		let m = marquee[i],
			inner = m.querySelector('.marquee-inner'),
			width = inner.offsetWidth,
			bWidth = m.offsetWidth;
		if(bWidth < width * 2){
			let clonePrev = inner.cloneNode(true);
			let cloneNext = inner.cloneNode(true);
			m.insertBefore(clonePrev, inner);
			m.appendChild(cloneNext);
			let ax = 3;
			pub.setTransform(cloneNext, 'translate(' + width + 'px, 0)');
			pub.setTransform(clonePrev, 'translate(' + (-width) + 'px, 0)');
			inner.translateX = 0;
			clonePrev.translateX = -width;
			cloneNext.translateX = width;
			anim(m, inner, clonePrev, cloneNext, ax, width);
			pub.addEvent(m, 'mouseover', function(){
				clearInterval(this.timer);
			});
			pub.addEvent(m, 'mouseout', function(){
				anim(m, inner, clonePrev, cloneNext, ax, width);
			});
		}
	}
})();
	