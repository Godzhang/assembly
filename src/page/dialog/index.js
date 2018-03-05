import './index.css';
import 'util/public.js';
import Dialog from 'util/dialog/dialog';

const btn1 = document.querySelector('#btn-1');
const btn2 = document.querySelector('#btn-2');
const btn3 = document.querySelector('#btn-3');
const btn4 = document.querySelector('#btn-4');
const btn5 = document.querySelector('#btn-5');
const btn6 = document.querySelector('#btn-6');
const btn7 = document.querySelector('#btn-7');

window.onload = function(){
    btn1.onclick = function(){
        new Dialog({
            maskClose: true
        });
    };
    btn2.onclick = function(){
        new Dialog({
            type: 'warning',
            txt: '任务错误',
            delay: 2000
        });
    };
    btn3.onclick = function(){
        new Dialog({
            type: 'confirm',
            txt: '任务成功',
            buttons: [
                {
                    type: 'confirm',
                    txt: '确定',
                    callback(){
                        
                    }
                },
                {
                    type: 'warning',
                    txt: '取消',
                    callback(){
                        
                    }
                }
            ]
        });
    };
    btn4.onclick = function(){
        new Dialog({
            type: 'warning',
            txt: '任务错误',
            maskClose: true,
            buttons: [
                {
                    type: 'confirm',
                    txt: '确定',
                    callback(){
                        return false
                    }
                },
                {
                    type: 'warning',
                    txt: '取消',
                    callback(){
                        return false;
                    }
                }
            ]
        });
    };
    btn5.onclick = function(){
        new Dialog({
            type: 'confirm',
            txt: '任务完成',
            maskClose: true,
            buttons: [
                {
                    type: 'confirm',
                    txt: '确定',
                    callback(){
                        return false
                    }
                },
                {
                    type: 'warning',
                    txt: '取消',
                    callback(){
                        return false;
                    }
                },
                {
                    type: 'waiting',
                    txt: '关闭'
                }
            ]
        });
    };
    btn6.onclick = function(){
        let btn = new Dialog({
            type: 'warning',
            txt: '警告',
            maskClose: true,
            buttons: [
                {
                    type: 'confirm',
                    txt: '确定',
                    callback(){
                        new Dialog({
                            type: 'waiting',
                            delay: 2000
                        });
                    }
                },
                {
                    type: 'warning',
                    txt: '删除',
                    callback(){

                        let child = new Dialog({
                            type: 'confirm',
                            buttons: [
                                {
                                    type: 'confirm',
                                    txt: '关闭上一个按钮',
                                    callback(){
                                        btn.close();
                                        setTimeout(() => {
                                            child.close();
                                        }, 1000);
                                        return false;
                                    }
                                }
                            ]
                        });

                        return false;
                    }
                }
            ]
        });
    };
}
    








