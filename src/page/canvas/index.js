import './index.css';
import pub from 'util/public';

import Watch from 'util/canvas/watch';
import 'util/canvas/magnifier';
import TouchLock from 'util/canvas/touchlock';

window.onload = function(){
	new Watch('#canvas-1', {
		width: 800,
		height: 600
	});

	new TouchLock('.canvas-box-3', {
		onSuccess(){
			setTimeout(() => {
				alert('解锁成功');
				this.reset();
			}, 1000);
		}
	});
}







