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
        let self = this;

        this.container = document.querySelector('.fullscreen-container');
        this.wrapper = this.container.firstElementChild;
        this.refreshView(this.container);
        let type = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
        pub.addEvent(document, type, this.scrollFunc.bind(self), false);
        this.pageTransitionEnd();
        this.resize();
    }
    FullPage.prototype.refreshView = function(elem){
        let wHeight = this.params.height;
        this.wrapper = elem.firstElementChild;
        let slides = this.container.querySelectorAll('.fullscreen-slide');
        if(this.params.pagination){
            // this.initPagePagination(slides);
        };
        this.totalSlides = slides.length;
        this.wrapper.style.height = wHeight * this.totalSlides + "px";
    };
    FullPage.prototype.scrollFunc = function(e){
        let direct = 0;
        e = e || window.event;
        if(!this.isScroll){
            if(e.wheelDelta){
                if(e.wheelDelta > 0){
                    this.scrollPrev();
                }else if(e.wheelDelta < 0){
                    this.scrollNext();
                };
            }else if(e.detail){
                if(e.detail < 0){
                    this.scrollPrev();
                }else if(e.detail > 0){
                    this.scrollNext();
                }
            }
        }
    };
    FullPage.prototype.scrollPrev = function(){
        if(this.activeIndex > 0){
            this.isScroll = true;
            this.scrollY += this.params.height;
            pub.setTransform(this.wrapper, 'translate3d(0, ' + this.scrollY + 'px, 0)');
            this.activeIndex--;
        };
    };
    FullPage.prototype.scrollNext = function(){
        if(this.activeIndex < this.totalSlides - 1){
            this.isScroll = true;
            this.scrollY -= this.params.height;
            pub.setTransform(this.wrapper, 'translate3d(0, ' + this.scrollY + 'px, 0)');
            this.activeIndex++;
        };
    };
    FullPage.prototype.pageTransitionEnd = function(){
        pub.transitionEnd(this.wrapper, () => {
            this.isScroll = false;
        });
    }
    FullPage.prototype.resize = function(){
        pub.addEvent(window, 'resize', this.initPage(), false);
    }
    window.FullPage = FullPage;
})();

var page = new FullPage('.fullscreen-container', {});











