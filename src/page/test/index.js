import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public';
import State from 'util/state';
// import createVirtualDom from 'util/Element';
// import 'util/vue-study';

const cvs = document.querySelector('#cvs');
const ctx = cvs.getContext('2d');

















// ctx.shadowColor = '#00f';
// ctx.shadowBlur = 1;
// ctx.shadowOffsetX = 2;
// ctx.shadowOffsetY = 3;

// ctx.font = 'bold italic 50px Arial';
// ctx.textAlign = 'start';
// ctx.fillStyle = '#f00';
// ctx.fillText('zhangqi', 50, 50);
// ctx.strokeStyle = '#08c';
// ctx.strokeText('zhaojinge', 50, 150);

// const img = document.querySelector('#img');
// ctx.drawImage(img, 50, 50, 300, 300, 0, 0, 100, 100);

//两条贝塞尔曲线画椭圆
// function createTuoYuan(x, y, width, height){
// 	let k = (width / 0.75) / 2;
// 	let w = width / 2;
// 	let h = height / 2;

// 	ctx.beginPath();
// 	ctx.moveTo(x, y-h);
// 	ctx.bezierCurveTo(x+k, y-h, x+k, y+h, x, y+h);
// 	ctx.bezierCurveTo(x-k, y+h, x-k, y-h, x, y-h);
// 	ctx.closePath();
// }

// createTuoYuan(200, 200, 200, 100);
// ctx.stroke();

//用直线画椭圆
// function DrawEllipse(ctx,O,OA,OB){
//     //画椭圆，例子：var B=new Array(150,150); DrawEllipse(hb,B,50,30);
//     var x=O[0]+OA;
//     var y=O[1];
//     ctx.moveTo(x,y);
//     for (var i=0;i<=360;i++){
//         var ii=i*Math.PI/180;
//         var x=O[0]+OA*Math.cos(ii);
//         var y=O[1]-OB*Math.sin(ii);
//         console.log(x,y)
//         ctx.lineTo(x,y);
//     }
//     ctx.stroke();
// }

// DrawEllipse(ctx, [200, 200], 150, 120);

//圆角矩形
// function createRoundRect(x, y, w, h, r){
// 	if(w < r * 2){
// 		r = w / 2;
// 	}
// 	if(h < r * 2){
// 		r = h / 2;
// 	}

// 	ctx.beginPath();
// 	ctx.moveTo(x+r, y);
// 	ctx.arcTo(x+w, y, x+w, y+h, r);
// 	ctx.arcTo(x+w, y+h, x, y+h, r);
// 	ctx.arcTo(x, y+h, x, y, r);
// 	ctx.arcTo(x, y, x+w, y, r);
// 	ctx.closePath();
// 	ctx.stroke();
// }
// createRoundRect(200,300,200,120,20);

// const linear = ctx.createRadialGradient(75,75,5,55,55,55);
// linear.addColorStop(0, '#fff');
// linear.addColorStop(0.5, '#f0f');
// linear.addColorStop(0.9, '#555');
// linear.addColorStop(1, '#f00');
// ctx.fillStyle = linear;
// ctx.fillRect(0, 0, 200, 200);
// ctx.strokeStyle = linear;
// ctx.moveTo(0, 50);
// ctx.lineTo(100, 50);
// ctx.lineWidth = 10;

// ctx.beginPath();
// ctx.moveTo(400, 400);
// ctx.arcTo(500, 400, 450, 450, 50);
// ctx.strokeStyle = '#f00';
// ctx.beginPath();
// ctx.moveTo(100, 0);
// ctx.bezierCurveTo(200, 100, 0, 200, 100, 500);
// ctx.strokeStyle = '#f00';
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(100, 0);
// ctx.lineTo(200, 100);
// ctx.lineTo(0, 200);
// ctx.lineTo(100, 500);
// ctx.lineTo(100, 0);
// ctx.strokeStyle = '#000';
// ctx.stroke();

// ctx.moveTo(100.5, 100.5);
// ctx.lineTo(100.5, 300.5);
// ctx.lineTo(300.5, 300.5);
// ctx.lineTo(300.5, 100.5);
// ctx.lineTo(100.5, 100.5);

// ctx.closePath();

// ctx.stroke();

// ctx.fillStyle = '#08c';
// ctx.fill();




