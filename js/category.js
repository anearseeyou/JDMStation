/**
 * Created by Administrator on 2017/2/17.
 */


window.onload = function () {
    changeCategory();
}

function changeCategory() {
    // 1. 获取元素

    var parentBox = document.getElementsByClassName('content-left')[0];
    var childBox = parentBox.getElementsByTagName('ul')[0];

    var parentH = parentBox.offsetHeight;
    var childH = childBox.offsetHeight;

    // 2. 确定合理的滚动区间
    var maxY = 0, minY = -(childH - parentH);

    // 3. 缓冲区间
    var buffer = 150;

    // 4. 过度效果\清除过度\改变位置

    var addTransition = function () {
        childBox.style.transition = 'all .25s';
        childBox.style.webkitTransition = 'all .25s';
    };
    var removeTransition = function () {
        childBox.style.transition = 'none';
        childBox.style.webkitTransition = 'none';
    };
    var changeTranslateY = function (y) {
        childBox.style.transform = 'translateY(' + y + 'px)';
        childBox.style.webkitTransform = 'translateY(' + y + 'px)';
    };

    // 5. 监听滑动
    var startY = 0, endY = 0, moveY = 0;

    var currentY = 0;  // 记录当前Y轴滚动位置

    childBox.addEventListener('touchstart', function (e) {
        // 获得起始位置
        startY = e.touches[0].clientY;
    });

    childBox.addEventListener('touchmove', function (e) {
        // 获得结束位置
        endY = e.touches[0].clientY;
        // 求出移动的距离
        moveY = startY - endY;
        // 移除过度效果
        if ((currentY - moveY) < (maxY + buffer) && (currentY - moveY) > (minY - buffer))
        {
            removeTransition();
            changeTranslateY(currentY - moveY);
        }
    });

    childBox.addEventListener('touchend', function (e) {
        // 向下滑动
        if (currentY - moveY > maxY) {
            currentY = maxY;

            // 添加过度效果 改变位置
            addTransition();
            changeTranslateY(currentY);
        }
        else if (currentY - moveY < minY) {
            currentY = minY;
            // 添加过度效果 改变位置
            addTransition();
            changeTranslateY(currentY);
        }
        else {
            currentY = currentY - moveY;
        }

        // 清零
        startY = 0;
        endY = 0;
        moveY = 0;
    });


    // 6. 点击切换 监听Tap事件
    var lis = childBox.children;
    mjd.tap(childBox, function (e) {
        // console.log(e);
        // 清空所有的classname
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';

            // 记录当前索引 绑定
            lis[i].index = i;
        }

        // 当前索引添加类名
        var li = e.target.parentNode;
        li.className = 'current';

        // 求出滚动的距离
        var distance = -(li.index * 50);

        // 判断
        if (distance > minY) {
            addTransition();
            changeTranslateY(distance);
            currentY = distance;
        }
        else {
            changeTranslateY(minY);
            currentY = minY;
        }

        // 模拟加载数据
        var rightContent = document.getElementsByClassName('content-right')[0];
        rightContent.style.transition = 'all .2s ease';
        rightContent.style.webkitTransition = 'all .2s ease';
        rightContent.style.opacity = 0;
        setTimeout(function () {
            rightContent.style.opacity = 1;
        }, 200);
    });
}







