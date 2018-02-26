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
