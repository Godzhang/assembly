import pub from 'util/public.js';

class ColorPicker {
	constructor(command, t){
		this.command = command;
		this.editor = t;
	}

	HSVtoRGB(h, s, v){
		let r, g, b, i, f, p, q, t;
		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);
		switch(i % 6) {
			case 0:
				r = v, g = t, b = p;
				break;
			case 1:
				r = q, g = v, b = p;
				break;
			case 2:
				r = p, g = v, b = t;
				break;
			case 3:
				r = p, g = q, b = v;
				break;
			case 4:
				r = t, g = p, b = v;
				break;
			case 5:
				r = v, g = p, b = q;
				break;
		}
		let hr = Math.floor(r * 255).toString(16);
		let hg = Math.floor(g * 255).toString(16);
		let hb = Math.floor(b * 255).toString(16);
		return '#' + (hr.length < 2 ? '0' : '') + hr +
			(hg.length < 2 ? '0' : '') + hg +
			(hb.length < 2 ? '0' : '') + hb;
	}

	addColorBoard(){
		let table = document.createElement('table');
		table.setAttribute('cellpadding', 0);
		table.setAttribute('cellspacing', 0);
		table.setAttribute('unselectable', 'on');
		table.style.border = '1px solid #d9d9d9';
		table.setAttribute('id', 'color-board');

		for(let row = 1; row < 15; row++){
			let rows = document.createElement('tr');
			for(let col = 0; col < 25; ++col){
				let color;
				if(col == 24) {
					let gray = Math.floor(255 / 13 * (14 - row)).toString(16);
					let hexg = (gray.length < 2 ? '0' : '') + gray;
					color = '#' + hexg + hexg + hexg;
				} else {
					let hue = col / 24;
					let saturation = row <= 8 ? row / 8 : 1;
					let value = row > 8 ? (16 - row) / 8 : 1;
					color = this.HSVtoRGB(hue, saturation, value);
				}
				let td = document.createElement('td');
				td.setAttribute('title', color);
				td.setAttribute('unselectable', 'on');
				td.style.backgroundColor = color;
				td.width = 12;
				td.height = 12;
				rows.appendChild(td);
			}
			table.appendChild(rows);
		}
		let box = document.createElement('div');
		box.appendChild(table);
		return box.innerHTML;
	}

	clickEvent(){
		let self = this;
		let tds = document.getElementById('color-board');
		tds = tds.childNodes[0].getElementsByTagName('td');
		for(let i = 0; i < tds.length; i++) {
			pub.addEvent(tds[i], 'click', function() {
				let color = this.getAttribute('title');
				self.editor.execCommand(self.command, color);
				self.editor.closeModal();
			}, false);
		}
	}
}

