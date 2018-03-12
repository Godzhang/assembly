import './index.css';
import pub from 'util/public';

class Datepicker {
	constructor(container, params){
		const defaults = {
			reset: false,				//每次打开是否需要重置到当前月份
			startfromMonday: false,  	//第一列显示周日或者周一
			boxClass: "dateBox",     	//默认日期容器的类
			onSelect: function(){}
		}
		this.container = typeof container === 'string' ? document.querySelector(container) : container;
		this.params = Object.assign({}, defaults, params);
		this.weekDay = ['日', '一', '二', '三', '四', '五', '六'];
		if(this.params.startfromMonday){
			this.weekDay.push(this.weekDay.shift());
		}
		this.renderHtml = "";
		this.currentTime = new Date();
		this.box = null;

		this.init();
	}

	init(){
		//获取当前时间，年月日
		this.currentYear = this.year = this.currentTime.getFullYear();
		this.currentMonth = this.month = this.currentTime.getMonth() + 1;
		this.date = this.currentTime.getDate();

		//添加容器
		this.addBox();
		this.bindEvent();
	}

	addBox(){
		let container = this.container,
			box = document.createElement("div");

		box.className = this.params.boxClass;
		box.style.position = "absolute";
		box.style.top = pub.getOffsetTop(container) + container.offsetHeight + 5 + "px";
		box.style.left = pub.getOffsetLeft(container) + "px";
		document.body.appendChild(box);

		this.box = box;
	}

	bindEvent(){
		let box = this.box,
			container = this.container,
			params = this.params;

		//输入框绑定点击事件
		pub.addEvent(container, 'click', (event) => {
			event.preventDefault();
			// event.stopPropagation();

			if(container.classList.contains('act')){
				box.style.display = "none";
				container.classList.remove('act');
			}else{
				container.classList.add('act');
				if(params.reset){
					this.buildHtml(this.currentYear, this.currentMonth);
				}else{
					this.buildHtml();
				}

				box.innerHTML = this.renderHtml;
				box.style.display = "block";
			}			
		});
		//箭头和日期绑定点击事件
		pub.addEvent(box, 'click', (event) => {
			event.preventDefault();
			event.stopPropagation();

			let target = event.target;
			if(target.className.indexOf("prevmonth") > -1){
				this.toLastMonth();
			}else if(target.className.indexOf("nextmonth") > -1){
				this.toNextMonth();
			}else if(target.className.indexOf("prevyear") > -1){
				this.year--;
				this.setHtml();
			}else if(target.className.indexOf("nextyear") > -1){
				this.year++;
				this.setHtml();
			}else if(target.parentNode.className.indexOf("days") > -1 && target.nodeName.toLowerCase() === "a"){
				this.showDate(target.innerHTML);
			}
		});
		//点击其他区域，隐藏日期
		pub.addEvent(document, 'click', (e) => {
			let target = e.target;

			if(target !== container){
				box.style.display = "none";
				container.classList.remove('act');
			}				
		});
	}

	showDate(date){
		//保存点击时的日期
		this.selectedYear = this.year;
		this.selectedMonth = this.month;
		this.selectedDate = date;

		let showMonth = this.addZero(this.month),
			showDate = this.addZero(date);

		let selectDate = `${this.year}-${showMonth}-${showDate}`;
		this.container.value = selectDate;
		this.box.style.display = "none";
		this.container.classList.remove('act');

		this.params.onSelect && this.params.onSelect.call(this, this.year, showMonth, showDate);
	}

	addZero(num){
		let res = parseInt(num) < 10 ? `0${num}` : num;
		return parseInt(res);
	}

	toLastMonth(){
		if(this.month === 1){
			this.year--;
			this.month = 12;
		}else{
			this.month--;
		}
		this.setHtml();
	}

	toNextMonth(){
		if(this.month === 12){
			this.year++;
			this.month = 1;
		}else{
			this.month++;
		}
		this.setHtml();
	}

	setHtml(){
		this.buildHtml();
		this.box.innerHTML = this.renderHtml;
	}

	buildHtml(year, month){
		let params = this.params;

		//若传参，则使用参数，并将年月设置为指定年月
		if(arguments.length > 0){
			this.year = year;
			this.month = month;
		}

		this.renderHtml = "";
		//添加箭头和日期显示
		this.renderHtml += `<div class="dateTitle clearfix">
			<a href="javascript:;" class="prevyear  left">&lt;&lt;</a><a href="javascript:;" class="prevmonth left">&lt;</a>
			<a href="javascript:;" class="nextyear right">&gt;&gt;</a><a href="javascript:;" class="nextmonth right">&gt;</a>
			<span class="dateNow">${this.year}-${this.addZero(this.month)}</span>
		</div>`;
		
		//添加星期
		this.renderHtml += '<ul class="week clearfix">';
		for(let i = 0, len = this.weekDay.length; i < len; i++){
			this.renderHtml += `<li>${this.weekDay[i]}</li>`;
		}
		this.renderHtml += '</ul>';
		
		//计算本月1号是星期几，用setDate设置为本月第一天，getDay获取星期
		let monthFirstDay = new Date(new Date(this.year, this.month-1, this.date).setDate(1)).getDay();
		
		//如果从星期一开始，减1
		if(params.startfromMonday){monthFirstDay--;}
		if(monthFirstDay === 0){monthFirstDay = 7;}
		
		//本月天数，下个月的第0天就是本月最后一天，也就是本月总天数
		let monthDay = new Date(this.year, this.month, 0).getDate();
		
		//计算上个月最后一天是几号
		let lastMonthDay = new Date(new Date(this.year, this.month-1, this.date).setDate(0)).getDate();

		this.renderHtml += '<div class="days clearfix">';

		for(let j = 0; j < 42; j++){
			let date_str = j - monthFirstDay + 1;
			//如果本月1号不是第一天，用上个月日期补全
			if(date_str <= 0){
				date_str += lastMonthDay;
				this.renderHtml += `<span>${date_str}</span>`;
			}
			//如果超出本月日期，用下个月日期补全
			else if(date_str > monthDay){	
				date_str -= monthDay;
				this.renderHtml += `<span>${date_str}</span>`;
			}else{
				this.renderHtml += `<a href="javascript:;" class="${this.addClass(date_str)}">${date_str}</a>`;
			}
		}

		this.renderHtml += '</div>';
	}

	addClass(date){
		let cls = "";
		//判断是不是当前日期
		if(this.year == this.currentYear && this.month == this.currentMonth && this.date == date){
			cls = "cur";
		}
		//判断是不是选中日期
		if(this.year == this.selectedYear && this.month == this.selectedMonth && this.selectedDate == date){
			cls += " sel";
		}
		return cls;
	}
}

new Datepicker('#dateInput');
new Datepicker('#dateInput2', {
	reset: true
});
new Datepicker('#dateInput3', {
	startfromMonday: true,
	onSelect(year, month, day){
		console.log(year, month, day);
	}
});

