import './index.css';

function* hello(){
	yield 'hello';
	yield 'world';
	return 'zhangqi';
}
var hw = hello();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());