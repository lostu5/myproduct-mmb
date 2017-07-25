/**
 * Created by Lokie on 2017/7/22.
 */
$(function () {
    $(".back  span").click(function () {
        history.back();
    })
    function getUrlData() {
        var url = window.location.search;
        url = url.slice(1).split("&");
        var obj = {};
        var arr = []
        $(url).each(function(i,v) {
            arr = v.split("=");
            obj[arr[0]] = [arr[1]].toString();
        })
        return obj;
    }
    var couponId =  getUrlData().couponId;
    console.log(couponId);
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getcouponproduct?couponid='+couponId,
        success: function (data) {
            var data_pcs = data.result.splice(0,10);
            console.log(data_pcs);
            var product_con = template("product_con", {resule:data_pcs});
            $(".product-content").html(product_con);
            var flag = true;
            /*延迟加载*/
            $(window).scroll(function() {
                var bodyHeight = $(document.body).height(); //页面高度
                var bodyscrollTop = $(document.body).scrollTop(); //卷高度
               var clientHeight =  $(window).innerHeight(); //可视区高度

                if(bodyHeight<=bodyscrollTop+clientHeight+60&flag===true){
                    flag = false;
                    var data_pcs = data.result.splice(0,10);
                    var product_con = template("product_con", {resule:data_pcs});
                    $(".product-content").append(product_con);
                    flag = true
                    if(data_pcs.length ===0){
                        $(".product-content").append("<div style='color: red'>没有啦 ^=^</div>");
                        flag = false;
                        return false;
                    }
                }
            })
            /*点击出现轮播图*/
            $(".product-content").on("click","span",function() {
                var productid = $(this).attr("id")
                $(".cover").css("display", "block");
               var imgs = $("#"+productid).children();
                $(".cover_img").html(imgs[0].cloneNode(true));
                $(".cover_left").click(function() {
                    productid -=1;
                    productid<=0?productid=0:productid;
                    var imgs = $("#"+productid).children();
                    $(".cover_img").html(imgs[0].cloneNode(true));
                })
                $(".cover_right").click(function() {
                    productid = +productid+1;
                    console.log(productid);
                    var imgs = $("#"+productid).children();
                    $(".cover_img").html(imgs[0].cloneNode(true));
                })
                $(".cover_img").click(function() {
                    $(".cover").css("display", "none");
                })

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