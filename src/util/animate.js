import pub from './public';

function animate(obj, data, rate, fn){
	for(let key of data){
		((k) => {
			let cur = parseFloat(pub.getStyle(obj)[k]);







		})(key);
	}
}






