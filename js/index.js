/**
 * Created by Administrator on 2017/2/17.
 */


window.onload = function () {

    changeNavColor();
    bannerSlider();
    secondKill();
}

window.onresize = function(){
    setTimeout(function(){
        window.location.reload();
    }, 200);
};


/*
 <----- 导航变色 ----->
*/

function changeNavColor() {

    // 1. 获取所需标签
    var nav = document.getElementById('jdHeader').children[0];
    var banner = document.getElementById('jdBanner');
    var bannerH = banner.offsetHeight;
    var scrollH = 0;

    // 2. 监听滚动事件
    window.onscroll = function () {
        scrollH = document.body.scrollTop;

        // 2.1 对比高度
        var opt = 0;
        if (scrollH < bannerH) {
            opt = scrollH / bannerH * 0.85;
        }
        else {
            opt = 0.85;
        }
        nav.style.background = 'rgba(201, 21, 35, ' + opt + ')';
    }
}


/*
 <----- 图片轮播 ----->
*/

function bannerSlider() {
    // 1. 获取标签
    var banner = document.getElementById('jdBanner');
    var bannerUl = banner.children[0];
    var bannerOlLis = banner.children[1].children;

    var bannerW = banner.offsetWidth;

    // 2. 设置过度 清除过度 位置改变
    var addTransition = function () {
        bannerUl.style.transition = 'all .5s';
        bannerUl.style.webkitTransition = 'all .5s';
    };
    var removeTransition = function () {
        bannerUl.style.transition = 'none';
        bannerUl.style.webkitTransition = 'none';
    };
    var changeTranslateX = function (x) {
        bannerUl.style.transform = 'translateX(' + x + 'px)';
        bannerUl.style.webkitTransform = 'translateX(' + x + 'px)';
    };

    var index = 1;
    var timer = null;
    timer = setInterval(autoPlay, 1000);
    function autoPlay() {
        index++;
        addTransition();
        changeTranslateX(-index * bannerW);
    }

    // 4. 图片结束移除过度
    mjd.transitionEnd(bannerUl, function () {
        if (index >= 9) {
            index = 1;
        }
        else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        changeTranslateX(-index * bannerW);
        scrollCircle();
    });

    // 5. 让指示器动起来
    function scrollCircle() {
        // 5.1 清除所有的classname 保留当前的
        for (var i = 0; i < bannerOlLis.length; i++) {
            bannerOlLis[i].className = '';
        }
        // 5.2 让圆点和图片的索引保持一直
        var circlrIndex = index;

        if (index >= 9) {
            circlrIndex = 1;
        }
        else if (index <= 0) {
            circlrIndex = 8;
        }
        bannerOlLis[circlrIndex - 1].className = 'current';
    }

    // 6. 滑动效果
    var beginX = 0, endX = 0, distanceX = 0;
    bannerUl.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        beginX = e.touches[0].clientX;

    });
    bannerUl.addEventListener('touchmove', function (e) {
        e.preventDefault();
        endX = e.touches[0].clientX;
        distanceX = beginX - endX;
        removeTransition();
        changeTranslateX(-index * bannerW - distanceX);

    });
    bannerUl.addEventListener('touchend', function () {
        if (Math.abs(distanceX) >= 1 / 3 * bannerW && endX != 0) {
            if (distanceX > 0) {
                index++
            }
            else {
                index--
            }
        }
        addTransition();
        changeTranslateX(-index * bannerW);

        timer = setInterval(autoPlay, 1000);


        beginX = 0;
        endX = 0;
        distanceX = 0;
    });
}


/*
 <----- 秒杀产品 ----->
*/
function secondKill() {
    // 7 倒计时
    var timer = null, timeEnd = 8 * 60 * 60;
    var secTime = document.getElementById('secTime');
    var spans = secTime.children;

    timer = setInterval(function () {
        timeEnd--;
        if (timeEnd <= 0) {
            clearInterval(timer);
        }
        var h = Math.floor(timeEnd / (60 * 60));
        var m = Math.floor(timeEnd % (60 * 60) / 60);
        var s = Math.floor(timeEnd % 60);

        spans[0].innerHTML = h >= 10 ? Math.floor(h / 10) : 0;
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = m >= 10 ? Math.floor(m / 10) : 0;
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = s >= 10 ? Math.floor(s / 10) : 0;
        spans[7].innerHTML = s % 10;
    }, 1000);
}










