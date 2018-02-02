import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public.js';
import animate from 'util/animate.js';

window.onload = function(){
	const wrapper = document.querySelector('.wrapper');
	let startX = null;
	let move = 0;
	let flag = false;
	const minRange = 100;
	const width = 500;
	let i = 0;
	let pos = null;
    let d = null;
    let isLoop = true;
    let length = document.querySelectorAll('.slide').length;
    //最好设置两个变量保存初始位置
    let firstPos,endPos;


	wrapper.style.transform = 'translate3d(0, 0, 0)';
    
    if(isLoop){
        loop();
        i = 1;
        wrapper.style.transform = 'translate3d('+ (-width) +'px, 0, 0)';
        length += 2;
    }  

    wrapper.addEventListener('mousedown', function(e){
		flag = true;

		startX = e.pageX;

		pos = getComputedStyle(wrapper)['transform'];
		pos = (/matrix\((.*)\)/.exec(pos))[1];
		pos = pos.replace(/\s/g, '');
		pos = Number(pos.split(',')[4]);
	}, false);

	wrapper.addEventListener('mousemove', function(e){
		if(flag){
			move = e.pageX - startX;
			wrapper.style.transform = 'translate3d('+ (move + pos) +'px, 0, 0)';
		}
	}, false);

    wrapper.addEventListener('mouseup', mouseup, false);
	wrapper.addEventListener('mouseleave', mouseup, false);

    function mouseup(){
        flag = false;
        wrapper.style.transitionDuration = '300ms';

        if(move > minRange){
            i = i <= 0 ? 0 : i - 1;
            wrapper.style.transform = 'translate3d('+ (-i * width) +'px, 0, 0)';
        }else if(move < -minRange){
            i = i >= length - 1 ? length - 1 : i + 1;
            wrapper.style.transform = 'translate3d('+ (-i * width) +'px, 0, 0)';
        }else{
            wrapper.style.transform = 'translate3d('+ (-i * width) +'px, 0, 0)';
        }

        wrapper.addEventListener('transitionend', function(){
            wrapper.style.transitionDuration = '0ms';
            move = 0;
            if(loop){
            	if(i === 0){
	                wrapper.style.transform = 'translate3d('+ (-(length - 2) * width) +'px, 0, 0)';
	                i = length - 2;
	            }else if(i === length - 1){
	                wrapper.style.transform = 'translate3d('+ (-width) +'px, 0, 0)';
	                i = 1;
	            }
            }     
        }, false);
    }

    function loop(){
        let firstClone = wrapper.firstElementChild.cloneNode();
        let lastClone = wrapper.lastElementChild.cloneNode();
        wrapper.insertBefore(lastClone, wrapper.firstElementChild);
        wrapper.appendChild(firstClone);
    }



}






