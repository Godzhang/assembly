const pub = {
	addEvent(dom, type, handle, async = false){
		if(dom.addEventListener){
			dom.addEventListener(type, handle, async);
		}else if(dom.attachEvent){
			dom.attachEvent('on' + type, handle);
		}else{
			dom['on' + type] = handle;
		}
	},
	removeEvent(dom, type, handle){
		if(dom.removeEventListener){
			dom.removeEventListener(type, handle);
		}else if(dom.detachEvent){
			dom.detachEvent('on' + type, handle);
		}else{
			dom['on' + type] = null;
		}
	},
	fireEvent(elem, type, bubbles, cancelable){
		if(document.createEvent){
			let event = document.createEvent('Event');
			event.initEvent(type, bubbles !== undefined ? bubbles : true, cancelable !== undefined ? cancelable : false);
			elem.dispatchEvent(event);
		}else if(document.createEventObject){	//IE
			let event = document.createEventObject();
			elem.fireEvent('on' + type, event);
		}else if(typeof (elem['on' + type]) === 'function'){
			elem['on' + type]();
		}
	},
	cancelEvent(e){
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		return false;
	},
	setTransform(elem, animation){
		elem.style.webkitTransform = animation;
		elem.style.mozTransform = animation;
		elem.style.msTransform = animation;
		elem.style.oTransform = animation;
		elem.style.transform = animation;
	},
	setTransitionDuration(elem, times){
		elem.style.webkitTransitionDuration = times + 'ms';
		elem.style.mozTransitionDuration = times + 'ms';
		elem.style.oTransitionDuration = times + 'ms';
		elem.style.transitionDuration = times + 'ms';
	},
	transitionEnd(elem, handler){
		this.addEvent(elem, 'transitionend', handler, false);
		this.addEvent(elem, 'webkitTransitionEnd', handler, false);
		this.addEvent(elem, 'mozTransitionEnd', handler, false);
		this.addEvent(elem, 'oTransitionEnd', handler, false);
	},
	delTransitionEnd(elem, handler){
		this.removeEvent(elem, 'transitionend', handler, false)
		this.removeEvent(elem, 'webkitTransitionEnd', handler, false)
		this.removeEvent(elem, 'mozTransitionEnd', handler, false)
		this.removeEvent(elem, 'oTransitionEnd', handler, false)
	},
	animationEnd(elem, handler){
		this.addEvent(elem, 'animationend', handler, false);
		this.addEvent(elem, 'webkitAnimationEnd', handler, false);
		this.addEvent(elem, 'mozAnimationEnd', handler, false);
		this.addEvent(elem, 'OAnimationEnd', handler, false);
	},
	delAnimationEnd(elem, handler){
		this.removeEvent(elem, 'animationend', handler, false);
		this.removeEvent(elem, 'webkitAnimationEnd', handler, false);
		this.removeEvent(elem, 'mozAnimationEnd', handler, false);
		this.removeEvent(elem, 'OAnimationEnd', handler, false);
	},
	isIE(){
		if(!!window.ActiveXObject || 'ActiveXObject' in window){
			return true;
		}
		return false;
	},
	addPrefix(elem, attr, value){
		const prefix = ['webkit', 'moz', 'o', 'ms'];
		let uattr = attr.split('');
		uattr[0] = uattr[0].toUpperCase();
		uattr = uattr.join('');
		prefix.forEach((val) => {
			elem.style[val + uattr] = value;
		});
		elem.style[attr] = value;
	}
}

export default pub;