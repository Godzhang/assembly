webpackJsonp([3],{0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={addEvent:function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e.addEventListener?e.addEventListener(t,n,i):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n},removeEvent:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null},fireEvent:function(e,t,n,i){if(document.createEvent){var o=document.createEvent("Event");o.initEvent(t,void 0===n||n,void 0!==i&&i),e.dispatchEvent(o)}else if(document.createEventObject){var a=document.createEventObject();e.fireEvent("on"+t,a)}else"function"==typeof e["on"+t]&&e["on"+t]()},cancelEvent:function(e){return e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0,!1},setTransform:function(e,t){e.style.webkitTransform=t,e.style.mozTransform=t,e.style.msTransform=t,e.style.oTransform=t,e.style.transform=t},setTransitionDuration:function(e,t){e.style.webkitTransitionDuration=t+"ms",e.style.mozTransitionDuration=t+"ms",e.style.oTransitionDuration=t+"ms",e.style.transitionDuration=t+"ms"},transitionEnd:function(e,t){this.addEvent(e,"transitionend",t,!1),this.addEvent(e,"webkitTransitionEnd",t,!1),this.addEvent(e,"mozTransitionEnd",t,!1),this.addEvent(e,"oTransitionEnd",t,!1)},delTransitionEnd:function(e,t){this.removeEvent(e,"transitionend",t,!1),this.removeEvent(e,"webkitTransitionEnd",t,!1),this.removeEvent(e,"mozTransitionEnd",t,!1),this.removeEvent(e,"oTransitionEnd",t,!1)},animationEnd:function(e,t){this.addEvent(e,"animationend",t,!1),this.addEvent(e,"webkitAnimationEnd",t,!1),this.addEvent(e,"mozAnimationEnd",t,!1),this.addEvent(e,"OAnimationEnd",t,!1)},delAnimationEnd:function(e,t){this.removeEvent(e,"animationend",t,!1),this.removeEvent(e,"webkitAnimationEnd",t,!1),this.removeEvent(e,"mozAnimationEnd",t,!1),this.removeEvent(e,"OAnimationEnd",t,!1)},isIE:function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},addPrefix:function(e,t,n){var i=["webkit","moz","o","ms"],o=t.split("");o[0]=o[0].toUpperCase(),o=o.join(""),i.forEach(function(t){e.style[t+o]=n}),e.style[t]=n},getStyle:function(e,t){return"getComputedStyle"in window?getComputedStyle(e,!1)[t]:e.currentStyle[t]}};t.default=i},50:function(e,t,n){e.exports=n(51)},51:function(e,t,n){"use strict";n(52),n(1);var i=n(53),o=function(e){return e&&e.__esModule?e:{default:e}}(i);window.onload=function(){new o.default("#editor",{width:500,height:300})}},52:function(e,t){},53:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(a),r=function(){function e(t,n){i(this,e),this.command=t,this.editor=n}return o(e,[{key:"HSVtoRGB",value:function(e,t,n){var i=void 0,o=void 0,a=void 0,l=void 0,r=void 0,c=void 0,d=void 0,s=void 0;switch(l=Math.floor(6*e),r=6*e-l,c=n*(1-t),d=n*(1-r*t),s=n*(1-(1-r)*t),l%6){case 0:i=n,o=s,a=c;break;case 1:i=d,o=n,a=c;break;case 2:i=c,o=n,a=s;break;case 3:i=c,o=d,a=n;break;case 4:i=s,o=c,a=n;break;case 5:i=n,o=c,a=d}var u=Math.floor(255*i).toString(16),m=Math.floor(255*o).toString(16),h=Math.floor(255*a).toString(16);return"#"+(u.length<2?"0":"")+u+(m.length<2?"0":"")+m+(h.length<2?"0":"")+h}},{key:"addColorBoard",value:function(){var e=document.createElement("table");e.setAttribute("cellpadding",0),e.setAttribute("cellspacing",0),e.setAttribute("unselectable","on"),e.style.border="1px solid #d9d9d9",e.setAttribute("id","color-board");for(var t=1;t<15;t++){for(var n=document.createElement("tr"),i=0;i<25;++i){var o=void 0;if(24==i){var a=Math.floor(255/13*(14-t)).toString(16),l=(a.length<2?"0":"")+a;o="#"+l+l+l}else{var r=i/24,c=t<=8?t/8:1,d=t>8?(16-t)/8:1;o=this.HSVtoRGB(r,c,d)}var s=document.createElement("td");s.setAttribute("title",o),s.setAttribute("unselectable","on"),s.style.backgroundColor=o,s.width=12,s.height=12,n.appendChild(s)}e.appendChild(n)}var u=document.createElement("div");return u.appendChild(e),u.innerHTML}},{key:"clickEvent",value:function(){var e=this,t=document.getElementById("color-board");t=t.childNodes[0].getElementsByTagName("td");for(var n=0;n<t.length;n++)l.default.addEvent(t[n],"click",function(){var t=this.getAttribute("title");e.editor.execCommand(e.command,t),e.editor.closeModal()},!1)}}]),e}(),c=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,e);var o=this,a={width:900,height:500,borderColor:"#ddd",toolBg:"#eee",buttons:{heading:{title:"标题",icon:"",click:function(){function e(){var e=document.querySelector(".editor-heading");e=e.childNodes,e.forEach(function(e){l.default.addEvent(e,"click",function(){var t=e.getAttribute("data-h");o.execCommand("formatBlock","<"+t+">"),o.closeModal()})})}var t=["h1","h2","h3","h4","h5","h6"];o.closeModal();var n='<div class="editor-heading">';t.forEach(function(e){n+="<"+e+' data-h="'+e+'">'+e+"</"+e+">"}),n+="</div>",o.openModal.call(this,n,e)}},code:{title:"引用",icon:"",click:function(){o.execCommand("insertHTML",'<blockquote class="editor-block"><p><br></p></blockquote>');var e=document.createElement("p");e.innerHTML="<br>",o.et.appendChild(e)}},bold:{title:"加粗",icon:"",click:function(){o.execCommand("bold")}},italic:{title:"斜体",icon:"",click:function(){o.execCommand("italic")}},underline:{title:"下划线",icon:"",click:function(){o.execCommand("underline")}},strikethrough:{title:"删除线",icon:"",click:function(){o.execCommand("strikethrough")}},foreColor:{title:"字体颜色",icon:"",click:function(){var e=new r("foreColor",o);o.openModal.call(this,e.addColorBoard(),e.clickEvent.bind(e))}},backColor:{title:"背景色",icon:"",click:function(){var e=new r("hiliteColor",o);o.openModal.call(this,e.addColorBoard(),e.clickEvent.bind(e))}},justifyLeft:{title:"居左",icon:"",click:function(){o.execCommand("justifyLeft")}},justifyCenter:{title:"居中",icon:"",click:function(){o.execCommand("justifyCenter")}},justifyRight:{title:"居右",icon:"",click:function(){o.execCommand("justifyRight")}},justifyFull:{title:"两端对齐",icon:"",click:function(){o.execCommand("justifyFull")}},insertOrderedList:{title:"有序列表",icon:"",click:function(){o.execCommand("insertOrderedList")}},insertUnorderedList:{title:"无序列表",icon:"",click:function(){o.execCommand("insertUnorderedList")}},indent:{title:"indent",icon:"",click:function(){o.execCommand("indent")}},outdent:{title:"outdent",icon:"",click:function(){o.execCommand("outdent")}},centerLink:{title:"链接",icon:"",click:function(){function e(){var e=document.querySelector(".editor-confirm");l.default.addEvent(e,"click",function(){var e=document.querySelector(".editor-link-input");if(""!==e.value.trim()){var t='<a href="'+e.value+'" target="_blank">'+e.value+"</a>";o.execCommand("insertHTML",t)}o.closeModal()})}o.closeModal();o.openModal.call(this,'<input type="text" placeholder="www.example.com" class="editor-link-input"/> <button type="button" class="editor-confirm">确认</button>',e)}},inertImage:{title:"插入图片",icon:"",click:function(){o.closeModal();o.openModal.call(this,'<div class="editor-file">图片上传<input type="file" name="photo" accept="image/*" class="editor-file-input"/></div>',o.fileInput.bind(o))}},emotion:{title:"表情",icon:"",click:function(){o.drawEmotion.call(this,o)}},fullscreen:{title:"全屏",icon:"",click:function(){o.toggleFullScreen()}},save:{title:"保存",icon:""}}};this.parent=document.querySelector(t),this.params=Object.assign({},a,n),this.selectedRange=null,this.et=null,this.toolbarTop=null,this.openModal=function(e,t){o.modal=document.createElement("div"),o.modal.className="editor-modal",o.modal.innerHTML=e,o.parent.appendChild(o.modal);var n=this.offsetLeft+(o.getStyle(this,"width")-o.getStyle(o.modal,"width"))/2;n<0&&(n=3),o.modal.style.left=n+"px",t&&t()},this.init()}return o(e,[{key:"init",value:function(){var e=this,t=this.parent.innerHTML;this.parent.innerHTML="",this.parent.className+=" re-container",this.parent.style.boxSizing="border-box",this.parent.style.border="1px solid "+this.params.borderColor,this.parent.style.width=this.params.width+"px",this.parent.style.height=this.params.height+"px",this.et=document.createElement("div"),this.et.className="re-editor",this.et.setAttribute("tabindex",1),this.et.setAttribute("contenteditable",!0),this.et.setAttribute("spellcheck",!1),this.et.innerHTML=t,this.toolbarTop=document.createElement("div"),this.toolbarTop.className="re-toolbar re-toolbar-top",this.toolbarTop.style.backgroundColor=this.params.toolBg,this.parent.appendChild(this.toolbarTop),this.parent.appendChild(this.et),this.drawTool(this.toolbarTop),this.toolClick(),l.default.addEvent(window,"click",this.isInModal.bind(this)),l.default.addEvent(this.et,"keyup",function(t){e.saveSelection()}),l.default.addEvent(this.et,"mouseup",function(t){e.saveSelection()}),l.default.addEvent(this.et,"focus",function(){this.parentNode.classList.add("active")}),l.default.addEvent(this.et,"blur",function(){this.parentNode.classList.remove("active")});var n=document.querySelector(".re-toolbar-top").offsetHeight;this.et.style.height=this.params.height-n+"px"}},{key:"drawTool",value:function(e){var t=this.params.buttons,n=!0,i=!1,o=void 0;try{for(var a,l=Object.keys(t)[Symbol.iterator]();!(n=(a=l.next()).done);n=!0){var r=a.value,c=document.createElement("a");c.className="re-toolbar-icon",c.setAttribute("title",t[r].title),c.setAttribute("data-edit",r),c.innerHTML=t[r].icon,e.appendChild(c)}}catch(e){i=!0,o=e}finally{try{!n&&l.return&&l.return()}finally{if(i)throw o}}}},{key:"drawEmotion",value:function(e){function t(){var t='<img src="'+this.src+'" class="emotion" width="20" height="20" alt="" />';document.execCommand("insertHTML",!0,t),e.closeModal()}var n=["smile","smiley","yum","relieved","blush","anguished","worried","sweat","unamused","sweat_smile","sunglasses","wink","relaxed","scream","pensive","persevere","mask","no_mouth","kissing_closed_eyes","kissing_heart","hushed","heart_eyes","grin","frowning","flushed","fearful","dizzy_face","disappointed_relieved","cry","confounded","cold_sweat","angry","anguished","broken_heart","beetle","good","no","beer","beers","birthday","bow","bomb","coffee","cocktail","gun","metal","moon"],i="";n.forEach(function(e){i+='<img src="../../src/assets/image/emotion/'+e+'.png" class="emotion" width="20" height="20" alt="" />'}),e.openModal.call(this,i),document.querySelectorAll(".emotion").forEach(function(e){l.default.addEvent(e,"click",t,!1)})}},{key:"toggleFullScreen",value:function(){if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();else{var e=document.documentElement;e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.webkitRequestFullScreen?e.webkitRequestFullScreen():elem.msRequestFullscreen&&elem.msRequestFullscreen()}}},{key:"toolClick",value:function(){for(var e=this,t=document.querySelectorAll("a[data-edit]"),n=0,i=t.length;n<i;n++)l.default.addEvent(t[n],"click",function(t){t.stopPropagation();var n=e.params.buttons,i=this.getAttribute("data-edit");void 0!==n[i].click&&(e.restoreSelection(),n[i].click.call(this),e.saveSelection())})}},{key:"closeModal",value:function(){null!=this.modal&&(this.parent.removeChild(this.modal),this.modal=null)}},{key:"getStyle",value:function(e,t){var n="getComputedStyle"in window?getComputedStyle(e,!1)[t]:e.currentStyle[t];return parseFloat(n)}},{key:"isInModal",value:function(e){if(null!=this.modal){for(var t=e.target,n=!1,i=document.querySelector(".editor-modal");void 0!==t&&"#document"!=t.nodeName;){if(t===i){n=!0;break}t=t.parentNode}n||this.closeModal()}}},{key:"execCommand",value:function(e,t){this.restoreSelection(),this.et.focus(),arguments[1]||(t=null),document.execCommand(e,!1,t)}},{key:"getCurrentRange",value:function(){if(window.getSelection){var e=window.getSelection();if(e.rangeCount>0)return e.getRangeAt(0)}else if(document.selection){var t=document.selection;return t.createRange()}return null}},{key:"saveSelection",value:function(){this.selectedRange=this.getCurrentRange()}},{key:"restoreSelection",value:function(){var e=window.getSelection();if(this.selectedRange){try{e.removeAllRanges()}catch(e){document.body.createTextRange().select(),document.selection.empty()}e.addRange(this.selectedRange)}}},{key:"getSelectionHTML",value:function(){if(window.getSelection){var e=window.getSelection();if(e.rangeCount>0)return e}}},{key:"getSelectionRect",value:function(){if(window.getSelection){var e=window.getSelection();if(!e.rangeCount)return!1;e.getRangeAt(0).cloneRange()}}},{key:"fileInput",value:function(){function e(e){var n=e.target.files,i=null,o=null;if(n&&n.length>0){i=n[0];try{var a=new FileReader;a.onload=function(e){o=e.target.result;var t='<img src="'+o+'" />';document.execCommand("insertHTML",!1,t)},a.readAsDataURL(i)}catch(e){}}t.closeModal()}var t=this;document.querySelector(".editor-file-input").onchange=e.bind(this)}}]),e}();t.default=c}},[50]);