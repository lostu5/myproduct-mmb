/**
 * Created by Lokie on 2017/7/19.
 */
$(function() {
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var pageId = GetQueryString("pageid");
    pageId==null?pageId=1:pageId;  //�当前页码��
    console.log(pageId);
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl?pageid='+pageId+'',
        success:function(data) {
            console.log(data);
            var recomm = template('recommlist',data);
            var pageNum = Math.ceil(data.totalCount/data.pagesize)
            console.log(pageNum);//�总页数��
            $('.recommul').html(recomm);    //��商品列表
            if (pageId <= 1) {  //上下页
                $(".pageUp").attr("return", "false");
                $(".pageDown").attr("href", "moneyctrl.html?pageid=" + (+pageId+1) + " ");
            } else if (pageId == pageNum) {
                $(".pageUp").attr("href", "productList.html?pageid=" + (pageId-1) + " ")
                $(".pageDown").attr("return", "false");
            } else {
                $(".pageUp").attr("href", "moneyctrl.html?pageid=" + (pageId - 1) + " ");
                $(".pageDown").attr("href", "moneyctrl.html?pageid=" + (+pageId + 1) + " ");
            }
            var temp=[];
            var pageHref = '';
            for (var i=0;i<pageNum;i++){  //选页
                var pageHref = "moneyctrl.html?pageid=" + (i+1) + " ";
                temp.push('<li><a href="'+pageHref+'" class="nowPage">第 <i>'+(i+1)+'</i>/ <i>'+pageNum+'</i>  页</a></li>');
            }
            $('.pagecontrolList').html(temp.join(''));
        }
    })
    $(".nowPage").on('click',function() {
        $(".pagecontrolList").slideToggle(100);
    })
    $(".productPage .nowPage span").html(pageId);
    $(".recommul").on('click','li',function() {
        var productId = $(this).attr('productid');
        window.location.href="moneyproduct.html?productid="+productId+"";
    })
    $(".back  span").click(function() {
        history.back();
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