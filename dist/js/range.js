webpackJsonp([9],{0:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={addEvent:function(t,n,e){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];t.addEventListener?t.addEventListener(n,e,i):t.attachEvent?t.attachEvent("on"+n,e):t["on"+n]=e},removeEvent:function(t,n,e){t.removeEventListener?t.removeEventListener(n,e):t.detachEvent?t.detachEvent("on"+n,e):t["on"+n]=null},fireEvent:function(t,n,e,i){if(document.createEvent){var s=document.createEvent("Event");s.initEvent(n,void 0===e||e,void 0!==i&&i),t.dispatchEvent(s)}else if(document.createEventObject){var o=document.createEventObject();t.fireEvent("on"+n,o)}else"function"==typeof t["on"+n]&&t["on"+n]()},cancelEvent:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,!1},setTransform:function(t,n){t.style.webkitTransform=n,t.style.mozTransform=n,t.style.msTransform=n,t.style.oTransform=n,t.style.transform=n},setTransitionDuration:function(t,n){t.style.webkitTransitionDuration=n+"ms",t.style.mozTransitionDuration=n+"ms",t.style.oTransitionDuration=n+"ms",t.style.transitionDuration=n+"ms"},transitionEnd:function(t,n){this.addEvent(t,"transitionend",n,!1),this.addEvent(t,"webkitTransitionEnd",n,!1),this.addEvent(t,"mozTransitionEnd",n,!1),this.addEvent(t,"oTransitionEnd",n,!1)},delTransitionEnd:function(t,n){this.removeEvent(t,"transitionend",n,!1),this.removeEvent(t,"webkitTransitionEnd",n,!1),this.removeEvent(t,"mozTransitionEnd",n,!1),this.removeEvent(t,"oTransitionEnd",n,!1)},animationEnd:function(t,n){this.addEvent(t,"animationend",n,!1),this.addEvent(t,"webkitAnimationEnd",n,!1),this.addEvent(t,"mozAnimationEnd",n,!1),this.addEvent(t,"OAnimationEnd",n,!1)},delAnimationEnd:function(t,n){this.removeEvent(t,"animationend",n,!1),this.removeEvent(t,"webkitAnimationEnd",n,!1),this.removeEvent(t,"mozAnimationEnd",n,!1),this.removeEvent(t,"OAnimationEnd",n,!1)},isIE:function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},addPrefix:function(t,n,e){var i=["webkit","moz","o","ms"],s=n.split("");s[0]=s[0].toUpperCase(),s=s.join(""),i.forEach(function(n){t.style[n+s]=e}),t.style[n]=e},getStyle:function(t,n){return"getComputedStyle"in window?getComputedStyle(t,!1)[n]:t.currentStyle[n]},getOffsetTop:function(t){for(var n=t.offsetTop,e=t.offsetParent;null!=e;)n+=e.offsetTop,e=e.offsetParent;return n},getOffsetLeft:function(t){for(var n=t.offsetLeft,e=t.offsetParent;null!=e;)n+=e.offsetLeft,e=e.offsetParent;return n}};n.default=i},41:function(t,n,e){t.exports=e(42)},42:function(t,n,e){"use strict";function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(n,e,i){return e&&t(n.prototype,e),i&&t(n,i),n}}();e(43);var o=e(0),a=function(t){return t&&t.__esModule?t:{default:t}}(o),r=function(){function t(n,e){i(this,t),this.params=Object.assign({min:0,max:100,value:0,step:1,onSlide:function(){},onSlideEnd:function(){}},e),this.container="string"==typeof n?document.querySelector(n):n,this.bar=this.container.querySelectorAll(".range-bar")[1],this.hand=this.container.querySelector(".range-hand"),this.info=this.container.querySelector(".range-info"),this.width=this.container.offsetWidth,this.mostLeft=this.width-this.hand.offsetWidth,this.isTouch=/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),this.touchstart=this.isTouch?"touchstart":"mousedown",this.touchmove=this.isTouch?"touchmove":"mousemove",this.touchend=this.isTouch?"touchend":"mouseup",this.startWidth=parseInt(a.default.getStyle(this.hand,"width"))/2,this.hasMoved=0,this.current=null,this.init()}return s(t,[{key:"init",value:function(){var t=this.params;if(this.bar.style.width=this.startWidth+"px",this.info.innerHTML=t.min,t.min>t.max){var n=[t.max,t.min];t.min=n[0],t.max=n[1]}this.range=this.params.max-this.params.min,t.value<t.min?t.value=t.min:t.value>t.max&&(t.value=t.max);var e=(t.value-t.min)/this.range*this.mostLeft;this.setRange(e),this.hasMoved=e,this.bindEvent()}},{key:"bindEvent",value:function(){this._startEvent=this.startEvent.bind(this),this._moveEvent=this.moveEvent.bind(this),this._endEvent=this.endEvent.bind(this),this.moving=!1,this.startX=0,this.dir=0,a.default.addEvent(this.hand,this.touchstart,this._startEvent)}},{key:"startEvent",value:function(t){t.preventDefault(),this.moving=!0,t.changedTouches&&(t=t.changedTouches[0]),this.startX=t.pageX,a.default.addEvent(document,this.touchmove,this._moveEvent),a.default.addEvent(document,this.touchend,this._endEvent)}},{key:"moveEvent",value:function(t){if(this.moving){t.changedTouches&&(t=t.changedTouches[0]),this.dir=t.pageX-this.startX;var n=this.hasMoved+this.dir;n>this.mostLeft?(n=this.mostLeft,this.dir=this.mostLeft-this.hasMoved):n<0&&(n=0,this.dir=0-this.hasMoved),this.setRange(n)}}},{key:"setRange",value:function(t){a.default.setTransform(this.hand,"translate3d("+t+"px, 0, 0)"),this.bar.style.width=this.startWidth+t+"px";var n=Math.round(t/this.mostLeft*this.range);n%this.params.step!=0&&(n-=n%this.params.step),t===this.mostLeft&&(n=this.params.max-this.params.min),this.current=n+this.params.min,this.info.innerHTML=this.current,this.moving&&this.params.onSlide&&this.params.onSlide.call(this,this.current)}},{key:"endEvent",value:function(){this.moving=!1,this.hasMoved+=this.dir,this.params.onSlideEnd&&this.params.onSlideEnd.call(this,this.current),a.default.removeEvent(document,this.touchmove,this._moveEvent),a.default.removeEvent(document,this.touchend,this._endEvent)}}]),t}();new r(".range-box-1"),new r(".range-box-2",{min:0,max:10}),new r(".range-box-3",{value:30}),new r(".range-box-4",{step:10,onSlide:function(t){console.log("变化值: "+t)},onSlideEnd:function(t){console.log("结束值: "+t)}})},43:function(t,n){}},[41]);