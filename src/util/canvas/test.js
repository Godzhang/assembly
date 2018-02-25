import pub from 'util/public';

const cvs = document.querySelector('#cvs');
let ctx = null;
if(cvs.getContext){
    ctx = cvs.getContext('2d');
}

ctx.lineWidth = 5;
ctx.strokeStyle = '#005588';





