import './index.css';
import pub from 'util/public.js';

class picZoom {
	constructor(options){
		const defaults = {
			shadeWidth: 160,
			shadeHeight: 160,
			showPicWidth: 600,
			showPicHeight: 600
		}
		this.params = Object.assign({}, defaults, options);
		this.bigBox = document.querySelector(this.params.bigBox);
		this.bigImg = this.bigBox.querySelector('img');
		this.currentSrc = this.bigImg.src;
		
		this.smallBox = document.querySelector(this.params.smallBox);
		this.smallImages = [...this.smallBox.querySelectorAll('a')];

		this.shade = document.querySelector(this.params.shade);
		this.showPic = document.querySelector(this.params.showPic);

		this.startX = 0;
		this.startY = 0;

		this.init();
	}

	init(){
		let params = this.params;
		//设置阴影宽高
		this.shade.style.width = params.shadeWidth + 'px';
		this.shade.style.height = params.shadeHeight + 'px';
		//检验阴影的宽高比是否和大图容器宽高比相同,不相同就调整大图容器的高
		if(params.shadeWidth/params.shadeHeight !== params.showPicWidth/params.showPicHeight){
			params.showPicHeight = (params.shadeHeight * params.showPicWidth) / params.shadeWidth;
		}
		//设置大图容器宽高
		this.showPic.style.width = params.showPicWidth + 'px';
		this.showPic.style.height = params.showPicHeight + 'px';
		//计算大图容器和阴影的显示比例
		this.percent = this.params.showPicHeight / this.params.shadeHeight;
		//初始化大图容器中的图片
		let img = new Image();
		this.showPic.appendChild(img);
		img.style.width = this.percent * this.bigBox.offsetWidth + 'px';
		
		this.bindEvent();
	}

	bindEvent(){
		let smallImages = this.smallImages,
			bigBox = this.bigBox,
			shade = this.shade,
			params = this.params;
		//图片切换
		smallImages.forEach(val => {
			pub.addEvent(val, 'click', () => {
				if(!val.classList.contains('act')){
					smallImages.forEach(img => img.classList.remove('act'));
					val.classList.add('act');
					let src = val.querySelector('img').src;
					this.currentSrc = src;
					this.bigImg.src = src;
				}
			});
		});
		//鼠标事件
		pub.addEvent(bigBox, 'mouseenter', (e) => {
			e.preventDefault();

			shade.style.display = 'block';
			this.showPicArea(this.currentSrc);
		});
		pub.addEvent(bigBox, 'mousemove', (e) => {
			e.preventDefault();

			this.startX = e.clientX - pub.getOffsetLeft(bigBox);
			this.startY = e.clientY - pub.getOffsetTop(bigBox);

			let x,
				y,
				halfWidth = params.shadeWidth / 2,
				halfHeight = params.shadeHeight / 2;

			if(this.startX < halfWidth){
				x = 0;
			}else if(this.startX > bigBox.offsetWidth - halfWidth){
				x = bigBox.offsetWidth - params.shadeWidth;
			}else{
				x = this.startX - params.shadeWidth / 2;
			}

			if(this.startY < halfHeight){
				y = 0;
			}else if(this.startY > bigBox.offsetHeight - halfHeight){
				y = bigBox.offsetHeight - params.shadeHeight;
			}else{
				y = this.startY - params.shadeHeight / 2;
			}			

			shade.style.left = x + 'px';
			shade.style.top = y + 'px';

			this.movePicArea(x, y);
		});
		pub.addEvent(bigBox, 'mouseleave', () => {
			shade.style.display = 'none';
			this.showPic.style.display = 'none';
		});
	}

	showPicArea(src){
		let img = new Image();
		img.src = src;
		img.onload = () => {
			this.showPic.style.display = 'block';
			this.showPic.querySelector('img').src = src;
		}
	}

	movePicArea(x, y){
		let img = this.showPic.querySelector('img');

		img.style.top = - y * this.percent + 'px';
		img.style.left = - x * this.percent + 'px';
	}
}

var pic = new picZoom({
	smallBox: '.small-box',
	shade: '.shade',
	bigBox: '.big-box',
	showPic: '.show-box'
});

