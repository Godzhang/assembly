import pub from 'util/public.js';

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
}

export default RichEditor;