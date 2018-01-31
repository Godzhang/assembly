//双向绑定类
function MVVM(options){
	this.$options = options || {};
	let data = this._data = this.$options.data;

	Object.keys(data).forEach(key => {
		this._proxyData(key);
	});
	observe(data, this);
	new Compile(options.el || document.body, this);
}
MVVM.prototype = {
	//属性代理
	_proxyData(key, setter, getter){
		let self = this;

		setter = setter || Object.defineProperty(this, key, {
			configureable: false,
			enumerable: true,
			get: function proxyGetter(){
				return self._data[key];
			},
			set: function proxySetter(newVal){
				self._data[key] = newVal;
			}
		});
	}
}