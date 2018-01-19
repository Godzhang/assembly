import dialogTemplate from './dialog.string';
import { renderTemplate } from '../util.js';

const defaults = {
	type: 'loading',
	txt: ''
}

class Dialog{
	constructor(options){
		this.params = Object.assign({}, defaults, options);
		this.html = '';
		this.init();
	}

	init(){
		this.initObj();
		this.renderHtml();
	}

	initObj(){

	}

	renderHtml(){

	}
}

export default Dialog;