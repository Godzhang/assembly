webpackJsonp([1],{0:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={addEvent:function(n,t,e){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];n.addEventListener?n.addEventListener(t,e,i):n.attachEvent?n.attachEvent("on"+t,e):n["on"+t]=e},removeEvent:function(n,t,e){n.removeEventListener?n.removeEventListener(t,e):n.detachEvent?n.detachEvent("on"+t,e):n["on"+t]=null},fireEvent:function(n,t,e,i){if(document.createEvent){var o=document.createEvent("Event");o.initEvent(t,void 0===e||e,void 0!==i&&i),n.dispatchEvent(o)}else if(document.createEventObject){var r=document.createEventObject();n.fireEvent("on"+t,r)}else"function"==typeof n["on"+t]&&n["on"+t]()},cancelEvent:function(n){return n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation?n.stopPropagation():n.cancelBubble=!0,!1},setTransform:function(n,t){n.style.webkitTransform=t,n.style.mozTransform=t,n.style.msTransform=t,n.style.oTransform=t,n.style.transform=t},setTransitionDuration:function(n,t){n.style.webkitTransitionDuration=t+"ms",n.style.mozTransitionDuration=t+"ms",n.style.oTransitionDuration=t+"ms",n.style.transitionDuration=t+"ms"},transitionEnd:function(n,t){this.addEvent(n,"transitionend",t,!1),this.addEvent(n,"webkitTransitionEnd",t,!1),this.addEvent(n,"mozTransitionEnd",t,!1),this.addEvent(n,"oTransitionEnd",t,!1)},delTransitionEnd:function(n,t){this.removeEvent(n,"transitionend",t,!1),this.removeEvent(n,"webkitTransitionEnd",t,!1),this.removeEvent(n,"mozTransitionEnd",t,!1),this.removeEvent(n,"oTransitionEnd",t,!1)},animationEnd:function(n,t){this.addEvent(n,"animationend",t,!1),this.addEvent(n,"webkitAnimationEnd",t,!1),this.addEvent(n,"mozAnimationEnd",t,!1),this.addEvent(n,"OAnimationEnd",t,!1)},delAnimationEnd:function(n,t){this.removeEvent(n,"animationend",t,!1),this.removeEvent(n,"webkitAnimationEnd",t,!1),this.removeEvent(n,"mozAnimationEnd",t,!1),this.removeEvent(n,"OAnimationEnd",t,!1)},isIE:function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},addPrefix:function(n,t,e){var i=["webkit","moz","o","ms"],o=t.split("");o[0]=o[0].toUpperCase(),o=o.join(""),i.forEach(function(t){n.style[t+o]=e}),n.style[t]=e},getStyle:function(n,t){return"getComputedStyle"in window?getComputedStyle(n,!1)[t]:n.currentStyle[t]}};t.default=i},2:function(n,t){var e;e=function(){return this}();try{e=e||Function("return this")()||(0,eval)("this")}catch(n){"object"==typeof window&&(e=window)}n.exports=e},3:function(n,t,e){"use strict";n.exports=e(4)},38:function(n,t,e){n.exports=e(39)},39:function(n,t,e){"use strict";function i(n){return n&&n.__esModule?n:{default:n}}e(40);var o=e(0),r=(i(o),e(41)),a=i(r);window.onload=function(){var n=document.createElement("div"),t={name:"zhangqi",arr:[1,2,3]},e=(0,a.default)(t);n.innerHTML=e,document.body.appendChild(n)}},4:function(n,t,e){"use strict";(function(t){function i(n){return"string"!=typeof n&&(n=void 0===n||null===n?"":"function"==typeof n?i(n.call(n)):JSON.stringify(n)),n}function o(n){var t=""+n,e=s.exec(t);if(!e)return n;var i="",o=void 0,r=void 0,a=void 0;for(o=e.index,r=0;o<t.length;o++){switch(t.charCodeAt(o)){case 34:a="&#34;";break;case 38:a="&#38;";break;case 39:a="&#39;";break;case 60:a="&#60;";break;case 62:a="&#62;";break;default:continue}r!==o&&(i+=t.substring(r,o)),r=o+1,i+=a}return r!==o?i+t.substring(r,o):i}/*! art-template@runtime | https://github.com/aui/art-template */
var r=e(5),a=Object.create(r?t:window),s=/["&'<>]/;a.$escape=function(n){return o(i(n))},a.$each=function(n,t){if(Array.isArray(n))for(var e=0,i=n.length;e<i;e++)t(n[e],e);else for(var o in n)t(n[o],o)},n.exports=a}).call(t,e(2))},40:function(n,t){},41:function(n,t,e){var i=e(3);n.exports=function(n){"use strict";n=n||{};var t="",e=n.name,o=i.$escape,r=i.$each,a=n.arr;n.$value,n.$index;return e&&(t+=' <div class="header">',t+=o(e),t+="</div> ",r(a,function(n,e){t+=' <div class="content">',t+=o(e),t+="----",t+=o(n),t+="</div> "}),t+=" "),t+=' <div class="footer">footer</div>'}},5:function(n,t,e){(function(t){n.exports=!1;try{n.exports="[object process]"===Object.prototype.toString.call(t.process)}catch(n){}}).call(t,e(2))}},[38]);