import pub from 'util/public';

const requestAnimationFrame = (() => {
	return window.requestAnimationFrame ||
		   window.webkitRequestAnimationFrame||
		   window.mozRequestAnimationFrame||
		   window.oRequestAnimationFrame || 
		   window.msRequestAnimationFrame || 
		   function(callback){
		       window.setTimeout(callback, 1000 / 60);
		   }
})();

class Particle {
	constructor(canvas, params){
		const defaults = {
			mouseMaxDis: 20000,		//鼠标与粒子之间最大连线距离
			particleMaxDis:6000,	//粒子之间最大连线距离
			num: 300				//粒子数量
		};
		this.canvas = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
		this.parent = this.canvas.parentNode;
		if(this.canvas.getContext){
			this.ctx = this.canvas.getContext('2d');
		}else{
			return false;
		}
		this.params = Object.assign({}, defaults, params);
		//记录鼠标位置
		this.mouse = {
			x: null,
			y: null,
			max: this.params.mouseMaxDis
		};
		//记录粒子信息
		this.dots = [];
		this.init();
	}

	init(){
		//事件绑定
		this.bindEvent();
		//绘制点
		this.drawParticle();
		//计算每个点的运动逻辑
		this.animate();

		setTimeout(() => {
			this.animate.call(this);
		}, 100);
	}

	bindEvent(){
		this.resize();
		pub.addEvent(window, 'resize', this.resize);

		pub.addEvent(this.parent, 'mousemove', (e) => {
			this.mouse.x = e.clientX - this.canvas.getBoundingClientRect().left;
			this.mouse.y = e.clientY - this.canvas.getBoundingClientRect().top;
		});

		pub.addEvent(this.parent, 'mouseout', (e) => {
			this.mouse.x = null;
			this.mouse.y = null;
		});
	}

	resize(){
		let parent = this.canvas.parentNode;
		this.canvas.width = parent.offsetWidth;
		this.canvas.height = parent.offsetHeight;
	}

	drawParticle(){
		let particleMaxDis = this.params.particleMaxDis;

		for(let i = 0, len = this.params.num; i < len; i++){
			let x = Math.random() * this.canvas.width;		//粒子X轴坐标
			let y = Math.random() * this.canvas.height;		//粒子Y轴坐标
			let xa = Math.random() * 2 - 1;					//粒子X轴加速度
			let ya = Math.random() * 2 - 1;					//粒子Y轴加速度

			this.dots.push({
				x,
				y,
				xa,
				ya,
				max: particleMaxDis
			});
		}
	}

	animate(){
		let canvas = this.canvas,
			ctx = this.ctx,
			dots = this.dots,
			mouse = this.mouse,
			params = this.params;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//将鼠标坐标添加进去，产生一个用于比对距离的点数组
		let ndots = [mouse].concat(dots);

		dots.forEach(dot => {
			//粒子位移
			dot.x += dot.xa;
			dot.y += dot.ya;

			//遇到边界将加速度反向
			dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
			dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

			//绘制点
			ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

			//循环对比粒子间的距离
			for(let i = 0,len = ndots.length; i < len; i++){
				let d2 = ndots[i];
				//跳过自身和鼠标未移入的情况
				if(dot === d2 || d2.x === null || d2.y === null){
					continue;
				}
				//计算两个点的坐标差值
				let xc = dot.x - d2.x;
				let yc = dot.y - d2.y;
				//计算两个粒子间的距离
				let dis = xc * xc + yc * yc;
				//距离比
				let ratio;
				//如果两个粒子之间的距离小于粒子对象的max值
                //则在两个粒子间画线
                if(dis < d2.max){
                	//如果是鼠标，让粒子像鼠标的位置移动
                	if(d2 === mouse && dis > (d2.max / 2)){
                		dot.x -= xc * 0.03;
                		dot.y -= yc * 0.03;
                	}
                	//计算距离比
                	ratio = (d2.max - dis) / d2.max;
                	//画线
                	ctx.beginPath();
                	ctx.lineWidth = ratio/2;
                	ctx.strokeStyle = `rgba(0, 0, 0, ${ratio + 0.2})`;
                	ctx.moveTo(dot.x, dot.y);
                	ctx.lineTo(d2.x, d2.y);
                	ctx.stroke();
                }
			}
			//将已经计算过的粒子从数组中删除
			ndots.splice(ndots.indexOf(dot), 1);
		});
		requestAnimationFrame(this.animate.bind(this));
	}
}

export default Particle;

