import pub from 'util/public';

class Item {
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.theme = 0;
    }
}

class TouchLock {
    constructor(container, params){
        const defaults = {
            width: 300,
            height: 300,
            cols: 3,
            rows: 3,
            bg: '#aaa',
            near: true,
            correct: [0, 1, 2, 4, 6, 7, 8],
            onSuccess: function(){},
            onError: function(){}
        }
        this.container = document.querySelector(container);
        this.params = Object.assign({}, defaults, params);
        this.items = [];
        this.lines = [];
        this.isMouseDown = false;
        this.moveXY = null;
        this.isError = false;

        this.init();
    }

    init(){
        this.initCanvas();
        this.pageInit();
        this.drawBg();
        this.bindEvent();
        this.animate();
    }

    initCanvas(){
        let params = this.params;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = params.width;
        this.canvas.height = params.height;
        this.container.appendChild(this.canvas);
    }

    pageInit(){
        let params = this.params;
        let c = params.cols;
        let r = params.rows;
        let w = Math.floor(params.width/c);
        let h = Math.floor(params.height/r);

        for(let i = 0, len = r * c; i < len; i++){
            let x = Math.floor(w / 2) + Math.floor(i % c) * w;
            let y = Math.floor(h / 2) + Math.floor(i / c) * h;
            let r = Math.floor(w / 2 * 0.6);
            let item = new Item(x, y, r);
            item.i = i;
            this.items.push(item);
        }
    }

    drawBg(){
        let params = this.params,
            bg = params.bg,
            ctx = this.ctx;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, params.width, params.height);
        ctx.restore();
    }

    bindEvent(){
        this.isTouch = ('ontouchend' in document);
        this.touchstart = this.isTouch ? 'touchstart' : 'mousedown';
        this.touchmove = this.isTouch ? 'touchmove' : 'mousemove';
        this.touchend = this.isTouch ? 'touchend' : 'mouseup';

        this._start = this.start.bind(this);
        this._move = this.move.bind(this);
        this._end = this.end.bind(this);

        pub.addEvent(this.canvas, this.touchstart, this._start);
        pub.addEvent(this.canvas, this.touchmove, this._move);
        pub.addEvent(this.canvas, this.touchend, this._end);
        // pub.addEvent(this.canvas, 'mouseout', this._end);
    }

    start(e){
        e = this.isTouch ? e.touches[0] : e;
        this.isMouseDown = true;
        let point = this.windowToCanvas(e.clientX, e.clientY);
        this.check(point);
    }

    move(e){
        e = this.isTouch ? e.touches[0] : e;
        if(!this.isMouseDown) return;
        let point = this.moveXY = this.windowToCanvas(e.clientX, e.clientY);
        this.check(point);
    }

    end(e){
        e = this.isTouch ? e.touches[0] : e;
        this.isMouseDown = false;
        this.moveXY = null;
        if(this.checkLines()){
            this.params.onSuccess && this.params.onSuccess.call(this);
        }else{
            this.isError = true;
            this.items.forEach(item => {
                if(item.theme === 1){
                    item.theme = 2;
                }
            });
            this.params.onError && this.params.onError.call(this);
            setTimeout(() => {
                this.reset();
            }, 1000);
        }
    }

    check(e){
        let c = this.params.cols;
        let isNear = true;
        this.items.forEach(item => {
            if(item.theme !== 1 && this.isInCirle(item, e.x, e.y)){
                if(this.lines.length > 0 && this.params.near){
                    let a = item.i;
                    let b = this.lines[this.lines.length - 1].i;
                    isNear = Math.abs(a % c - b % c) < 2 &&
                                Math.abs(Math.floor(a / c) - Math.floor(b / c)) < 2;
                }else{
                    isNear = true;
                }
                if(isNear){
                    item.theme = 1;
                    this.lines.push(item);
                }
            }
        });
    }

    checkLines(){
        let res = true;

        if(this.lines.length !== this.params.correct.length){
            return false;
        }

        for(let i = 0, len = this.lines.length; i < len; i++){
            if(this.lines[i].i !== this.params.correct[i]){
                res = false;
                break;
            }
        }
        return res;
    }

    isInCirle(b, x, y){
        let mx = x - b.x;
        let my = y - b.y;
        let mr = Math.sqrt(mx * mx + my * my);
        if(mr < b.r) {
            return true;
        };
        return false;
    }

    windowToCanvas(x, y){
        let canvasBox = this.canvas.getBoundingClientRect();

        return {
            x: x - canvasBox.left,
            y: y - canvasBox.top
        }
    }

    reset(){
        this.items.forEach(item => {
            item.theme = 0;
        });
        this.lines = [];
        this.isError = false;
    }

    animate(){
        this.ctx.clearRect(0, 0, this.params.width, this.params.height);
        this.drawBg();
        this.items.forEach(item => {
            this.drawItem(item);
        });
        this.drawLine();
        window.requestAnimationFrame(this.animate.bind(this));
    }

    drawItem(item){
        let ctx = this.ctx;

        switch(item.theme){
            case 0:
                ctx.beginPath();
                ctx.strokeStyle = '#fff';
                ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
                break;
            case 1:
                this.drawMoveItem(item, 'rgba(0, 154, 97, 1)', 'rgba(255, 255, 255, .6)');
                break;
            case 2:
                this.drawMoveItem(item, 'rgba(247, 87, 75, 1)', 'rgba(248, 208, 205, .6)');
                break;
        }
    }

    drawMoveItem(item, c1, c2){
        let ctx = this.ctx;

        ctx.beginPath();
        ctx.fillStyle = c2;
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = c1;
        ctx.arc(item.x, item.y, item.r * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = c1;
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }

    drawLine(){
        let ctx = this.ctx,
            lines = this.lines,
            moveXY = this.moveXY;

        if(lines.length > 0){
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = this.isError ? 'rgba(247, 87, 75, 1)' : 'rgba(0,154,97,1)';
            ctx.lineWidth = 4;
            for(var i = 0; i < lines.length; i++) {
                if(i == 0) {
                    ctx.moveTo(lines[i].x, lines[i].y);
                };
                lines[i + 1] && ctx.lineTo(lines[i + 1].x, lines[i + 1].y);
            };
            moveXY && ctx.lineTo(moveXY.x, moveXY.y);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }
}

export default TouchLock;