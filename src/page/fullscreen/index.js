import './index.css';
import pub from 'util/public.js';

function toggleFullScreen(elem){
	if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitCurrentFullScreenElement){
		let docElem = elem || document.documentElement;
		if(docElem.requestFullscreen){
			docElem.requestFullscreen();
		}else if(docElem.mozRequestFullScreen){
			docElem.mozRequestFullScreen();
		}else if(docElem.webkitRequestFullScreen){
			docElem.webkitRequestFullScreen();
		}else if(docElem.msRequestFullScreen){
			docElem.msRequestFullScreen();
		}
	}else{
		if(docElem.exitFullscreen){
			docElem.exitFullscreen();
		}else if(docElem.mozCancelFullScreen){
			docElem.mozCancelFullScreen();
		}else if(docElem.webkitCancelFullScreen){
			docElem.webkitCancelFullScreen();
		}else if(docElem.msExitFullScreen){
			docElem.msExitFullScreen();
		}
	}
}

function getType(){
	let type = ['webkit', 'moz', 'ms', 'o'];
	let cur = '';
	type.forEach((val) => {
		let mo = val + 'Transform';
		if(mo in document.createElement('div').style){
			cur = val;
		}
	});
	return cur;
}

window.onload = function(){
	let isOpen = false;
	let prefix = getType();
	pub.addEvent(document, prefix + 'fullscreenchange', function(){
		if(!isOpen){
			document.getElementById('open').innerHTML = '关闭全屏';
			isOpen = true;
		}else{
			document.getElementById('open').innerHTML = '开启全屏';
			isOpen = false;
		}
	}, false);

	pub.addEvent(document.getElementById('open'), 'click', function(){
		toggleFullScreen(document.getElementById('video'));
	});

	pub.addEvent(document.getElementById('openVideo'), 'click', function(){
		toggleFullScreen(document.getElementById('video'));
	}, false);
}