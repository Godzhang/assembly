function observe(data){
	if(!data || typeof data !== 'object'){
		return;
	}

	return new Observer(data);
}

function Observer(data){
	this.data = data;
	this.walk(data);
}

Observer.prototype = {
	walk(data){
		Object.keys(data).forEach(key => {
			this.observerProperty(data, key, data[key]);
		});
	},
	observerProperty(obj, key, val){
		let dep = new Dep(),
			childOb = observe(val);

		Object.defineProperty(obj, key, {
			enumerable: true,	//可枚举
			configurable:true,	//可重新定义
			get(){
				if(Dep.target){
					dep.depend();
				}
				if(childOb){
					childOb.dep.depend();
				}
				return val;
			},
			set(newVal){
				if(val === newVal || (newVal !== newVal && val !== val)){
					return;
				}
				console.log('数据更新啦', val, '=>', newVal);
				val = newVal;
				//监听子属性
				childOb = observe(newVal);
				//通知数据变更
				dep.notify();
			}
		});
	}
}

//依赖类
let uid = 0;
function Dep(){
	this.id = uid++;
	//存储watcher
	this.subs = [];
}
Dep.target = null;
Dep.prototype = {
	//添加订阅者
	addSub(sub){
		this.subs.push(sub);
	},
	//移除订阅者
	removeSub(sub){
		let index = this.subs.indexOf(sub);
		if(index > -1){
			this.subs.splice(index, 1);
		}
	},
	//通知数据变更
	notify(){
		this.subs.forEach(sub => {
			//执行sub的update更新函数
			sub.update();
		});
	},
	depend(){
		Dep.target.addDep(this);
	}
}











