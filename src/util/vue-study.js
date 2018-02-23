//订阅者Dep
class Dep {
	constructor(){
		//用来存放Watcher对象的数组
		this.subs = [];
	}
	//在subs中添加一个Watcher对象
	addSub(sub){
		this.subs.push(sub);
	}
	//通知所有Watcher对象更新视图
	notify(){
		this.subs.forEach(sub => {
			sub.update();
		});
	}
}
//观察者Watcher
class Watcher {
	constructor(){
		//在new一个Watcher对象时将该对象赋值给Dep.target，在get中用到
		Dep.target = this;
	}

	update(){
		console.log('试图更新了~');
	}
}

Dep.target = null;

function defineReactive(obj, key, val){
	const dep = new Dep();

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter(){
			//将Dep.target(即当前的Watcher对象存入dep的subs中)
			dep.addSub(Dep.target);
			return val;
		},
		set: function reactiveSetter(newVal){
			if(newVal === val) return;
			//在set的时候触发dep的notify来通知所有的Wathcer对象更新视图
			dep.notify();
		}
	})
}

function observer(obj){
	if(!obj || typeof obj !== 'object'){
		return;
	}

	Object.keys(obj).forEach(key => {
		defineReactive(obj, key, obj[key]);
	});
}

class Vue {
	constructor(options){
		this._data = options.data;
		observer(this._data);
		//新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象
		new Watcher();
		//模拟render过程，出发get函数
		console.log('render~', this._data.name);
	}
}

let o = new Vue({
	data: {
		name: 'zhangqi'
	}
});
o._data.name = 'zhaojinge';
o._data.name = 'erbi';