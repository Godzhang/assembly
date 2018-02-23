let uid = 1;

const fire = (callback, thisObj) => {
	setTimeout(() => {
		callback.call(thisObj);
	}, 0);
}

class State {
	constructor(){
		this.map = {};
		this.mapid = {};
	}

	when(arr, callback, thisObj){
		let map = this.map,
			mapid = this.mapid;

		if(typeof arr === 'string'){
			arr = [arr];
		}

		let id = (uid++).toString(16);

		map[id] = {
			arr: arr.slice(0),
			callback: callback,
			thisObj: thisObj || window
		};

		arr.forEach((val) => {
			if(!mapid[val]){
				mapid[val] = id;
			}
		});

		return this;
	}

	trigger(arr){
		if(!arr) return this;

		let map = this.map,
			mapid = this.mapid;

		if(typeof arr === 'string'){
			arr = [arr];
		}

		for(let i = 0, len = arr.length; i < len; i++){
			let res = arr[i];
			//如果没有对应的id值，跳过
			if(typeof mapid[res] === 'undefined') continue;
			this._release(res, mapid[res]);
			delete mapid[res];
		}

		return this;
	}

	_release(res, list){
		let map = this.map,
			rmap = this.rmap,
			mapItem = map[list],
			arr = mapItem.arr,
			pos = arr.indexOf(res);

		arr.splice(pos, 1);
		if(arr.length === 0){
			fire(mapItem.callback, mapItem.thisObj);
			delete map[list];
		}
	}
}

export default State;