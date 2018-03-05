const getTime = time => time < 10 ? '0' + time : time;

class Watch {
	constructor(canvasid, params){
		const defaults = {
			width: 1024,				//画布宽度
			height: 768,				//画布高度
			r: 250,						//钟表半径
			x: 512,						//钟表中心x坐标
			y: 384,						//钟表中心y坐标
			cirleLineWidth: 20,			//钟表外圆线宽度
			cirleLineColor: '#000',		//钟表外圆线颜色

			hourScaleWidth: 5,			//小时刻度宽度
			hourScaleHeight: 30,		//小时刻度高度
			hourScaleColor: '#000',		//小时刻度颜色

			minuteScaleWidth: 3,		//分钟刻度宽度
			minuteScaleHeight: 15,		//分钟刻度高度
			minuteScaleColor: '#999',	//分钟刻度颜色

			numSize: 30,				//数字字体大小
			numFamily: 'Arial',			//数字字体类型
			numColor: '#000',			//数字颜色
			numDis: 50,					//数字距离钟表外边框距离

			hourLineWidth: 10,			//时针宽度
			hourLineColor: '#000',		//时针颜色
			hourLineShortDis: 25,		//时针短头长度
			hourLineLongDis: 120,		//时针长头长度
			hourLineStyle: 'round',		//时针样式

			minuteLineWidth: 5,			//分针宽度
			minuteLineColor: '#999',	//分针颜色
			minuteLineShortDis: 20,		//分针短头长度
			minuteLineLongDis: 180,		//分针长头长度
			minuteLineStyle: 'round',	//分针样式

			secondsLineWidth: 10,		//分针宽度
			secondsLineColor: '#f00',	//分针颜色
			secondsLineShortDis: 40,	//分针短头长度
			secondsLineLongDis: 200,	//分针长头长度

			centerCirleColor: '#999',	//中心点颜色
			centerCirleRadius: 10,		//中心点半径

			onChange: function(){}		//时间变化之后的回调，返回当前时间
		}
		this.canvas = document.querySelector(canvasid);
		this.ctx = this.canvas.getContext('2d');
		this.params = Object.assign({}, defaults, params);

		this.init();
	}

	init(){
		let canvas = this.canvas,
			params = this.params;

		canvas.width = params.width;
		canvas.height = params.height;

		this.run();
		setInterval(() => {
			this.run();
		}, 1000);
	}

	run(){
		let cvs = this.canvas,
			ctx = this.ctx,
			params = this.params;

		let date = new Date();
		let hour = date.getHours();
		let minute = date.getMinutes();
		let seconds = date.getSeconds();

		let hourDeg = (hour - 12) * 30 + 30 * (minute / 60);
		let minuteDeg = minute * 6;
		let secondsDeg = seconds * 6;

		ctx.clearRect(0, 0, cvs.width, cvs.height);
		//将原点移动到画布中心
		ctx.save();
		ctx.translate(cvs.width/2, cvs.height/2);
		
		this.drawWatchRound();			//绘制表盘外圈
		this.drawHourScale();			//绘制小时刻度
		this.drawMinuteScale();			//绘制分钟刻度
		this.drawWatchNumber();			//绘制数字
		this.drawHour(hourDeg);			//绘制时针,要绘制圆形线帽，不能加closePath,会覆盖样式，变成方头
		this.drawMinute(minuteDeg);		//绘制分针
		this.drawSeconds(secondsDeg);	//绘制秒针
		this.drawCenterRound();			//绘制中心原点
		ctx.restore();

		let nowTime = getTime(hour) + ':' + getTime(minute) + ':' + getTime(seconds);
		params.onChange && params.onChange.call(this, nowTime, getTime(hour), getTime(minute), getTime(seconds));
	}

	drawWatchRound(){
		let ctx = this.ctx,
			params = this.params;
		
		ctx.beginPath();
		ctx.arc(0, 0, params.r, 0, Math.PI*2);
		ctx.lineWidth = params.cirleLineWidth;
		ctx.strokeStyle = params.cirleLineColor;
		ctx.stroke();
		ctx.closePath();
	}

