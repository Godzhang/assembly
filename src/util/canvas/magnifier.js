import pub from 'util/public';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const offCanvas = document.querySelector('#offCanvas');
const offContext = offCanvas.getContext('2d');

let isMouseDown = false;
const width = canvas.width = 960;
const height = canvas.height = 600;

const img = new Image();
img.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519835358147&di=796f97a270714d2c1d7762585fcc56bd&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fa%2F596c20a8d333d.jpg';
img.onload = function(){
    offCanvas.width = img.width;
    offCanvas.height = img.height;
    
    ctx.drawImage(img, 0, 0, width, height);
    offContext.drawImage(img, 0, 0);   
}

pub.addEvent(canvas, 'mousedown', (e) => {
    e.preventDefault();
    let point = windowToCanvas(e.clientX, e.clientY);
    isMouseDown = true;

    drawCanvasWithMagnifier(true, point);
});
pub.addEvent(canvas, 'mousemove', (e) => {
    e.preventDefault();
    if(isMouseDown){
        let point = windowToCanvas(e.clientX, e.clientY);
        drawCanvasWithMagnifier(true, point);
    }
});
pub.addEvent(canvas, 'mouseup', (e) => {
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier(false);
    
});
pub.addEvent(canvas, 'mouseout', (e) => {
    e.preventDefault();
    isMouseDown = false;
    drawCanvasWithMagnifier(false);
    
});

function windowToCanvas(x, y){
    let bbox = canvas.getBoundingClientRect();
    return {
        x: x - bbox.left,
        y: y - bbox.top
    }
}

function drawCanvasWithMagnifier(isShowMagnifier, point){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
    if(isShowMagnifier){
        drawMagnifier(point);
    }
}

function drawMagnifier(point){
    let cx = point.x * 2;
    let cy = point.y * 2;

    let mr = 150;

    let sx = cx - mr;
    let sy = cy - mr;

    let dx = point.x - mr;
    let dy = point.y - mr;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#08c';
    ctx.arc(point.x, point.y, mr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(offCanvas, sx, sy, mr*2, mr*2, dx, dy, mr*2, mr*2);
    ctx.restore();
}