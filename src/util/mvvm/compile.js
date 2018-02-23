function Compile(el, vm){
	this.$vm = vm;
	this.$el = this.isElementNode(el) ? el : document.querySelector(el);
	if(this.$el){
		this.$fragment = this.nodeFragment(this.$el);
		this.compileElement(this.$fragment);
		//将文档碎片放回真实dom
		this.$el.appendChild(this.$fragment);
	}
}
Compile.prototype = {
	compileElement(el){
		let childNodes = el.childNodes;
		[].slice.call(childNodes).forEach(node => {
			let text = node.textContent;
			let reg = /\{\{((?:.|\n)+?)\}\}/;

			//如果是element节点
			if(this.isElementNode(node)){
				this.compile(node);
			}
			//如果是text节点
			else if(this.isTextNode(node) && reg.test(text)){
				//匹配第一个选项
				this.compileText(node, RegExp.$1.trim());
			}
			//解析子节点包含的指令
			if(node.childNodes && node.childNodes.length){
				this.compileElement(node);
			}
		});
	},
	//文档碎片，遍历过程中会有多次的dom操作，为提高性能我们会将el节点转化为fragment文档碎片进行操作
	//解析操作完成，将其添加回真实dom节点中
	nodeFragment(el){
		let fragment = document.createDocumentFragment();
		let child = null;

		while(child = el.firstChild){
			fragment.appendChild(child);
		}
		return fragment;
	},
	//指令解析
	compile(node){
		let nodeAttrs = node.attributes;

		[].slice.call(nodeAttrs).forEach(attr => {
			let attrName = attr.name;
			if(this.isDirective(attrName)){
				let exp = attr.value;
				let dir = attrName.substring(2);
				//事件指令
				if(this.isEventDirective(dir)){
					CompileUtil.eventHandler(node, this.$vm, exp, dir);
				}
				//普通指令
				else{
					CompileUtil[dir] && CompileUtil[dir](node, this.$vm, exp);
					// node.innerHTML = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
					// 
				}
				node.removeAttribute(attrName);
			}
		});
	},
	compileText(node, exp){
		CompileUtil.text(node, this.$vm, exp);
		// node.textContent = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp];
	},
	isElementNode(node){
		return node.nodeType === 1;
	},
	isTextNode(node){
		return node.nodeType === 3;
	},
	//x-指令判断
	isDirective(attr){
		return attr.indexOf('x-') === 0;
	},
	//事件指令判定
	isEventDirective(dir){
		return dir.indexOf('on') === 0;
	}
}

//定义$elem，缓存当前执行input事件的input dom对象
let $elem = null;
let timer = null;
//指令处理集合
const CompileUtil = {
	html(node, vm, exp){
		this.bind(node, vm, exp, 'html');
	},
	text(node, vm, exp){
		this.bind(node, vm, exp, 'text');
	},
	class(node, vm, exp){
		this.bind(node, vm, exp, 'class');
	},
	model(node, vm, exp){
		this.bind(node, vm, exp, 'model');
		//获取节点上当前的值
		let val = this._getVmVal(vm, exp);
		//监听input事件
		node.addEventListener('input', (e) => {
			let newVal = e.target.value;
			$elem = e.target;

			if(val === newVal){
				return;
			}
			//设置定时器，完成ui js的异步渲染
			clearTimeout(timer);
			timer = setTimeout(() => {
				this._setVmVal(vm, exp, newVal);
				val = newVal;
			});
		}, false);
	},
	bind(node, vm, exp, dir){
		let updateFn = updater[dir + 'Updater'];

		updateFn && updateFn(node, this._getVmVal(vm, exp));

		new Watcher(vm, exp, (value, oldValue) => {
			updateFn && updateFn(node, value, oldValue);
		});
	},
	//事件处理
	eventHandler(node, vm, exp, dir){
		let eventType = dir.split(':')[1];
		// let fn = vm.$options.methods && vm.$options.methods[exp];
		let fn = vm.methods && vm.methods[exp];

		if(eventType && fn){
			node.addEventListener(eventType, fn.bind(vm), false);
		}
	},
	//获取挂载在vm实例上的value值
	_getVmVal(vm, exp){
		let val = vm;
		exp = exp.split('.');
		exp.forEach(key => {
			key = key.trim();
			val = val[key];
		});
		return val;
	},
	//设置挂载在vm实例上的value值
	_setVmVal(vm, exp, value){
		let val = vm;
		exps = exp.split('.');
		exps.forEach((key, index) => {
			key = key.trim();
			if(index < exps.length - 1){
				val = val[key];
			}else{
				val[key] = value;
			}
		});
	}
}

//指令渲染集合
const updater = {
	htmlUpdater(node, value){
		node.innerHTML = typeof value === 'undefined' ? '' : value;
	},
	textUpdater(node, value){
		node.textContent = typeof value === 'undefined' ? '' : value;
	},
	classUpdater(node, value){

	},
	modelUpdater(node, value, oldValue){
		//不对当前操作input进行渲染操作
		if($elem === node){
			return;
		}
		$elem = null;
		node.value = typeof value === 'undefined' ? '' : value;
	}
}