	drawHourScale(){
		let ctx = this.ctx,
			params = this.params;

		for(let i = 0; i < 12; i++){
			ctx.save();
			ctx.beginPath();
			ctx.rotate(i*30*Math.PI/180);
			ctx.moveTo(0, -params.r + (params.cirleLineWidth / 2));
			ctx.lineTo(0, -params.r + (params.cirleLineWidth / 2) + params.hourScaleHeight);
			ctx.lineWidth = params.hourScaleWidth;
			ctx.strokeStyle = params.hourScaleColor;
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
		}
	}

	drawMinuteScale(){
		let ctx = this.ctx,
			params = this.params;

		for(let i = 0; i < 12; i++){
			for(let j = 1; j < 5; j++){
				ctx.save();
				ctx.beginPath();
				ctx.rotate((i*30 + j*6)*Math.PI/180);
				ctx.moveTo(0, -params.r + (params.cirleLineWidth / 2));
				ctx.lineTo(0, -params.r + (params.cirleLineWidth / 2) + params.minuteScaleHeight);
				ctx.lineWidth = params.minuteScaleWidth;
				ctx.strokeStyle = params.minuteScaleColor;
				ctx.closePath();
				ctx.stroke();
				ctx.restore();
			}
		}
	}

	drawWatchNumber(){
		let ctx = this.ctx,
			params = this.params;

		for(let i = 0; i < 12; i++){
			ctx.save();
			ctx.beginPath();
			let deg = i * 30 * Math.PI / 180;
			ctx.font = params.numSize + 'px ' + params.numFamily;
			ctx.textAlign = 'center';
			ctx.fillStyle = params.numColor;
			ctx.fillText((i === 0 ? '12' : i), ((params.r - params.cirleLineWidth/2 - params.numDis) * Math.sin(deg)), -((params.r - params.cirleLineWidth/2 - params.numDis) * Math.cos(deg) - (params.numSize * 2 / 5)));
			ctx.closePath();
			ctx.restore();
		}
	}

	drawHour(deg){
		let ctx = this.ctx,
			params = this.params;

		ctx.beginPath();
		ctx.save();
		ctx.rotate(deg * Math.PI / 180);
		ctx.lineWidth = params.hourLineWidth;
		ctx.lineCap = params.hourLineStyle;
		ctx.strokeStyle = params.hourLineColor;
		ctx.moveTo(0, params.hourLineShortDis);
		ctx.lineTo(0, -params.hourLineLongDis);
		ctx.stroke();
		ctx.restore();
	}

	drawMinute(deg){
		let ctx = this.ctx,
			params = this.params;

		ctx.beginPath();
		ctx.save();
		ctx.rotate(deg * Math.PI / 180);
		ctx.lineWidth = params.minuteLineWidth;
		ctx.lineCap = params.minuteLineStyle;
		ctx.strokeStyle = params.minuteLineColor;
		ctx.moveTo(0, params.minuteLineShortDis);
		ctx.lineTo(0, -params.minuteLineLongDis);
		ctx.stroke();
		ctx.restore();
	}

	drawSeconds(deg){
		let ctx = this.ctx,
			params = this.params;

		ctx.beginPath();
		ctx.save();
		ctx.rotate(deg * Math.PI / 180);
		ctx.fillStyle = params.secondsLineColor;
		ctx.moveTo(-params.secondsLineWidth/2, params.secondsLineShortDis);
		ctx.lineTo(params.secondsLineWidth/2, params.secondsLineShortDis);
		ctx.lineTo(0, -params.secondsLineLongDis);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	drawCenterRound(){
		let ctx = this.ctx,
			params = this.params;

		ctx.beginPath();
		ctx.fillStyle = params.centerCirleColor;
		ctx.arc(0, 0, params.centerCirleRadius, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
}

// new Watch('#canvas');

export default Watch;