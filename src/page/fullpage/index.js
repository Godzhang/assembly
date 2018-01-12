import './index.css';
import pub from 'util/public.js';

(function(){
    const FullPage = function(container, params){
        const defaults = {
            width: window.innerWidth,
            height: window.innerHeight,
            pagination: false,
            paginationClickable: false,
            pageChangeStart(){},
            pageChangeEnd(){}
        }
        this.params = Object.assign({}, defaults, params);
        this.container = typeof container === 'string' ? document.querySelectorAll(container)[0] : container;
        this.container = this.container.length ? this.container[0] : this.container;
        this.wrapper = this.container.firstElementChild;
        this.activeIndex = 0;
        this.slides = this.container.querySelectorAll('.fullscreen-slide');
        this.totalSlides = this.slides.length;
        this.scrollY = 0;
        this.isScroll = false;
        this.init();
    }
    FullPage.prototype.init = function(){
        //初始化页面元素宽或高，生成焦点导航
        this.initView();
        //绑定事件
        this.bindEvent();
    };
    FullPage.prototype.initView = function(){
        let wrapHeight = this.params.height;
        this.wrapper.style.height = wrapHeight * this.totalSlides + "px";
        for(let i = 0, len = this.slides.length; i < len; i++){
            this.slides[i].style.height = wrapHeight + 'px';
        }
        if(this.params.pagination){
            this.initPagePagination(this.slides);
        };
    };
    FullPage.prototype.bindEvent = function(){
        let type = ((/Firefox/i).test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';
        pub.addEvent(document, type, this.scrollFunc.bind(this), false);
        this.pageTransitionEnd();
        this.resize();
    };
    FullPage.prototype.initPagePagination = function(slides){
        let self = this;

        this.pagination = document.createElement("div");
        this.pagination.className = 'fullscreen-pagination';
        for(let i = 0, len = slides.length; i < len; i++){
            let tab = document.createElement('span');
            if(i === 0){
                tab.className = 'fullscreen-pagination-bullet fullscreen-pagination-bullet-active';
            }else{
                tab.className = 'fullscreen-pagination-bullet';
            }
            tab.index = i;
            this.pagination.appendChild(tab);
        }
        this.container.appendChild(this.pagination);
        if(this.params.paginationClickable){
            let p = this.pagination.querySelectorAll('.fullscreen-pagination-bullet');
            for(let i = 0, len = p.length; i < len; i++){
                pub.addEvent(p[i], 'click', function(){
                    self.scrollTo(this.index);
                }, false);
            }
        }
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
            this.scrollTo(this.activeIndex - 1);
        };
    };
    FullPage.prototype.scrollNext = function(){
        if(this.activeIndex < this.totalSlides - 1){
            this.scrollTo(this.activeIndex + 1);
        };
    };
    FullPage.prototype.scrollTo = function(index){
        if(index === this.activeIndex) return;

        if(this.params.pageChangeStart){
            this.params.pageChangeStart(this.params);
        }

        this.isScroll = true;
        this.scrollY += this.params.height * (this.activeIndex - index);
        pub.setTransform(this.wrapper, 'translate3d(0, ' + this.scrollY + 'px, 0)');
        this.activeIndex = index;
    };
    FullPage.prototype.pageTransitionEnd = function(){
        let self = this;

        let p = this.params.pagination && this.pagination.querySelectorAll('.fullscreen-pagination-bullet');

        pub.transitionEnd(this.wrapper, function(){
            self.isScroll = false;
            for(let i = 0, len = self.slides.length; i < len; i++){
                self.slides[i].className = 'fullscreen-slide';
                if(p){p[i].className = 'fullscreen-pagination-bullet';}
            }
            self.slides[self.activeIndex].classList.add('active');
            if(p){p[self.activeIndex].classList.add('fullscreen-pagination-bullet-active');}

            if(self.params.pageChangeEnd){
                self.params.pageChangeEnd(self.params);
            }
        });
    };
    FullPage.prototype.resize = function(){
        pub.addEvent(window, 'resize', this.initPage, false);
    };
    window.FullPage = FullPage;
})();

var page = new FullPage('.fullscreen-container', {
    pagination: true,
    paginationClickable: true,
    pageChangeStart(params){
        
    },
    pageChangeEnd(params){
        
    }
});











