webpackJsonp([2],{0:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={addEvent:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];t.addEventListener?t.addEventListener(e,i,s):t.attachEvent?t.attachEvent("on"+e,i):t["on"+e]=i},removeEvent:function(t,e,i){t.removeEventListener?t.removeEventListener(e,i):t.detachEvent?t.detachEvent("on"+e,i):t["on"+e]=null},fireEvent:function(t,e,i,s){if(document.createEvent){var n=document.createEvent("Event");n.initEvent(e,void 0===i||i,void 0!==s&&s),t.dispatchEvent(n)}else if(document.createEventObject){var o=document.createEventObject();t.fireEvent("on"+e,o)}else"function"==typeof t["on"+e]&&t["on"+e]()},cancelEvent:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,!1},setTransform:function(t,e){t.style.webkitTransform=e,t.style.mozTransform=e,t.style.msTransform=e,t.style.oTransform=e,t.style.transform=e},setTransitionDuration:function(t,e){t.style.webkitTransitionDuration=e+"ms",t.style.mozTransitionDuration=e+"ms",t.style.oTransitionDuration=e+"ms",t.style.transitionDuration=e+"ms"},transitionEnd:function(t,e){this.addEvent(t,"transitionend",e,!1),this.addEvent(t,"webkitTransitionEnd",e,!1),this.addEvent(t,"mozTransitionEnd",e,!1),this.addEvent(t,"oTransitionEnd",e,!1)},delTransitionEnd:function(t,e){this.removeEvent(t,"transitionend",e,!1),this.removeEvent(t,"webkitTransitionEnd",e,!1),this.removeEvent(t,"mozTransitionEnd",e,!1),this.removeEvent(t,"oTransitionEnd",e,!1)},animationEnd:function(t,e){this.addEvent(t,"animationend",e,!1),this.addEvent(t,"webkitAnimationEnd",e,!1),this.addEvent(t,"mozAnimationEnd",e,!1),this.addEvent(t,"OAnimationEnd",e,!1)},delAnimationEnd:function(t,e){this.removeEvent(t,"animationend",e,!1),this.removeEvent(t,"webkitAnimationEnd",e,!1),this.removeEvent(t,"mozAnimationEnd",e,!1),this.removeEvent(t,"OAnimationEnd",e,!1)},isIE:function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},addPrefix:function(t,e,i){var s=["webkit","moz","o","ms"],n=e.split("");n[0]=n[0].toUpperCase(),n=n.join(""),s.forEach(function(e){t.style[e+n]=i}),t.style[e]=i},getStyle:function(t,e){return"getComputedStyle"in window?getComputedStyle(t,!1)[e]:t.currentStyle[e]},getOffsetTop:function(t){for(var e=t.offsetTop,i=t.offsetParent;null!=i;)e+=i.offsetTop,i=i.offsetParent;return e},getOffsetLeft:function(t){for(var e=t.offsetLeft,i=t.offsetParent;null!=i;)e+=i.offsetLeft,i=i.offsetParent;return e}};e.default=s},48:function(t,e,i){t.exports=i(49)},49:function(t,e,i){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){var i=document.createElement(t);return i.className=e,i}function r(t,e){var i=t.replace(/matrix\(([^)]*)\)/g,"$1").replace(/\s/g,"").split(",");return"y"===e?parseInt(i[5]):parseInt(i[4])}var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}();i(50),i(51);var h=i(0),u=s(h),l=i(52),c=s(l),d=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};n(this,t);var s={wh:0,distance:20,direction:"y",initPos:0,timeFunc:"easeInCubic",toTop:function(){},onScroll:function(){},toBottom:function(){}};this.params=Object.assign({},s,i),this.el="string"==typeof e?document.querySelector(e):e,this.container=null,this.wrapper=null,this.wrapperPos=0,this.isMoz="MozTransform"in document.createElement("div").style,this.wheelEvent=this.isMoz?"DOMMouseScroll":"mousewheel",this.isTouch=/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),this.touchstart=this.isTouch?"touchstart":"mousedown",this.touchmove=this.isTouch?"touchmove":"mousemove",this.touchend=this.isTouch?"touchend":"mouseup",this.delta=null,this.scrollPos=0,this.start=0,this.move=0,this.isMouseDown=!1,this.timer=null,this.resizeTimer=null,this.os="x"===this.params.direction?"offsetWidth":"offsetHeight",this.ot="x"===this.params.direction?"offsetLeft":"offsetTop",this.wh="x"===this.params.direction?"width":"height",this.p="x"===this.params.direction?"pageX":"pageY",this.g="x"===this.params.direction?"getOffsetLeft":"getOffsetTop",this.init()}return a(t,[{key:"init",value:function(){var t=this;if(this.initDom(),this.wrapper[this.os]<=this.el[this.os])return!1;this.createScrollbar(),this.bindEvent(),u.default.addEvent(window,"resize",function(){t.resize()})}},{key:"initDom",value:function(){this.container=o("div","scroll-container"),this.wrapper=o("div","scroll-wrapper");document.createDocumentFragment();this.wrapper.style[this.wh]=this.el.firstElementChild[this.os]+"px",this.wrapper.appendChild(this.el.firstElementChild),this.container.appendChild(this.wrapper),u.default.setTransform(this.wrapper,"translate3d(0, 0, 0)"),this.el.innerHTML="",this.el.appendChild(this.container)}},{key:"createScrollbar",value:function(){this.scrollBox=o("div","scroll-box-"+this.params.direction),this.scrollRail=o("div","scroll-rail"),this.scrollBar=o("div","scroll-bar"),this.scrollBox.style[this.wh]=this.container[this.os]+"px",this.scrollRail.style[this.wh]=this.container[this.os]+"px",(this.params.wh>=this.container[this.os]||0===this.params.wh)&&(this.params.wh=this.container[this.os]/3),this.scrollBar.style[this.wh]=this.params.wh+"px",u.default.setTransform(this.scrollBar,"translate3d(0, 0, 0)"),this.scrollBox.appendChild(this.scrollRail),this.scrollBox.appendChild(this.scrollBar),this.container.appendChild(this.scrollBox),this.scrollHeight=Math.abs(this.el[this.os]-this.wrapper[this.os]),this.barScrollHeight=this.scrollBox[this.os]-this.scrollBar[this.os],this.percent=this.barScrollHeight/this.scrollHeight,this.params.initPos>=0&&this.params.initPos<this.barScrollHeight&&(this.scrollTo(this.params.initPos),this.scrollPos=this.params.initPos,this.wrapperPos=-this.params.initPos/this.percent)}},{key:"bindEvent",value:function(){var t=this;this.setDuration(500),u.default.addEvent(this.container,this.wheelEvent,function(e){e.preventDefault(),t.delta=t.isMoz?-e.detail/3:e.wheelDelta/120,t.scroll()}),this._mouseDown=this.mouseDown.bind(this),this._mouseMove=this.mouseMove.bind(this),this._mouseUp=this.mouseUp.bind(this),u.default.addEvent(this.scrollBar,this.touchstart,this._mouseDown),this._railEvent=this.railEvent.bind(this),u.default.addEvent(this.scrollRail,"click",this._railEvent)}},{key:"mouseDown",value:function(t){t.preventDefault(),t.changedTouches&&(t=t.changedTouches[0]),this.setDuration(0),this.start=t[this.p],this.startBarPos=r(u.default.getStyle(this.scrollBar,"transform"),this.params.direction),this.isMouseDown=!0,u.default.addEvent(document,this.touchmove,this._mouseMove),u.default.addEvent(document,this.touchend,this._mouseUp)}},{key:"mouseMove",value:function(t){this.isMouseDown&&(this.setDuration(0),t.changedTouches&&(t=t.changedTouches[0]),this.move=this.startBarPos+(t[this.p]-this.start),this.move<=0?this.move=0:this.move>=this.barScrollHeight&&(this.move=this.barScrollHeight),this.scrollTo(this.move))}},{key:"mouseUp",value:function(){this.scrollPos=r(u.default.getStyle(this.scrollBar,"transform"),this.params.direction),this.isMouseDown=!1,this.setDuration(500),u.default.removeEvent(document,this.touchmove,this._mouseMove),u.default.removeEvent(document,this.touchend,this._mouseUp)}},{key:"railEvent",value:function(t){t.changedTouches&&(t=t.changedTouches[0]),this.setDuration(500);var e=t[this.p]-u.default[this.g](this.el),i=e-this.params.wh/2;this.setDuration(0),e<this.params.wh/2?i=0:e>this.scrollBox[this.os]-this.params.wh/2&&(i=this.scrollBox[this.os]-this.params.wh),this.date=Date.now(),this.animateTo(this.scrollPos,i-this.scrollPos,500)}},{key:"scroll",value:function(){var t=this.params;this.delta<0?this.scrollPos+this.params.distance>=this.barScrollHeight?(this.scrollPos=this.barScrollHeight,t.toBottom&&t.toBottom.call(this)):this.scrollPos+=this.params.distance:this.delta>0&&(this.scrollPos-this.params.distance<=0?(this.scrollPos=0,t.toTop&&t.toTop.call(this)):this.scrollPos-=this.params.distance),this.scrollTo(this.scrollPos)}},{key:"scrollTo",value:function(t){"x"===this.params.direction?(u.default.setTransform(this.scrollBar,"translate3d("+t+"px, 0, 0)"),u.default.setTransform(this.wrapper,"translate3d("+-t/this.percent+"px, 0, 0)")):(u.default.setTransform(this.scrollBar,"translate3d(0, "+t+"px, 0)"),u.default.setTransform(this.wrapper,"translate3d(0, "+-t/this.percent+"px, 0)")),this.params.onScroll&&this.params.onScroll.call(this,t,parseInt(-t/this.percent))}},{key:"animateTo",value:function(t,e,i){var s=this;this.timer=setTimeout(function(){var n=Date.now(),o=n-s.date;if(n-s.date>=i){var r=t+e;s.scrollTo(r),s.scrollPos=r,setTimeout(function(){s.setDuration(500)},100)}else{var a=c.default[s.params.timeFunc](o,t,e,i);s.animateTo(t,e,i),s.scrollTo(a)}},20)}},{key:"resize",value:function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.scrollBox.style[t.wh]=t.container[t.os]+"px",t.scrollRail.style[t.wh]=t.container[t.os]+"px",(t.params.wh>=t.container[t.os]||0===t.params.wh)&&(t.params.wh=t.container[t.os]/3),t.scrollBar.style[t.wh]=t.params.wh+"px"},300)}},{key:"setDuration",value:function(t){u.default.setTransitionDuration(this.scrollBar,t),u.default.setTransitionDuration(this.wrapper,t)}}]),t}();window.onload=function(){new d(".container-1"),new d(".container-2",{wh:100,direction:"x"})}},50:function(t,e){},51:function(t,e){},52:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={linear:function(t,e,i,s){return i*t/s+e},easeIn:function(t,e,i,s){return i*(t/=s)*t+e},easeOut:function(t,e,i,s){return-i*(t/=s)*(t-2)+e},easeInOut:function(t,e,i,s){return(t/=s/2)<1?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,i,s){return i*(t/=s)*t*t+e},easeOutCubic:function(t,e,i,s){return i*((t=t/s-1)*t*t+1)+e},easeInOutCubic:function(t,e,i,s){return(t/=s/2)<1?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,i,s){return i*(t/=s)*t*t*t+e},easeOutQuart:function(t,e,i,s){return-i*((t=t/s-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,i,s){return(t/=s/2)<1?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,i,s){return i*(t/=s)*t*t*t*t+e},easeOutQuint:function(t,e,i,s){return i*((t=t/s-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,i,s){return(t/=s/2)<1?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,i,s){return-i*Math.cos(t/s*(Math.PI/2))+i+e},easeOutSine:function(t,e,i,s){return i*Math.sin(t/s*(Math.PI/2))+e},easeInOutSine:function(t,e,i,s){return-i/2*(Math.cos(Math.PI*t/s)-1)+e},easeInExpo:function(t,e,i,s){return 0==t?e:i*Math.pow(2,10*(t/s-1))+e},easeOutExpo:function(t,e,i,s){return t==s?e+i:i*(1-Math.pow(2,-10*t/s))+e},easeInOutExpo:function(t,e,i,s){return 0==t?e:t==s?e+i:(t/=s/2)<1?i/2*Math.pow(2,10*(t-1))+e:i/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,i,s){return-i*(Math.sqrt(1-(t/=s)*t)-1)+e},easeOutCirc:function(t,e,i,s){return i*Math.sqrt(1-(t=t/s-1)*t)+e},easeInOutCirc:function(t,e,i,s){return(t/=s/2)<1?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,i,s,n,o){var r=void 0;return 0==t?e:1==(t/=s)?e+i:(void 0===o&&(o=.3*s),!n||n<Math.abs(i)?(r=o/4,n=i):r=o/(2*Math.PI)*Math.asin(i/n),-n*Math.pow(2,10*(t-=1))*Math.sin((t*s-r)*(2*Math.PI)/o)+e)},easeOutElastic:function(t,e,i,s,n,o){var r=void 0;return 0==t?e:1==(t/=s)?e+i:(void 0===o&&(o=.3*s),!n||n<Math.abs(i)?(n=i,r=o/4):r=o/(2*Math.PI)*Math.asin(i/n),n*Math.pow(2,-10*t)*Math.sin((t*s-r)*(2*Math.PI)/o)+i+e)},easeInOutElastic:function(t,e,i,s,n,o){var r=void 0;return 0==t?e:2==(t/=s/2)?e+i:(void 0===o&&(o=s*(.3*1.5)),!n||n<Math.abs(i)?(n=i,r=o/4):r=o/(2*Math.PI)*Math.asin(i/n),t<1?n*Math.pow(2,10*(t-=1))*Math.sin((t*s-r)*(2*Math.PI)/o)*-.5+e:n*Math.pow(2,-10*(t-=1))*Math.sin((t*s-r)*(2*Math.PI)/o)*.5+i+e)},easeInBack:function(t,e,i,s,n){return void 0===n&&(n=1.70158),i*(t/=s)*t*((n+1)*t-n)+e},easeOutBack:function(t,e,i,s,n){return void 0===n&&(n=1.70158),i*((t=t/s-1)*t*((n+1)*t+n)+1)+e},easeInOutBack:function(t,e,i,s,n){return void 0===n&&(n=1.70158),(t/=s/2)<1?i/2*(t*t*((1+(n*=1.525))*t-n))+e:i/2*((t-=2)*t*((1+(n*=1.525))*t+n)+2)+e},easeInBounce:function(t,e,i,n){return i-s.easeOutBounce(n-t,0,i,n)+e},easeOutBounce:function(t,e,i,s){return(t/=s)<1/2.75?i*(7.5625*t*t)+e:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,i,n){return t<n/2?.5*s.easeInBounce(2*t,0,i,n)+e:.5*s.easeOutBounce(2*t-n,0,i,n)+.5*i+e}};e.default=s}},[48]);