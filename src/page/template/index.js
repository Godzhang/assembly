import './index.css';
import pub from 'util/public';

const obj = {
	name: 'zhangqi',
	wife: 'zhaojinge',
	arr: ['freddie', 'brain', 'taylor', 'john']
}

const tpl = `<h1>my name is {{name}}, my wife is {{wife}}</h1>`;
const box = document.querySelector('.box');

function Compile(template){
	let fn,
		match,
		code = ['let r = []'],
		reg = /\{\{\s*([^{}]+)\s*\}\}/m;

	function addLine(text){
		code.push(`r.push('${text}');`);
	}

	while(match = reg.exec(template)){
		if(match.index > 0){
			addLine(template.slice(0, match.index));
		}
		code.push(`r.push(this.${match[1]});`);
		template = template.substring(match.index + match[0].length);
	}
	addLine(template);
	code.push(`return r.join(\'\')`);

	fn = new Function(code.join('\n'));
console.log(fn)
	this.render = function(model){
		return fn.apply(model);
	}
}
const compile = new Compile(tpl);
console.log(compile.render(obj));















