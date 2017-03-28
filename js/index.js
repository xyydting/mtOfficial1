//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = document.getElementById('box');
//呈现loading效果
document.write(_LoadingHtml);

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
        setTimeout(function(){
            var loadingMask = document.getElementById('box');
            loadingMask.parentNode.removeChild(loadingMask);
        },1000);
    }
};


window.onload = function () {
    //fullpage开始
    $("#fullpage").fullpage({
        // 设置背景色
        anchors: ['mao_page', 'mao_business', 'mao_show', 'mao_news', 'mao_about', 'mao_contant'],//锚链接
        resize:true,//字体是否随着窗口缩放而变小
        menu: '#navBar',
        afterLoad: function (anchorLink, index) {
            $("section").removeClass("current");

            // 延时100毫秒执行
            setTimeout(function () {
                $("section").eq(index - 1).addClass("current");
            }, 500);
        }
    });

    //右侧分享导航效果开始
    $(".share a").mouseenter(function () {
        $(this)
            .css("opacity", 1)
            .siblings()
            .css("opacity", 0.3);
    });
    $(".share").mouseleave(function () {
        $(this).find("a").css("opacity", 1);
    });


    ////轮播图
    var box = document.getElementById("lb-box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var ulLis = ul.children;
    var arr = document.getElementById("arr");
    var arrRight = document.getElementById("right");
    var arrLeft = document.getElementById("left");
    var imgwWidth = screen.offsetWidth;
    var timer = null;


    //动态追加元素，显示按钮
    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }

    //无缝拼接，点击按钮显示图片
    var olLis = ol.children;
    olLis[0].className = "current";
    var fiestImg = ulLis[0].cloneNode(true);
    ul.appendChild(fiestImg);
    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;
        olLis[j].onmouseover = function () {
            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }
            this.className = "current";

            var target = -this.index * imgwWidth;
            animate(ul, target);

            pic = square = this.index;
        }
    }


    //箭头显示图片
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timer);
    }
    box.onmouseout = function () {
        arr.style.display = "none";
        timer = setInterval(playNext, 5000);
    }
    var pic = 0;
    var square = 0;
    arrRight.onclick = function () {
        playNext();
    }
    arrLeft.onclick = function () {
        if (pic == 0) {
            ul.style.left = -(ulLis.length - 1) * imgwWidth + "px";
            pic = ulLis.length - 1;
        }
        pic--;

        var target = -pic * imgwWidth;
        animate(ul, target);

        if (square > 0) {
            square--;
        } else {
            square = ol.length - 1;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square] = "current";
    }
    //添加自动滚动
    timer = setInterval(playNext, 5000);

    function playNext() {
        if (pic == ulLis.length - 1) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;
        var target = -pic * imgwWidth;
        animate(ul, target);

        //按钮跟着走
        //square表示当前应该亮起的按钮
        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }


    //定时器
    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            var step = 35;
            step = leader < target ? step : -step;
            if (Math.abs(target - leader) > Math.abs(step)) {
                leader = leader + step;
                obj.style.left = leader + "px";
            } else {
                obj.style.left = target + "px";
            }
        }, 15);
    }

    //todo
    $(function () {
        // 1. 给所有li菜单绑定鼠标移上来的事件
        $(".second_tab_item").mouseenter(function () {
            // 3. 获取到当前菜单的索引号
            var index = $(this).index();

            // 4. 通过索引号对应关系 让这个索引号对应的内容展示出来
            $(".second_tab_box:eq(" + index + ")").addClass("selected").siblings().removeClass("selected");
        });
    });
    //todo


    //第三屏
    var third_wrap = document.getElementById("third_wrap");
    var third_slide = document.getElementById("third_slide");
    var third_ul = third_slide.children[0];
    var third_lis = third_ul.children;
    var third_arrRight = document.getElementById("third_arrRight");
    var third_arrLeft = document.getElementById("third_arrLeft");
    var third_arrow = document.getElementById("third_arrow");
    var third_config = [//config 配置
        {
            width: 170,
            top: 110,
            left: 230,
            opacity: 0.6,
            zIndex: 2
        },//0
        {
            width: 220,
            top: 80,
            left: 75,
            opacity: 0.8,
            zIndex: 3
        },//1
        {
            width: 290,
            top: 50,
            left: 400,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 220,
            top: 80,
            left: 800,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            width: 170,
            top: 110,
            left: 680,
            opacity: 0.6,
            zIndex: 2
        }//4
    ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度

    //1.鼠标经过盒子 渐渐地显示arrow 鼠标离开 渐渐地隐藏arrow
    third_wrap.onmouseover = function () {
        third_animate(third_arrow, {"opacity": 1});
    }
    third_wrap.onmouseout = function () {
        third_animate(third_arrow, {"opacity": 0});
    }

    //2.根据配置单 对每一个li的位置进行分配
    function third_assign() {
        for (var i = 0; i < third_lis.length; i++) {
            //让图片渐渐地到达指定位置
            third_animate(third_lis[i], third_config[i], function () {
                //执行回调函数的时候说明动画已经执行完了
                flag = true;//打开节流阀
                if (i == 0 || i == 4) {
                    lis[i].setAttribute('')
                }
            });
        }
    }

    third_assign();

    //3.点击箭头让木马转起来
    third_arrRight.onclick = function () {
        if (flag) {//点击按钮的时候对阀门的状态进行判断 如果是打开的就可以执行
            //flag = false;//关闭节流阀
            //点击右侧按钮 配置单 删除第一个元素 追加到结尾
            third_config.push(third_config.shift());//修改配置单
            third_assign();//根据修改完成的配置单对位置进行重新分配
        }
    }
    third_arrLeft.onclick = function () {
        if (flag) {
            //flag = false;
            //点击左侧按钮 配置单 删除最后一个 追加到开头
            third_config.unshift(third_config.pop());//修改配置单
            third_assign();//根据修改完成的配置单对位置进行重新分配
        }
    }

    //4.添加节流阀
    var flag = true;//flag为true的时候表示节流阀打开 箭头可以点击


    function third_animate(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;
            for (var k in json) {
                if (k == "opacity") {
                    var leader = getStyle(obj, k) * 100;
                    var target = json[k] * 100;
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    obj.style[k] = (leader + step) / 100;
                } else if (k == "zIndex") {
                    obj.style[k] = json[k];
                } else {
                    var leader = parseInt(getStyle(obj, k)) || 0;
                    var target = json[k];
                    var step = (target - leader) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    obj.style[k] = leader + step + "px";
                }
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 15)
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj, null)[attr];
        }
    }


    //第四屏新闻滚动事件
    var fourth_light = document.getElementById("fourth_light");
    var fourth_news = fourth_light.children[0];
    var fourth_ul = fourth_news.children[0];
    var fourth_lis = fourth_ul.children;
    var fourth_arr = document.getElementById("fourth_buttonbox");
    var fourth_arrUp = document.getElementById("fourth_pre");
    var fourth_arrDown = document.getElementById("fourth_next");
    var fourth_Height = fourth_lis[1].offsetHeight/2;
    var fourth_timer = null;


    //箭头显示图片
    fourth_arr.onmouseover=function(){
        clearInterval(fourth_timer);
    }
    fourth_arr.onmouseout=function(){
        fourth_timer=setInterval(fourth_playNext,3000);
    }
    var fourth_pic=0;
    fourth_arrUp.onclick=function(){
        fourth_playNext();
    }
    fourth_arrDown.onclick=function(){
        if(fourth_pic==0){
            fourth_ul.style.top=-(fourth_lis.length-1)*fourth_Height+"px";
            fourth_pic=fourth_lis.length-1;
        }
        fourth_pic--;

        var target=-fourth_pic*fourth_Height;
        fourth_animate(fourth_ul,target);

    }
    //添加自动滚动
    fourth_timer=setInterval(fourth_playNext,6000);

    function fourth_playNext(){
        if(fourth_pic==fourth_lis.length-1){
            fourth_ul.style.top=0;
            fourth_pic=0;
        }
        fourth_pic++;
        var target=-fourth_pic*fourth_Height;
        fourth_animate(fourth_ul,target);
    }


    //定时器
    function fourth_animate(obj,target){
        clearInterval(obj.fourth_timer);
        obj.fourth_timer=setInterval(function(){
            var leader=obj.offsetTop;
            var step=10;
            step=leader<target?step:-step;
            if(Math.abs(target-leader)>Math.abs(step)){
                leader=leader+step;
                obj.style.top=leader+"px";
            }else{
                obj.style.top=target+"px";
            }
        },20);
    }

    //$('.fourth_news').vTicker({
    //    speed: 1000,     //滚动速度，单位毫秒。
    //
    //    pause: 5000,        //暂停时间，就是滚动一条之后停留的时间，单位毫秒。
    //
    //    showItems: 1,      //显示内容的条数。
    //
    //    animation: 'fade',  //动画效果，默认是fade，淡出。
    //
    //    mousePause: true,   //鼠标移动到内容上是否暂停滚动，默认为true。
    //
    //    height: 456,        //滚动内容的高度。
    //
    //    direction: 'up'     //滚动的方向，默认为up向上，down则为向下滚动。
    //});


    //第六屏关于我们页面tab切换
    $(function () {
        // 1. 给所有li菜单绑定鼠标移上来的事件
        $(".tab-item").mouseenter(function () {
            // 2. 让当前这个元素有 红色标记的状态，让它所有的兄弟元素取消这个状态
            // active
            $(this).addClass("active").siblings().removeClass("active");

            // 3. 获取到当前菜单的索引号
            var index = $(this).index();

            // 4. 通过索引号对应关系 让这个索引号对应的内容展示出来
            $(".main:eq(" + index + ")").addClass("selected").siblings().removeClass("selected");
        });
        // 1. 给所有li菜单绑定鼠标点击的事件
        $(".tab-item").click(function () {
            // 2. 让当前这个元素有 红色标记的状态，让它所有的兄弟元素取消这个状态
            // active
            $(this).addClass("active").siblings().removeClass("active");

            // 3. 获取到当前菜单的索引号
            var index = $(this).index();

            // 4. 通过索引号对应关系 让这个索引号对应的内容展示出来
            $(".main:eq(" + index + ")").addClass("selected").siblings().removeClass("selected");
        });
    });


}
