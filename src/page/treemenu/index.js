import './index.css';
import pub from 'util/public.js';

(function(){
	var li = document.querySelectorAll('.collapsable');

	for(let i = 0, len = li.length; i < len; i++){
		pub.addEvent(li[i], 'click', function(e){
			e.stopPropagation();
			this.classList.toggle('open');
		}, false);
	}
})();

