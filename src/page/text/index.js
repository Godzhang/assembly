import './index.css';

function* hello(){
	yield 'hello';
	yield 'world';
	return 'zhangqi';
}
var hw = hello();
