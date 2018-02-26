import pub from 'util/public';
import digit from './digit';

let WINDOW_WIDTH = 1150;
let WINDOW_HEIGHT = 768;
let RADIUS = 8;
let MARGIN_TOP = 60;     //数字距离画布上边距的距离
let MARGIN_LETT = 30;    //第一个数字距离画布左边的距离

//倒计时效果
// const endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600*1000);
let curShowTimeSeconds = 0;

const balls = [];   //存储小球
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LETT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH * 4/5/108) - 1;
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    render(context);

    setInterval(() => {
        render(context);
        update();
    }, 30);

    function render(ctx){
        let hours = parseInt(curShowTimeSeconds/3600);
        let minutes = parseInt((curShowTimeSeconds - hours * 3600)/60);
        let seconds = curShowTimeSeconds % 60;        

        ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
        renderDigit(MARGIN_LETT, MARGIN_TOP, parseInt(hours/10), ctx);
        renderDigit(MARGIN_LETT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), ctx);
        renderDigit(MARGIN_LETT + 30*(RADIUS+1), MARGIN_TOP, 10, ctx);
        renderDigit(MARGIN_LETT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), ctx);
        renderDigit(MARGIN_LETT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), ctx);
        renderDigit(MARGIN_LETT + 69*(RADIUS+1), MARGIN_TOP, 10, ctx);
        renderDigit(MARGIN_LETT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), ctx);
        renderDigit(MARGIN_LETT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), ctx);
        //绘制彩色小球
        balls.forEach(ball => {
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, RADIUS, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });
    }

    function renderDigit(x, y, num, ctx){
        ctx.fillStyle = 'rgba(0, 102, 153, 1)';
    
        for(let i = 0; i < digit[num].length; i++){
            for(let j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    ctx.beginPath();
                    let dx = x + j*2*(RADIUS+1) + (RADIUS+1);
                    let dy = y + i*2*(RADIUS+1) + (RADIUS+1);
                    ctx.arc(dx, dy, RADIUS, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }

    function getCurrentShowTimeSeconds(){
        let date = new Date();
        // let ret = endTime.getTime() - date.getTime();
        // ret = Math.round(ret/1000);     //转换成秒

        // return ret >= 0 ? ret : 0;
        
        //计算今天过了多少秒
        let ret = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        return ret;
    }

    function update(){
        let nextShowTimeSeconds = getCurrentShowTimeSeconds();

        let nextHours = parseInt(nextShowTimeSeconds / 3600);
        let nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60);
        let nextSeconds = nextShowTimeSeconds % 60;

        let curHours = parseInt(curShowTimeSeconds / 3600);
        let curMinutes = parseInt((curShowTimeSeconds - curHours * 3600)/60);
        let curSeconds = curShowTimeSeconds % 60;

        if(nextSeconds !== curSeconds){
            //分别对比每个位置的数字是否变化
            if(parseInt(curHours / 10) !== parseInt(nextHours / 10)){
                addBalls(MARGIN_LETT + 0, MARGIN_TOP, parseInt(curHours / 10));
            }
            if(parseInt(curHours % 10) !== parseInt(nextHours % 10)){
                addBalls(MARGIN_LETT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours % 10));
            }
            if(parseInt(curMinutes / 10) !== parseInt(nextMinutes / 10)){
                addBalls(MARGIN_LETT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes / 10));
            }
            if(parseInt(curMinutes % 10) !== parseInt(nextMinutes % 10)){
                addBalls(MARGIN_LETT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes % 10));
            }
            if(parseInt(curSeconds / 10) !== parseInt(nextSeconds / 10)){
                addBalls(MARGIN_LETT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds / 10));
            }
            if(parseInt(curSeconds % 10) !== parseInt(nextSeconds % 10)){
                addBalls(MARGIN_LETT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds % 10));
            }

            curShowTimeSeconds = nextShowTimeSeconds;
        }

        updateBalls();
    }

    function addBalls(x, y, num){
        for(let i = 0; i < digit[num].length; i++){
            for(let j = 0; j < digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    let aBall = {
                        x: x + j*2*(RADIUS+1) + (RADIUS+1),
                        y: y + i*2*(RADIUS+1) + (RADIUS+1),
                        g: 1.5 + Math.random(),
                        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                        vy: -10,
                        color: colors[Math.floor(Math.random() * colors.length)]
                    }
                    balls.push(aBall);
                }
            }
        }
    }

    function updateBalls(){
        balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.vy += ball.g;

            if(ball.y >= WINDOW_HEIGHT - RADIUS){
                ball.y = WINDOW_HEIGHT - RADIUS;
                ball.vy = -ball.vy * 0.65;
            }
        });
        //遍历小球，如果在画布中，保留
        let cnt = 0;
        balls.forEach((ball, i) => {
            if(ball.x + RADIUS > 0 && ball.x - RADIUS < WINDOW_WIDTH){
                balls[cnt++] = balls[i];
            }
        });
        //删除不在画布中的小球数据
        while(balls.length > cnt){
            balls.pop();
        }
    }
}




