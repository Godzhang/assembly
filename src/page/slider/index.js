import './index.css';
import pub from 'util/public.js';

(function(){
	// class LYRange {
	// 	constructor(container, params = {}){
	// 		const defaults = {
	// 			fillLower: '#059CFA',
	// 			fillUpper: '#bdbdbd',
	// 			min: 0,
	// 			max: 100,
	// 			defaultValue: 50
	// 		}
	// 		this.params = Object.assign({}, defaults, params);
	// 		this.maxPercent = 100;			
	// 		//处理选择dom元素
	// 		this.range = this.initDom(container);
	// 		this.isPressed = false;
	// 		this.timeoutId = null;
	// 		if('ontouchend' in document){
	// 			this.touchstart = 'touchstart';
	// 			this.touchmove = 'touchmove';
	// 			this.touchend = 'touchend';
	// 		}else{
	// 			this.touchstart = 'mousedown';
	// 			this.touchmove = 'mousemove';
	// 			this.touchend = 'mouseup';
	// 		}

	// 		this.pageInit();
	// 	}

	// 	initDom(container){
	// 		let range = typeof container === 'string' ? document.querySelectorAll(container) : container;
	// 		if(range.length === 0) return;
	// 		if(range.length > 1){
	// 			let ranges = [];
	// 			for(let i = 0, len = range.length; i < len; i++){
	// 				ranges.push(new LYRange(range[i], this.params));
	// 			}
	// 			return ranges;
	// 		}
	// 		range = range.length ? range[0] : range;
	// 		return range;
	// 	}

	// 	pageInit(){
	// 		let params = this.params;

	// 		params.type = parseInt(params.type);
	// 		params.type = params.type === 2 ? 2 : 1;
	// 		params.min = params.min >= params.max ? 0 : params.min;
	// 		switch(params.type){
	// 			case 1:
	// 				this.input = this.range.querySelector('input');
	// 				//判断最大值最小值
	// 				if(!this.input.min){
	// 					this.input.min = params.min;
	// 				}
	// 				if(!this.input.max){
	// 					this.input.max = params.max;
	// 				}
	// 				if(this.input.min > this.input.max){
	// 					[this.input.min, this.input.max] = [this.input.max, this.input.min];
	// 				}else if(this.input.min === this.input.max){
	// 					this.input.min = params.min;
	// 					this.input.max = params.max;
	// 				}
	// 				this.tooltip = this.input.nextElementSibling;
	// 				this.setTrackColor(this.input);
	// 				this.setValue(this.input, this.tooltip);





	// 			break;
	// 		}
	// 	}

	// 	setTrackColor(range){
	// 		let p = range.value,
	// 			t = range.max - range.min;
	// 		p = Math.ceil(p / t * 100 - range.min);
	// 		range.percent = p;
	// 		range.style.background = '-webkit-linear-gradient(left, ' + this.params.fillLower + ' ' +
	// 			p + '%, ' + this.params.fillUpper + ' ' + p + '%)';
	// 	}

	// 	setValue(input, tooltip){
	// 		let left = 0,
	// 			percent = input.percent / this.maxPercent;
	// 		if(this.params.type === 1){
	// 			left = Math.floor((input.offsetWidth - tooltip.offsetWidth) * percent);
	// 		}else{
	// 			left = Math.floor(input,offsetWidth * percent - tooltip.offsetWidth / 2);
	// 		}
	// 		tooltip.innerHTML = input.value;
	// 		pub.setTransform(tooltip, 'translate(' + left + 'px, 0)');
	// 	}
	// }

	class LYRange {
		constructor(container, params = {}){
			const defaults = {
				min: 0,
				max: 100,
				defaultValue: 50
			}
			this.params = Object.assign({}, defaults, params);
			this.maxPercent = 100;
			//处理选择dom元素
			this.range = this.initDom(container);
			this.isPressed = false;
			this.timeoutId = null;
			if('ontouchend' in document){
				this.touchstart = 'touchstart';
				this.touchmove = 'touchmove';
				this.touchend = 'touchend';
			}else{
				this.touchstart = 'mousedown';
				this.touchmove = 'mousemove';
				this.touchend = 'mouseup';
			}

			this.pageInit();
		}

		initDom(container){
			let range = typeof container === 'string' ? document.querySelectorAll(container) : container;
			if(range.length === 0) return;
			if(range.length > 1){
				let ranges = [];
				for(let i = 0, len = range.length; i < len; i++){
					ranges.push(new LYRange(range[i], this.params));
				}
				return ranges;
			}
			range = range.length ? range[0] : range;
			return range;
		}

		pageInit(){

		}
	}

window.LYRange = LYRange;

})();

window.onload = function(){
	new LYRange('.range-field', {

	});
}