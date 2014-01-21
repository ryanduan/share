
var scrollY = 0,
    scrollNum = 0,
    sectionHeight,
    sectionLength;

$(function(){
    sectionLength = $('.section').length;
    setLayout();

    var hash = window.location.hash;
    if (hash !== '') {
        initScrollTop(hash);
    }

    $(window).resize(function(){
        var footerHeight = $('.footer').height(),
            windowWidth = $(window).width(),
            windowHeight = $(window).height(),
            imgHeight = windowWidth * 790 / 1600;

        sectionHeight = windowHeight - footerHeight;

        if (windowWidth < 1280) {
            $('.section .bgimg').width(1280);
            windowWidth = 1280;
        }

        $('.section .bgimg').width(windowWidth);

        if (imgHeight < sectionHeight) {
            imgHeight = sectionHeight;
        }

        $('.section .bgimg').height(imgHeight);

        setLayout();
        $('.body').scrollTop(scrollY);
    });

    $('#mainnav').find('a').click(function(){
        if (!$(this).hasClass('back')) {
            navSelect($(this));
            return false;
        }
    });
    var bodyWrapper = document.getElementById('scrollBody');

    // Firefox鼠标滚轮事件为DOMMouseWheel，其他浏览器为mousewheel
    if (document.addEventListener) {
        bodyWrapper.addEventListener('DOMMouseScroll',mouseWheelAction, false);
    }
    bodyWrapper.onmousewheel = mouseWheelAction;

    $(document).keydown(function(event){
        keyOpt(event);
    });
});

function initScrollTop(hash){
    scrollNum = $('.section').index($(hash));
    scrollY = sectionHeight * scrollNum;

    scrollWrapper(scrollNum, scrollY);
}

function keyOpt(event){
    var kCode = event.keyCode;

    // 键盘向上的keycode为38，向下为40
    if (!$('.body').is(':animated')) {
        if (kCode === 38 ) {
            scrollY = scrollY - sectionHeight;
            scrollNum = scrollNum - 1;
        }
        if (kCode === 40) {
            scrollY = scrollY + sectionHeight;
            scrollNum = scrollNum + 1;
        }

        if (scrollY > sectionHeight * (sectionLength - 1)){
            scrollNum = sectionLength - 1;
            scrollY = sectionHeight * (sectionLength - 1);
        }
        if (scrollY < 0) {
            scrollNum = 0;
            scrollY = 0;
        }
        scrollWrapper(scrollNum, scrollY);
    }
}

function mouseWheelAction(event){
    var delta;

    /*  Firefox的滚动事件返回值为event.detail
     *  其他浏览器滚动事件返回值为event.wheelDelta
     *  滚轮滚动的返回值，Firefox向上返回值为负数，向下为正数；其他浏览器向上为正数，向下为负数！
     */
    if (!event) {
        event = window.event;
        delta = event.wheelDelta;
    }else if (event.wheelDelta) {
        delta = event.wheelDelta;
    }else if(event.detail){
        delta = -event.detail;
    }

    if (!$('.body').is(':animated')) {
        if (delta > 0) {
            scrollY = scrollY - sectionHeight;
            scrollNum = scrollNum - 1;
        }else{
            scrollY = scrollY + sectionHeight;
            scrollNum = scrollNum + 1;
        }

        if (scrollY > sectionHeight * (sectionLength - 1)){
            scrollNum = sectionLength - 1;
            scrollY = sectionHeight * (sectionLength - 1);
        }
        if (scrollY < 0) {
            scrollNum = 0;
            scrollY = 0;
        }

        scrollWrapper(scrollNum, scrollY);
    }
}

function scrollWrapper(scrollNum, scrollY){
    navChange(scrollNum);

    $('.body').animate({
        scrollTop : scrollY
    }, 400);
}

function navChange(index){
    $('#mainnav').find('a').removeClass('cur');
    $('#mainnav').find('li:nth-child(' + (index+1) + ') a').addClass('cur');
}


function navSelect(e){
    scrollNum = $('#mainnav a').index(e);
    scrollY = sectionHeight * scrollNum;

    scrollWrapper(scrollNum, scrollY);
}

// 依据屏幕高度初始化每栏的高度
function setLayout(){
    var footerHeight = $('.footer').height(),
        windowHeight = $(window).height(),
        windowWidth = $(window).width(),
        imgHeight = windowWidth * 790 / 1600;

    sectionHeight = windowHeight - footerHeight;

    if (imgHeight < sectionHeight) {
        imgHeight = sectionHeight;
        $('.section .bgimg').height(imgHeight);
    }

    scrollY = scrollNum * sectionHeight;
    $('.section').height(sectionHeight);
}