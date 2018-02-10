let uid = 1;

const fire = (callback, thisObj) => {
	setTimeout(() => {
		callback.call(thisObj);
	}, 0);
}

class Jas {
	constructor(){
		this.map = {};
		this.rmap = {};
	}

	when(resoures, callback, thisObj){
		let map = this.map,
			rmap = this.rmap;

		if(typeof resoures === 'string'){
			resoures = [resoures];
		}

		let id = (uid++).toString(16);
		map[id] = {
			waiting: resoures.slice(0),
			callback: callback,
			thisObj: thisObj || window
		};

		for(let i = 0, len = resoures.length; i < len; i++){
			let res = resoures[i],
				list = rmap[res] || (rmap[res] = []);

			list.push(id);
		}
		return this;
	}

	trigger(resoures){
		if(!resoures) return this;

		let map = this.map,
			rmap = this.rmap;

		if(typeof resoures === 'string'){
			resoures = [resoures];
		}

		for(let i = 0, len = resoures.length; i < len; i++){
			let res = resoures[i];
			if(typeof rmap[res] === 'undefined') continue;
			this._release(res, rmap[res]);
			delete rmap[res];
		}
		return this;
	}

	_release(res, list){
		let map = this.map,
			rmap = this.rmap;

		for(let i = 0, len = list.length; i < len; i++){
			let uid = list[i],
				mapItem = map[uid],
				waiting = mapItem.waiting,
				pos = waiting.indexOf(res);

			waiting.splice(pos, 1);
			if(waiting.length === 0){
				fire(mapItem.callback, mapItem.thisObj);
				delete map[uid];
			}
		}
	}
}

export default Jas;








