import './index.css';
import pub from 'util/public';

(function(){
	const regInput = document.querySelector('#regex'),
		  textInput = document.querySelector('#text'),
		  runBtn = document.querySelector('#run'),
		  errBox = document.querySelector('#err'),
		  resultBox = document.querySelector('#result');

	pub.addEvent(runBtn, 'click', () => {
		//清空提示信息
		errBox.innerHTML = '';
		resultBox.innerHTML = '';

		//获取正则和文本
		let text = textInput.value,
			regex = regInput.value;

		if(regex === ''){
			errBox.innerHTML = '请输入正则表达式';
		}else if(text === ''){
			errBox.innerHTML = '请输入测试文本';
		}else{
			regex = createRegex(regex);
			if(!regex) return;

			let result,
				results = [];

			//如果有g修饰符，获取所有匹配项
			if(regex.global){
				while(result = regex.exec(text)){
					results.push(result);
				}
			//否则匹配一次
			}else{
				results.push(regex.exec(text));
			}

			if(results[0] === null){
				resultBox.innerHTML = '匹配到0个结果';
				return;
			}

			for(let i = results.length -1; i >= 0; i--){
				let result = results[i],
					match = result[0],
					prefix = text.substr(0, result.index),
					suffix = text.substr(result.index + match.length);

				text = `${prefix}<span class="info">${match}</span>${suffix}`;
			}
			resultBox.innerHTML = `匹配到${results.length}个结果：<br>${text}`;
		}

		//验证并生成正则表达式
		function createRegex(regex){
			//验证正则表达式格式的正则表达式
			const reg = /\/(.+)\/([igm]*)/;
			//不符合正则表达式格式，return
			if(!reg.test(regex)){
				errBox.innerHTML = '请输入正确格式的正则表达式';
				return false;
			}

			let regBody = '',
				regMod = '';

			regex.replace(reg, (match, ...arg) => {
				regBody = arg[0];
				regMod = arg[1];
			});

			return new RegExp(regBody, regMod);
		}
	});
})();






