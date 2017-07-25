/**
 * Created by Lokie on 2017/7/20.
 */

$(function () {
    $(".back  span").click(function () {
        history.back();
    })
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getinlanddiscount',
        success: function (data) {
            console.log(data);
            var result = {};
            var data_conn = data.result; //处理数据
            var data_pics = data_conn.splice(0, 6);  //每一加载6个
            console.log(data_pics);
            var inlanddiscount = template("inlanddiscount-con", {result: data_pics});  //拼接数据
            console.log({result: data_pics})
            $(".inland-ul").html(inlanddiscount); //渲染到页面
            var pageY = $(document.body).height() //整个页面的高度
            console.log(pageY);
            var scrollTop = $(document.body).scrollTop();  //卷出的高度
            console.log(scrollTop);
            var clientHeight = $(window).height();  //可视区高度
            console.log(clientHeight);
            var flag = false;
            $(window).on("scroll", function () {
                var pageY = $(document.body).height() //整个页面的高度
                console.log(pageY);
                var scrollTop = $(document.body).scrollTop();  //卷出的高度
                console.log(scrollTop);
                var clientHeight = $(window).height();  //可视区高度
                console.log(clientHeight);
                console.log((clientHeight + scrollTop + 60) + "===" + pageY)
                if (pageY <= clientHeight + scrollTop + 60 && flag === false) {
                    flag = true;
                    $(".inlanddiscount-content").append("<div id='loading'>正在加载 请等待.....</div>");
                        data_pics = data_conn.splice(0, 4);  //每一加载4个
                        console.log(data_pics);
                        console.log(data_pics);
                        if (data_pics.length == 0) {
                            $(window).off("scroll");
                            $("#loading").html("<div id='loading'>到底了,没有啦~~~ ^-^</div>");
                            return;
                        }
                        var inlanddiscount = template("inlanddiscount-con", {result: data_pics});  //拼接数据
                        console.log({result: data_pics})
                    setTimeout(function () {
                        $("#loading").remove();
                        $(".inland-ul").append(inlanddiscount); //渲染到页面
                        flag = false;
                    }, 500)
                }
            })


            $(".inland-ul").on('click', 'li', function () {
                var productid = $(this).attr("productId");
                window.location.href = "discount.html?productid=" + productid;
            })

        }
    })

    /*火箭*/
    $('body').append('<div class="sidetoTop"></div>');
    $(document).on("scroll", function () {
        var scrollTop = $(document.body).scrollTop()
        if (scrollTop > 10) {
            $(".sidetoTop").slideDown(1000);
        } else {
            $(".sidetoTop").fadeOut(1000);
        }
    })
    $(".sidetoTop").click(function () {
        animate($(document.body), 0)
        $(this).css("transition", "bottom ease 2s").css("background-position", "-250px 0").css("bottom", "600px");
        setTimeout(function () {
            $(".sidetoTop").css("transition", "none").css("bottom", "10px").css("background-position", "0 0");
        }, 2000)
    })
    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = $(obj).scrollTop();
            /*当前高度*/
            var temp = (target - leader) / 10;
            temp > 0 ? Math.ceil(temp) : Math.floor(temp);
            leader += temp;
            if (Math.abs(target - leader) <= Math.abs(temp)) {
                $(obj).scrollTop(target);
                clearInterval(obj.timer)
            }
            $(obj).scrollTop(leader);
        }, 15)
    }
})