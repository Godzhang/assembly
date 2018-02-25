import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public';
import State from 'util/state';
// import createVirtualDom from 'util/Element';
// import 'util/vue-study';

// import 'util/canvas/lottery';
// import 'util/canvas/countdown/countdown';

const cvs = document.querySelector('#canvas');
let ctx = null;
if(cvs.getContext){
	ctx = cvs.getContext('2d');
}
cvs.width = 1200;
cvs.height = 800;

let skyStyle = ctx.createRadialGradient(
    cvs.width/2, cvs.height, 0,
    cvs.width/2, cvs.height, cvs.height);
skyStyle.addColorStop(0, '#035');
skyStyle.addColorStop(1, '#000');
ctx.fillStyle = skyStyle;
ctx.fillRect(0, 0, cvs.width, cvs.height);

fillMoon(ctx, 2, 1000, 200, 100, 0);
drawLand(ctx);

for(let i = 0; i < 200; i++){
    let r = Math.random() * 5 + 5;
    let x = cvs.width * Math.random();
    let y = cvs.height * Math.random() * 0.65;
    let deg = Math.random() * 360;
    drawStar(ctx, x, y, r, deg);
}

function drawStar(ctx, x, y, r, deg){

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(deg / 180 * Math.PI);
    ctx.scale(r, r);

    starPath(ctx);

    ctx.fillStyle = '#fb3';
    // ctx.strokeStyle = '#fd5';
    // ctx.lineWidth = 3;
    // ctx.lineJoin = 'round';

    ctx.fill();
    // ctx.stroke();

    ctx.restore();
}

function starPath(ctx){
    ctx.beginPath();
    for(let i = 0; i < 5; i++){
        ctx.lineTo(Math.cos((18+i*72)/180*Math.PI),
                   -Math.sin((18+i*72)/180*Math.PI));
        ctx.lineTo(Math.cos((54+i*72)/180*Math.PI) * 0.5,
                   -Math.sin((54+i*72)/180*Math.PI) * 0.5);
    }
    ctx.closePath();
}

function fillMoon(ctx, d, x, y, r, deg, fillColor){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI / 180);
    ctx.scale(r, r);
    pathMoon(ctx, d);
    ctx.fillStyle = fillColor || '#fb5';
    ctx.fill();
    ctx.restore();
}

function pathMoon(ctx, d){
    ctx.beginPath();
    ctx.arc(0, 0, 1, Math.PI / 2, Math.PI * 3 / 2, true);
    ctx.moveTo(0, -1);
    ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
    ctx.closePath();
}

function dis(x1, y1, x2, y2){
    return Math.sqrt((x1-x2) * (x1-x2) + (y1-y2) * (y1-y2));
}

function drawLand(ctx){
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 600);
    ctx.bezierCurveTo(540, 400, 660, 800, 1200, 600);
    ctx.lineTo(1200, 800);
    ctx.lineTo(0, 800);
    ctx.closePath();

    let landStyle = ctx.createLinearGradient(0, 800, 0, 0);
    landStyle.addColorStop(0, '#030');
    landStyle.addColorStop(1, '#580');
    ctx.fillStyle = landStyle;

    ctx.fill();
    ctx.restore();
}



// function draw(){
// 	ctx.fillStyle = '#000';
// 	ctx.beginPath();
// 	ctx.moveTo(100,100);
// 	ctx.bezierCurveTo(110,110,199,278,300,379);
// 	ctx.lineTo(400,100);
// 	ctx.closePath();
// }
// function cirle(){
// 	ctx.fillStyle = '#000';
// 	ctx.beginPath();
// 	ctx.arc(100, 200, 50, 0, Math.PI * 2);
// 	ctx.closePath();
// }
// draw();
// ctx.fill();
// cirle();
// ctx.fill();

// let fns = [draw, cirle];

// cvs.onmousemove = function(e){
// 	let x = e.offsetX,
// 		y = e.offsetY;
// 	ctx.clearRect(0, 0, 1000, 800);
// 	for(let i = fns.length; i--;){
// 		fns[i]();
// 		if(ctx.isPointInPath(x, y)){
// 			ctx.fillStyle = '#f00';
// 		}else{
// 			ctx.fillStyle = '#000';
// 		}
// 		ctx.fill();
// 	}
// }

// ctx.save();
// ctx.transform(1, Math.tan(Math.PI/180*30), 0, 1, 0, 0);
// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.fillStyle = '#f00';
// ctx.fill();
// ctx.restore();
// ctx.beginPath();

// ctx.arc(100, 100, 50, 0, Math.PI * 2);
// ctx.fillStyle = '#000';
// ctx.fill();

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




