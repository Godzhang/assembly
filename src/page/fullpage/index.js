import './index.css';
import pub from 'util/public.js';

(function(){
    const FullPage = function(container, params){
        const defaults = {
            container: container,
            width: window.innerWidth,
            height: window.innerHeight,
            pagination: false,
            paginationClickable: false
        }
        this.params = Object.assign({}, defaults, params);
        this.container = null;
        this.wrapper = null;
        this.activeIndex = 0;
        this.totalSlides = 0;
        this.scrollY = 0;
        this.isScroll = false;
        this.initPage();
    }
    FullPage.prototype.initPage = function(){
        pub.addEvent('DOMContentLoaded', function(){
            pub.addEvent('keydown', function(e){
                e.preventDefault();
                return false;
            });
        });

        window.onload = function(){
            this.container = document.querySelector('.fullscreen-container');
            this.wrapper = this.container.firstElementChild;
            this.refreshView(this.container);
            let type = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
            pub.addEvent(document, type, this.scrollFunc, false);
            this.pageTransitionEnd();
        }
        this.resize();
    }









})();













