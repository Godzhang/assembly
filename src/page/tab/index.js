import './index.css';
import pub from 'util/public.js';

(function(){
	let tabs = Array.from(document.querySelectorAll('.sg-tabs-block'));
	let getStyle = function(dom, attr){
		return ('getComputedStyle' in window) ? getComputedStyle(dom, false)[attr] : dom.currentStyle[attr];
	};

	tabs.forEach((val, i) => {
		//初始化按钮样式
		let tab = Array.from(val.querySelectorAll('.sg-button-tab'));
		tab[0].classList.add('active');
		
		//对sg-tabs-line特效的dom处理
		let classList = val.classList;
		if(classList.contains('sg-tabs-line')){
			let w = parseInt(getStyle(val, 'width')) / tab.length;
			for(let j = 0, len = tab.length; j < len; j++){
				tab[j].index = j;
				tab[j].width = w;
			}
			let indicator = document.createElement('div');
			indicator.className = 'sg-tabs-indicator';
			indicator.style.width = w + 'px';
			val.querySelector('.sg-tabs-nav').appendChild(indicator);
		}
		//给tab头注册事件
		tab.forEach((item, t) => {
			item.index = t;
			pub.addEvent(item, 'click', function(){
				let content = this.parentNode.parentNode,
					tb = content.nextElementSibling.querySelectorAll('.sg-tab'),
					tt = this.parentNode.querySelectorAll('.sg-button-tab'),
					index = this.index;

				for(let i = 0, len = tb.length; i < len; i++){
					if(i !== index){
						tb[i].classList.remove('active');
						tt[i].classList.remove('active');
					}else{
						tb[i].classList.add('active');
						tt[i].classList.add('active');
					}
				}

				if(content.parentNode.classList.contains('sg-tabs-line')){
					let w = this.width,
						indicator = this.parentNode.nextElementSibling;
					indicator.style.left = w * index + 'px';
				}

			}, false);
		});



	});



})();

