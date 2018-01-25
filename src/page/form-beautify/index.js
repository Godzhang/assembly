import './index.css';
import 'assets/css/font-awesome.css';
import pub from 'util/public.js';

window.onload = function(){
    const btn = document.querySelector('#submit'),
          loadingBox = document.querySelector('.loading-box');

    btn.onclick = function(){
        loadingBox.classList.add('show');
        setTimeout(() => {
            loadingBox.classList.add('ok');
            loadingBox.children[1].innerHTML = 'login success';
        }, 3000);
        setTimeout(() => {
            loadingBox.classList.remove('show');
        }, 5000);
    }
}






