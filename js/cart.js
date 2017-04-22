/**
 * Created by Administrator on 2017/2/20.
 */


window.onload = function () {
    modalBox();
}


function modalBox() {

    // 1. 获取标签

    var panel = document.getElementById('panel');
    var panelCon = panel.children[0];
    var panelFoot = panelCon.children[1];
    var cancel = panelFoot.children[0];

    var trashs = document.getElementsByClassName('trash');
    var chooseBox = document.getElementsByClassName('choose-box');

    //console.log(panel,panelCon,panelFoot,cancel,trashs.length,chooseBox.length);

    // 2. 监听点击 垃圾盖弹起 面板出现
    var trashUp;
    for (var i = 0; i < trashs.length; i++) {
        (function (index) {
            mjd.tap(trashs[index], function (e) {

                //alert('点击了第' + index + '个垃圾篓!');
                trashUp = trashs[index].firstElementChild;

                // 设置过度效果
                trashUp.style.transiton = 'all 0.5s ease';
                trashUp.style.webkitTransiton = 'all 0.5s ease';

                trashUp.style.transformOrigin = '0 5px';
                trashUp.style.webkitTransformOrigin = '0 5px';

                trashUp.style.transform = 'rotate(-45deg)';
                trashUp.style.webkitTransform = 'rotate(-45deg)';

                // 赋值
                panel.style.display = 'block';
                panelCon.className = 'panel_content jump';
            });
        })(i);
    }

    // 3. 点击取消按钮

    mjd.tap(cancel, function () {
        panel.style.display = 'none';
        trashUp.style.transiton = 'none';
        trashUp.style.webkitTransiton = 'none';
        trashUp.style.transform = 'rotate(0)';
        trashUp.style.webkitTransform = 'rotate(0)';
    });

    // 4. 点击选中
    for (var i = 0; i < chooseBox.length; i++) {
        mjd.tap(chooseBox[i], function (e) {
            if (e.target.hasAttribute('checked')) {
                e.target.removeAttribute('checked');
            }
            else {
                e.target.setAttribute('checked', ' ');
            }
        });
    }
}





















