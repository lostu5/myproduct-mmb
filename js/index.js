/**
 * Created by Lokie on 2017/7/17.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'http://182.254.146.100:3000/api/getindexmenu',
        success:function(data) {
            var menuls = template('menulist',data);
            $('.menuul').html(menuls);
            $('.menuul li:nth-last-of-type(-n+4)').addClass('hidding');
            $('.menuul li:nth-of-type(8)').click(function() {
                $('.menuul li:nth-last-of-type(-n+4)').toggleClass('hidding');
            })
        }
    })
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl?pageid=1',
        success:function(data) {
            console.log(data);
            var recomm = template('recommlist',data);
            console.log(recomm);
            $('.recommul').html(recomm);
            $(".recommul").on('click','li',function() {
                var productid = $(this).attr('productid');
                window.location.href="moneyproduct.html?productid="+productid+"";
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