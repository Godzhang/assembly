webpackJsonp([12],{0:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={addEvent:function(n,t,e){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];n.addEventListener?n.addEventListener(t,e,i):n.attachEvent?n.attachEvent("on"+t,e):n["on"+t]=e},removeEvent:function(n,t,e){n.removeEventListener?n.removeEventListener(t,e):n.detachEvent?n.detachEvent("on"+t,e):n["on"+t]=null},fireEvent:function(n,t,e,i){if(document.createEvent){var o=document.createEvent("Event");o.initEvent(t,void 0===e||e,void 0!==i&&i),n.dispatchEvent(o)}else if(document.createEventObject){var s=document.createEventObject();n.fireEvent("on"+t,s)}else"function"==typeof n["on"+t]&&n["on"+t]()},cancelEvent:function(n){return n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation?n.stopPropagation():n.cancelBubble=!0,!1},setTransform:function(n,t){n.style.webkitTransform=t,n.style.mozTransform=t,n.style.msTransform=t,n.style.oTransform=t,n.style.transform=t},setTransitionDuration:function(n,t){n.style.webkitTransitionDuration=t+"ms",n.style.mozTransitionDuration=t+"ms",n.style.oTransitionDuration=t+"ms",n.style.transitionDuration=t+"ms"},transitionEnd:function(n,t){this.addEvent(n,"transitionend",t,!1),this.addEvent(n,"webkitTransitionEnd",t,!1),this.addEvent(n,"mozTransitionEnd",t,!1),this.addEvent(n,"oTransitionEnd",t,!1)},delTransitionEnd:function(n,t){this.removeEvent(n,"transitionend",t,!1),this.removeEvent(n,"webkitTransitionEnd",t,!1),this.removeEvent(n,"mozTransitionEnd",t,!1),this.removeEvent(n,"oTransitionEnd",t,!1)},animationEnd:function(n,t){this.addEvent(n,"animationend",t,!1),this.addEvent(n,"webkitAnimationEnd",t,!1),this.addEvent(n,"mozAnimationEnd",t,!1),this.addEvent(n,"OAnimationEnd",t,!1)},delAnimationEnd:function(n,t){this.removeEvent(n,"animationend",t,!1),this.removeEvent(n,"webkitAnimationEnd",t,!1),this.removeEvent(n,"mozAnimationEnd",t,!1),this.removeEvent(n,"OAnimationEnd",t,!1)},isIE:function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},addPrefix:function(n,t,e){var i=["webkit","moz","o","ms"],o=t.split("");o[0]=o[0].toUpperCase(),o=o.join(""),i.forEach(function(t){n.style[t+o]=e}),n.style[t]=e},getStyle:function(n,t){return"getComputedStyle"in window?getComputedStyle(n,!1)[t]:n.currentStyle[t]}};t.default=i},57:function(n,t,e){n.exports=e(58)},58:function(n,t,e){"use strict";e(59),e(1);var i=e(0);!function(n){n&&n.__esModule}(i);window.onload=function(){var n=document.querySelector("#submit"),t=document.querySelector(".loading-box");n.onclick=function(){t.classList.add("show"),setTimeout(function(){t.classList.add("ok"),t.children[1].innerHTML="login success"},3e3),setTimeout(function(){t.classList.remove("show")},5e3)}}},59:function(n,t){}},[57]);