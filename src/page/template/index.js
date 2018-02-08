import './index.css';
import pub from 'util/public';

// const obj = {
// 	name: 'zhangqi',
// 	wife: 'zhaojinge',
// 	arr: ['freddie', 'brain', 'taylor', 'john']
// }

// let tpl = `<h1>my name is {{name}}, my wife is {{wife}}</h1>
// <h1>queen</h1>
// {{#arr}}
// <h3>.</h3>
// {{/arr}}
// `;
// const box = document.querySelector('.box');

// const obj = {
// 	name: 'zhangqi',
// 	wife: 'zhaojinge',
// 	arr: ['freddie', 'brain', 'taylor', 'john']
// }

// let str = `<div>
//     {% if test > 1 %}
//         {{ test }}
//     {% endif %}
// </div>`;
// const box = document.querySelector('.box');

// const matches = str.match(/\{\{|\{\%/);
// const isBlock = matches[0] === '{%';
// const endIndex = matches.index;

// str = str.slice(endIndex + 2);
// const expression = str.slice(0, str.indexOf('%}'));




























// function Compile(template){
// 	let fn,
// 		match,
// 		code = ['let r = []'],
// 		reg = /\{\{\s*([^{}]+)\s*\}\}/m;

// 	function addLine(text){
// 		code.push(`r.push('${text}');`);
// 	}

// 	while(match = reg.exec(template)){
// 		if(match.index > 0){
// 			addLine(template.slice(0, match.index));
// 		}
// 		code.push(`r.push(this.${match[1]});`);
// 		template = template.substring(match.index + match[0].length);
// 	}
// 	addLine(template);
// 	code.push(`return r.join(\'\')`);

// 	fn = new Function(code.join('\n'));

// 	this.render = function(model){
// 		return fn.apply(model);
// 	}
// }
// const compile = new Compile(tpl);
// const template = compile.render(obj);
// box.innerHTML = template;














