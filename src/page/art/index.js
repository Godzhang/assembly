import './index.css';
import pub from 'util/public.js';
import template from './index.art';

window.onload = function(){
    let div = document.createElement('div');
    let obj = {
        name: 'zhangqi',
        arr: [1,2,3]
    };
    let body = template(obj);
    div.innerHTML = body;
    document.body.appendChild(div);
}










