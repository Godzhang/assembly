// import dialogTemplate from './dialog.string';
import dialogTemplate from './dialog.art';
import pub from '../public.js';

const defaults = {
	type: 'waiting',    //弹窗类型
	txt: '',			//按钮文字
	buttons: null,		//按钮组
	delay: null,		//关闭延时
	maskClose: false,	//点击遮罩层是否关闭
	effect: true		//是否开启动画效果
}

class Dialog{
	constructor(options){
		this.params = Object.assign({}, defaults, options);
		this.obj = {};
		this.dom = null;
		this.init();
	}

	init(){
		this.renderHtml();
		this.bindEvent();
	}

	renderHtml(){
		this.obj = Object.assign({}, this.params);
		let html = dialogTemplate(this.obj);
		console.log(html);
		this.dom = document.createElement('div');
		this.dom.innerHTML = html;
		document.body.appendChild(this.dom);
	}

	bindEvent(){
		let params = this.params;
		if(params.delay && params.delay !== 0){
			setTimeout(() => {
				this.close();
			}, params.delay);
		}
		if(params.maskClose){
			let mask = this.dom.querySelector('.dialog-wrapper');
			pub.addEvent(mask, 'click', () => {
				this.close();
			}, false);
		}
		if(params.buttons){
			let button = this.dom.querySelectorAll('button');
			button.forEach((val, i) => {
				let callback = params.buttons[i].callback;

				pub.addEvent(val, 'click', (e) => {
					e.stopPropagation();
					
					if(callback){
						let res = callback();
						if(res !== false){
							this.close();
						}
					}else{
						this.close();
					}
				}, false);					
			});
		}
		if(params.effect){
			this.animate();
		}
	}

	animate(){
		let wrapper = this.dom.querySelector('.dialog-container');

		pub.setTransform(wrapper, 'scale(0)');
		setTimeout(() => {
			pub.setTransform(wrapper, 'scale(1)');
		}, 20);
	}

	close(){
		if(this.dom){
			document.body.removeChild(this.dom);
			this.dom = null;
		}
	}
}

export default Dialog;