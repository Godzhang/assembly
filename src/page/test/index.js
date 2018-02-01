import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public.js';
import animate from 'util/animate.js';

window.onload = function(){
	window.onload = function(){
		const wrapper = document.querySelector('.wrapper');
		let startX = null;
		let move = null;
		let flag = false;
		const minRange = 100;
		const width = 500;
		let i = 0;
		let pos = null;

		wrapper.style.transform = 'translate3d(0, 0, 0)';

		wrapper.addEventListener('mousedown', function(e){
			flag = true;

			startX = e.pageX;

			pos = getComputedStyle(wrapper)['transform'];
			pos = (/matrix\((.*)\)/.exec(pos))[1];
			pos = pos.replace(/\s/g, '');
			pos = pos.split(',')[4];
		}, false);

		wrapper.addEventListener('mousemove', function(e){
			if(flag){
				move = e.pageX - startX;
				wrapper.style.transform = 'translate3d('+ (move + pos) +'px, 0, 0)';
			}		
		}, false);

		wrapper.addEventListener('mouseup', function(e){
			flag = false;
			wrapper.style.transitionDuration = '300ms';

			if(move > minRange){
				i = i < 0 ? 0 : i - 1;
				wrapper.style.transform = 'translate3d('+ (i * width) +'px, 0, 0)';
			}else if(move < -minRange){
				i = i > 4 ? 4 : i + 1;
				wrapper.style.transform = 'translate3d('+ (-i * width) +'px, 0, 0)';
			}else{
				wrapper.style.transform = 'translate3d('+ (i * width) +'px, 0, 0)';
			}

			wrapper.addEventListener('transitionend', function(){
				wrapper.style.transitionDuration = '0ms';
			}, false);
		}, false);





	}
}






