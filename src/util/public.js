const pub = {
	addEvent(dom, type, handle, async){
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
	transitionStart(elem, handler){
		this.addEvent(elem, 'transitionstart', handler, false);
		this.addEvent(elem, 'webkitTransitionStart', handler, false);
		this.addEvent(elem, 'mozTransitionStart', handler, false);
		this.addEvent(elem, 'oTransitionStart', handler, false);
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
	}
}

export default pub;