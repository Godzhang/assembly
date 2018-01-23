import './index.css';
import pub from 'util/public.js';

window.onload = function(){
    const editor = document.querySelector('#editor');
    const btn = document.querySelector('#btn');
    const recover = document.querySelector('#recover');

    function getCurrentRange(){
        if(window.getSelection){
            let sel = window.getSelection();

            if(sel.rangeCount > 0){
                return sel.getRangeAt(0);
            }
        }else if(document.selection){
            let sel = document.selection;
            return sel.createRange();
        }
        return null;
    }

    function restoreSelection(){
        let selection = window.getSelection();
        if(range){
            try {
                selection.removeAllRanges();
            }catch(ex){
                document.body.crateTextRange().select();
                document.selection.empty();
            }
            selection.addRange(range);
        }
    }

    let range = null;

    function saveSelection(){
        range = getCurrentRange();
    }

    pub.addEvent(editor, 'keyup', () => {
        saveSelection();
    }, false);

    pub.addEvent(editor, 'mouseup', () => {
        saveSelection();
    }, false);

    pub.addEvent(recover, 'click', () => {
        restoreSelection();
    }, false);

    pub.addEvent(btn, 'click', () => {
        
    }, false);















}






