import pub from 'util/public';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 960;
const height = canvas.height = 800;
const maxR = 30;
const minR = 5;
const ball = [];

let mousePoint = {x: width/2, y: height/2};
let particleNum = 0;
let theta = 0;
let force = 0;

class Particle {
	constructor(opts){
		this.x = opts.x || 10;
		this.y = opts.y || 10;
		this.r = opts.r || 10;
		this.fillStyle = opts.fillStyle || '#000';
		this.vx = opts.vx || 4;
		this.vy = opts.vy || -4;
		this.g = opts.g || 2;
		this.theta = getRandom([0, Math.PI]);
		this.ctx = opts.ctx;

		return this;
	}

	render(){
		let ctx = this.ctx;
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();

		return this;
	}
}

pub.addEvent(canvas, 'mousemove', (e) => {
	mousePoint = windowToCanvas(e.clientX, e.clientY);
});

force = getRandom([2, 8]);
theta = getRandom([0, 2 * Math.PI]);
particleNum = 1;

// function createParticle(){
	for(let i = 0; i < particleNum; i++){
		ball.push(new Particle({
			ctx: ctx,
			x: mousePoint.x,
			y: mousePoint.y,
			vx: Math.sin(theta) * force,
			vy: Math.cos(theta) * force,
			r: getRandom([minR, maxR]),
			fillStyle: getRandomColor(),
			wander: getRandom([0.5, 2]),
			drag: getRandom([0.9, 0.99])
		}));
	}
// }

function move(p, i){
	p.x += p.vx;
	p.y += p.vy;

	p.vx *= p.drag;
	p.vy *= p.drag;

	p.theta += getRandom([-0.5, 0.5]) * p.wander;

	p.vx += Math.sin(p.theta) * 0.1;
	p.vy += Math.cos(p.theta) * 0.1;

	p.r *= 0.96;

	if(p.r <= 0.5){
		ball.splice(i, 1);
	}
}

function windowToCanvas(x, y){
	let bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left,
		y: y - bbox.top
	}
}

function getRandomColor(){
	let r = Math.round(255 * Math.random());
	let g = Math.round(255 * Math.random());
	let b = Math.round(255 * Math.random());
	let color = `rgb(${r}, ${g}, ${b})`;

	return color;
}

function getRandom(arr, int){
	const max = Math.max(...arr);
	const min = Math.min(...arr);
	const num = Math.random() * (max - min) + min;

	return int ? Math.round(num) : num;
}

function draw(p){
	p.render();
}

function updating(){
	// window.requestAnimationFrame(updating);
	ctx.clearRect(0, 0, width, height);
	ball.forEach(draw);
	ball.forEach(move);
};
	
// setInterval(() => {
// 	updating();
// }, 1000);