class RichEditor {
	constructor(container, params = {}){
		const t = this;
		const options = {
			width: 900,
			height: 500,
			borderColor: "#ddd",
			toolBg: "#eee",
			//按钮组
			buttons: {
				heading: {
					title: '标题',
					icon: '\uf1dc',
					click(){
						let h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
						t.closeModal();
						let html = '<div class="editor-heading">';
						h.forEach((val) => {
							html += `<${val} data-h="${val}">${val}</${val}>`;
						});
						html += '</div>';

						function HClick(){
							let h = document.querySelector('.editor-heading');
								h = h.childNodes;
							h.forEach((val) => {
								pub.addEvent(val, 'click', () => {
									let dh = val.getAttribute('data-h');
									t.execCommand('formatBlock', `<${dh}>`);
									t.closeModal();
								});
							});
						}
						t.openModal.call(this, html, HClick);
					}
				},
				code: {
					title: '引用',
					icon: '\uf10d',
					click(){
						let html = '<blockquote class="editor-block"><p><br></p></blockquote>';
						t.execCommand('insertHTML', html);
						let p = document.createElement('p');
						p.innerHTML = '<br>';
						t.et.appendChild(p);
					}
				},
				bold: {
					title: '加粗',
					icon: '\uf032',
					click(){
						t.execCommand('bold');
					}
				},
				italic: {
					title: '斜体',
					icon: '\uf033',
					click(){
						t.execCommand('italic');
					}
				},
				underline: {
					title: '下划线',
					icon: '\uf0cd',
					click(){
						t.execCommand('underline');
					}
				},
				strikethrough: {
					title: '删除线',
					icon: '\uf0cc',
					click(){
						t.execCommand('strikethrough');
					}
				},
				foreColor: {
					title: '字体颜色',
					icon: '\uf1fc',
					click(){
						let color = new ColorPicker('foreColor', t);
						t.openModal.call(this, color.addColorBoard(), color.clickEvent.bind(color));
					}
				},
				backColor: {
					title: '背景色',
					icon: '\uf043',
					click(){
						let color = new ColorPicker('hiliteColor', t);
						t.openModal.call(this, color.addColorBoard(), color.clickEvent.bind(color));
					}
				},
				justifyLeft: {
					title: "居左",
					icon: "\uf036",
					click(){
						t.execCommand('justifyLeft');
					}
				},
				justifyCenter: {
					title: "居中",
					icon: "\uf037",
					click(){
						t.execCommand('justifyCenter');
					}
				},
				justifyRight: {
					title: "居右",
					icon: "\uf038",
					click(){
						t.execCommand('justifyRight');
					}
				},
				justifyFull: {
					title: "两端对齐",
					icon: "\uf039",
					click(){
						t.execCommand('justifyFull');
					}
				},
				insertOrderedList: {
					title: "有序列表",
					icon: "\uf0cb",
					click(){
						t.execCommand('insertOrderedList');
					}
				},
				insertUnorderedList: {
					title: "无序列表",
					icon: "\uf0ca",
					click(){
						t.execCommand('insertUnorderedList');
					}
				},
				indent: {
					title:"indent",
					icon:"\uf03c",
					click(){
						t.execCommand('indent');
					}
				},
				outdent: {
					title:"outdent",
					icon:"\uf03b",
					click(){
						t.execCommand('outdent');
					}
				},
				centerLink: {
					title: "链接",
					icon: "\uf0c1",
					click(){
						t.closeModal();
						const html = '<input type="text" placeholder="www.example.com" class="editor-link-input"/> <button type="button" class="editor-confirm">确认</button>';
						
						function btnClick(){
							let confirm = document.querySelector('.editor-confirm');
							pub.addEvent(confirm, 'click', function(){
								let link = document.querySelector('.editor-link-input');
								if(link.value.trim() !== ''){
									let a = `<a href="${link.value}" target="_blank">${link.value}</a>`;
									t.execCommand('insertHTML', a);
								}
								t.closeModal();
							});
						}
						t.openModal.call(this, html, btnClick);
					}
				},
				inertImage: {
					title: "插入图片",
					icon: "\uf03e",
					click(){
						t.closeModal();
						let html = `<div class="editor-file">图片上传<input type="file" name="photo" accept="image/*" class="editor-file-input"/></div>`;
						t.openModal.call(this, html, t.fileInput.bind(t));
					}
				},
				emotion: {
					title: "表情",
					icon: "\uf118",
					click(){
						t.drawEmotion.call(this, t);
					}
				},
				fullscreen: {
					title: "全屏",
					icon: "\uf066",
					click(){
						t.toggleFullScreen();
					}
				},
				save: {
					title: '保存',
					icon: '\uf0c7'
				}
			}
		}
		this.parent = document.querySelector(container);
		this.params = Object.assign({}, options, params);
		this.selectedRange = null;
		this.et = null;
		this.toolbarTop = null;

		this.openModal = function(html, fn){
			t.modal = document.createElement('div');
			t.modal.className = 'editor-modal';
			t.modal.innerHTML = html;
			t.parent.appendChild(t.modal);

			let left = this.offsetLeft + (t.getStyle(this, 'width') - t.getStyle(t.modal, 'width')) / 2;
			left < 0 ? left = 3 : '';
			t.modal.style.left = left + 'px';
			fn && fn();
		}

		this.init();
	}

	init(){
		//初始化容器外框样式		
		let defaultValue = this.parent.innerHTML;
		this.parent.innerHTML = '';
		this.parent.className += ' re-container';
		this.parent.style.boxSizing = 'border-box';
		this.parent.style.border = '1px solid ' + this.params.borderColor;
		this.parent.style.width = this.params.width + 'px';
		this.parent.style.height = this.params.height + 'px';
		//创建编辑区域
		this.et = document.createElement('div');
		this.et.className = 're-editor';
		this.et.setAttribute('tabindex', 1);
		this.et.setAttribute('contenteditable', true);
		this.et.setAttribute('spellcheck', false);
		this.et.innerHTML = defaultValue;
		//创建工具栏
		this.toolbarTop = document.createElement('div');
		this.toolbarTop.className = 're-toolbar re-toolbar-top';
		this.toolbarTop.style.backgroundColor = this.params.toolBg;

		this.parent.appendChild(this.toolbarTop);
		this.parent.appendChild(this.et);
		//添加工具栏按钮
		this.drawTool(this.toolbarTop);
		//按钮绑定事件
		this.toolClick();

		pub.addEvent(window, 'click', this.isInModal.bind(this));

		pub.addEvent(this.et, 'keyup', (e) => {
			this.saveSelection();
		});
		pub.addEvent(this.et, 'mouseup', (e) => {
			this.saveSelection();
		});
		pub.addEvent(this.et, 'focus', function(){
			this.parentNode.classList.add('active');
		});
		pub.addEvent(this.et, 'blur', function(){
			this.parentNode.classList.remove('active');
		});

		let topHeight = document.querySelector('.re-toolbar-top').offsetHeight;
		this.et.style.height = (this.params.height - topHeight) + 'px';
	}

	drawTool(toolbarTop){
		let buttons = this.params.buttons;
		for(let btn of Object.keys(buttons)){
			let target = document.createElement('a');
			target.className = 're-toolbar-icon';
			target.setAttribute('title', buttons[btn]['title']);
			target.setAttribute('data-edit', btn);
			target.innerHTML = buttons[btn]['icon'];
			toolbarTop.appendChild(target);
		}
	}

