import pub from 'util/public';

const canvas = document.querySelector('#cvs');
let ctx;
if(canvas.getContext){
	ctx = canvas.getContext('2d');
}
const btn = document.querySelector('#btn');
const num = Math.PI / 180;
let step = 20 + 10 * Math.random();
let angle = 0;

const colorArr=["#ffff00","#6699ff","#cc9933","#999933","#006633","#333399","#33cc33","#00ffff"];  
const textArr=["苹果6S","电脑","电视","冰箱","空调","洗衣机","宝马","摩托车"];  

ctx.translate(500, 400);

let t = setInterval(() => {
	if(step < 0.2){
		clearInterval(t);
		let n = Math.ceil(angle/45);
		let con = textArr[textArr.length - n];
		ctx.font = '18px Arial';
		ctx.textAlign = 'center';
		ctx.fillText(`您的奖品是${con}`, 0, -250);
	}else{
		if(angle >= 360){
			angle = 0;
		}
		step *= 0.95;
		angle += step;
		ctx.clearRect(0, 0, 1000, 800);

		//绘制箭头
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.moveTo(250, -10);
		ctx.lineTo(250, 10);
		ctx.lineTo(220, 0);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.save();
		ctx.rotate(angle * num);
		for(let i = 0, len = colorArr.length; i < len; i++){
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.fillStyle = colorArr[i];
			ctx.arc(0, 0, 200, i*num*45, (i+1)*45*num);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		//添加文字
		for(let i = 0, len = colorArr.length; i < len; i++){
			ctx.save();
			ctx.beginPath();
			ctx.rotate((i*45+20)*num);
			ctx.fillStyle = '#000';
			ctx.font = '16px Arial';
			ctx.fillText(textArr[i], 80, 10);
			ctx.restore();
		}
		ctx.restore();
	}
}, 50);









