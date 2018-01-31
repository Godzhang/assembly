function Watcher(vm, expOrFn, cb){
	this.vm = vm;
	expOrFn = expOrFn.trim();
	this.expOrFn = expOrFn;
	this.cb = cb;
	this.depIds = {};

	if(typeof expOrFn === 'function'){
		this.getter = expOrFn;
	}else{
		this.getter = this.parseGetter(expOrFn);
	}
	this.value = this.get();
}
Watcher.prototype = {
	update(){
		this.run();
	},
	run(){
		let newVal = this.get();
		let oldVal = this.value;
		if(newVal === oldVal) return;
		this.value = newVal;
		//将newVal oldVal挂载到MVVM实例上
		this.cb.call(this.vm, newVal, oldVal);
	},
	get(){
		Dep.target = this;	//将当前订阅者指向自己
		let value = this.getter.call(this.vm, this.vm);	//触发getter, 将自身添加到dep中
		Dep.target = null;	//添加完成	重置
		return value;
	},
	//添加Watcher to Dep.subs[]
	addDep(dep){
		if(!this.depIds.hasOwnProperty(dep.id)){
			dep.addSub(this);
			this.depIds[dep.id] = dep;
		}
	},
	parseGetter(exp){
		if(/[^\w.$]/.test(exp)) return;

		let exps = exp.split('.');

		//简单的循环依赖处理
		return (obj) => {
			for(let i = 0, len = exps.length; i < len; i++){
				if(!obj) return;
				obj = obj[exps[i]];
			}
			return obj;
		}
	}
}



