	drawEmotion(t){
		const list_smilies = ['smile', 'smiley', 'yum', 'relieved', 'blush', 'anguished', 'worried', 'sweat',
			'unamused', 'sweat_smile', 'sunglasses', 'wink', 'relaxed', 'scream', 'pensive',
			'persevere', 'mask', 'no_mouth', 'kissing_closed_eyes', 'kissing_heart', 'hushed',
			'heart_eyes', 'grin', 'frowning', 'flushed', 'fearful', 'dizzy_face', 'disappointed_relieved',
			'cry', 'confounded', 'cold_sweat', 'angry', 'anguished', 'broken_heart', 'beetle', 'good', 'no', 'beer',
			'beers', 'birthday', 'bow', 'bomb', 'coffee', 'cocktail', 'gun', 'metal', 'moon'
		];
		let html = ``;
		list_smilies.forEach((val) => {
			html += `<img src="../../src/assets/image/emotion/${val}.png" class="emotion" width="20" height="20" alt="" />`;
		});
		t.openModal.call(this, html);

		function add(){
			let img = `<img src="${this.src}" class="emotion" width="20" height="20" alt="" />`;
			document.execCommand('insertHTML', true, img);
			t.closeModal();
		}
		let emotion = document.querySelectorAll('.emotion');
		emotion.forEach((val) => {
			pub.addEvent(val, 'click', add, false);
		});
	}

	toggleFullScreen(){
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
			let docElm = document.documentElement;
			if(docElm.requestFullscreen) {
				docElm.requestFullscreen();
			} else if(docElm.mozRequestFullScreen) {
				docElm.mozRequestFullScreen();
			} else if(docElm.webkitRequestFullScreen) {
				docElm.webkitRequestFullScreen();
			} else if(elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			};
		} else {
			if(document.exitFullscreen) {
				document.exitFullscreen();
			} else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if(document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		};
	}

	toolClick(){
		let self = this;
		let toolbtn = document.querySelectorAll('a[data-edit]');
		for(let i = 0, len = toolbtn.length; i < len; i++){
			pub.addEvent(toolbtn[i], 'click', function(e){
				e.stopPropagation();

				let btn = self.params.buttons,
					name = this.getAttribute('data-edit');
				if(typeof btn[name]['click'] !== 'undefined'){
					self.restoreSelection();
					btn[name].click.call(this);
					self.saveSelection();
				}
			});
		}
	}

	closeModal(){
		if(this.modal != null){
			this.parent.removeChild(this.modal);
			this.modal = null;
		}
	}

	getStyle(dom, attr){
		let value = ('getComputedStyle' in window) ? getComputedStyle(dom, false)[attr] : dom.currentStyle[attr];
		return parseFloat(value);
	}

	isInModal(e){
		if(this.modal != null){
			let node = e.target,
				isIn = false,
				modal = document.querySelector('.editor-modal');
			while(typeof node !== 'undefined' && node.nodeName != '#document'){
				if(node === modal){
					isIn = true;
					break;
				}
				node = node.parentNode;
			};
			if(!isIn){
				this.closeModal();
			}
		}
	}

	execCommand(command, param){
		this.restoreSelection();
		this.et.focus();
		if(!arguments[1]){
			param = null;
		}
		document.execCommand(command, false, param);
	}
	//获取当前range
	getCurrentRange(){
		if(window.getSelection){
			//使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
			let sel = window.getSelection();
			if(sel.rangeCount > 0){
				//通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
				return sel.getRangeAt(0);
			}
		}else if(document.selection){	//IE
			let sel = document.selection;
			return sel.createRange();
		}
		return null;
	}
	//保存光标位置
	saveSelection(){
		this.selectedRange = this.getCurrentRange();
	}
	//恢复光标位置
	restoreSelection(){
		let selection = window.getSelection();
		if(this.selectedRange){
			try {
				selection.removeAllRanges();
			}catch(ex){
				document.body.createTextRange().select();
				document.selection.empty();
			}
			selection.addRange(this.selectedRange);
		}
	}
	//获取选中区域文本
	getSelectionHTML(){
		if(window.getSelection){
			let sel = window.getSelection();
			if(sel.rangeCount > 0){
				return sel;
			}
		}
	}

	getSelectionRect(){
		if(window.getSelection){
			let sel = window.getSelection();
			if(!sel.rangeCount){
				return false;
			}
			let range = sel.getRangeAt(0).cloneRange();
		}
	}

	fileInput(){
		let self = this;
		let fi = document.querySelector('.editor-file-input');

		function change(e){
			let files = e.target.files,
				file = null,
				url = null;
			if(files && files.length > 0){
				file = files[0];
				
				try {
					let fileReader = new FileReader();
					fileReader.onload = function(e){
						url = e.target.result;
						let img = `<img src="${url}" />`;
						document.execCommand('insertHTML', false, img);
					}
					fileReader.readAsDataURL(file);
				}catch(e){

				}
			}
			self.closeModal();
		}

		fi.onchange = change.bind(this);
	}

}

export default RichEditor;