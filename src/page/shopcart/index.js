import './index.css';
import pub from 'util/public.js';

(function(){
	//自定义选择器
	function $(str, parent){
		let elem = str.slice(1);

		if(str.indexOf("#") === 0){
			return document.getElementById(elem);
		}
		
		let all = null;
		
		if(parent == null){
			all = document.getElementsByTagName('*');
		}else{
			all = parent.getElementsByTagName('*');
		}
		
		let	reg = new RegExp("(^|\\s+)" + elem + "(\\s+|$)"),
			res = [];

		for(let i = 0, len = all.length; i < len; i++){
			if(reg.test(all[i].className)){
				res.push(all[i]);
			}
		}

		return res.length <= 1 ? res[0] : res;
	}

	let checkCount = 0,												//记录已选中按钮数量
		cp = $(".cp"),												//每一项商品价格的集合
		allPrize = $(".allPrize").getElementsByTagName("span")[0],	//总价
		checkBtn = $(".pro"),										//获取每一条商品的复选按钮的集合								
		allBtn = $("#all"),											//结算栏复选按钮
		list = $(".product-list"),									//列表容器
		delSel = $(".delSel");										//结算删除按钮

	//计算总值
	function totalPrize(){
		let sum = 0;
		if(!cp) return;
		for(let i = 0, len = cp.length; i < len; i++){
			let check = $(".pro", cp[i].parentNode.parentNode);
			if(check.checked){
				sum += Number(cp[i].innerHTML);
			}			
		}

		allPrize.innerHTML = sum.toFixed(2);
	}
	//进入页面先计算总价
	totalPrize();
	//给商品复选按钮绑定事件
	for(let j = 0, len = checkBtn.length; j < len; j++){
		let btn = checkBtn[j];
		
		btn.index = j;
		pub.addEvent(btn, 'click', function(){
			checkchange(this);
		});

		//计算已选中的按钮个数
		if(btn.checked){
			checkCount++;
		}
	}
	//给总按钮添加点击事件
	pub.addEvent(allBtn, 'click', function(){
		if(this.checked){
			handleCheck(true);
		}else{
			handleCheck(false);
		}
	});

	function checkchange(elem){
		if(elem.checked){
			checkCount++;
		}else{
			checkCount--;
		}
		totalPrize();
		checkCheck();
	}

	function checkCheck(){
		if(checkCount !== checkBtn.length){
			allBtn.checked = false;
		}else{
			allBtn.checked = true;
		}
	}

	function handleCheck(bol){
		for(let i = 0, len = checkBtn.length; i < len; i++){
			if(checkBtn[i].checked === bol) continue;
			checkBtn[i].checked = bol;
			checkchange(checkBtn[i]);
		}
	}
	//商品数量更改事件
	pub.addEvent(list, 'click', (event) => {
		let target = event.target;

		if(target.parentNode.className.indexOf("count") > -1){
			let count = $(".proCount", target.parentNode),
				item = target.parentNode.parentNode,
				unit = Number($(".prize", item).innerHTML),
				total = $(".cp", item);

			if(target.className.indexOf("plus") > -1){
				count.value = Number(count.value) + 1;
				total.innerHTML = (count.value * unit).toFixed(2);
				totalPrize();
			}

			if(target.className.indexOf("reduce") > -1){
				if(count.value - 1 < 1){
					let con = confirm("确定要删除此商品吗？");
					if(con){
						//删除对应的商品信息
						let check = $(".pro", item);
						item.parentNode.removeChild(item);
						if(check.checked){
							cp = $(".cp");							
						}
					}
				}else{
					count.value = Number(count.value) - 1;
					total.innerHTML = (count.value * unit).toFixed(2);
				}
				totalPrize();
			}
		}

		if(target.className.indexOf("delItem") > -1){
			let item = target.parentNode.parentNode,
				ifClose = confirm("确定要删除此商品吗？");

			if(ifClose){
				item.parentNode.removeChild(item);
				cp = $(".cp");
				totalPrize();
			}
		}
	});

	//删除选中商品
	pub.addEvent(delSel, 'click', () => {
		if(checkCount <= 0) return;

		let ifDel = confirm("确定要删除选中商品吗？");

		if(!ifDel) return;
		for(let i = 0, len = checkBtn.length; i < len; i++){
			if(checkBtn[i].checked){
				let item = checkBtn[i].parentNode.parentNode;
				item.parentNode.removeChild(item);
			}
		}
		totalPrize();
	});
})();





