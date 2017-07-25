/**
 * Created by Lokie on 2017/7/18.
 */
$(function () {
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    var url = window.location.search;
    var url1 = decodeURIComponent(url);
    console.log(url1)
    var Id = parseInt(url1.replace("?categoryid=", ""));
    var pageId = GetQueryString("pageid");
    pageId==null?pageId=1:pageId;  //获取页数
    console.log(pageId);
    var pageAll;
    $.ajax({   //获取单种商品的名称和id号
        url:'http://182.254.146.100:3000/api/getcategorybyid?categoryid='+Id,
        success:function(data) {
            console.log(data);
            $(".productName").html(data.result[0].category);
        }
    })

    $.ajax({    //详细商品列表
        url: 'http://182.254.146.100:3000/api/getproductlist?categoryid=' + Id + '&pageid=' + pageId + '',
        success: function (data) {
            var productList = template('productList', data);
            console.log(data);
            pageAll = Math.ceil(data.totalCount / data.pagesize)  //总页数
            $('.recommul').html(productList);
            console.log(pageAll);
            if (pageId <= 1) {
                $(".pageUp").attr("return", "false");
                $(".pageDown").attr("href", "productList.html?categoryid=" + Id + "&pageid=" + (+pageId+1) + " ");
            } else if (pageId == pageAll) {
                $(".pageUp").attr("href", "productList.html?categoryid=" + Id + "&pageid=" + (pageId-1) + " ")
                $(".pageDown").attr("return", "false");
            } else {
                $(".pageUp").attr("href", "productList.html?categoryid=" + Id + "&pageid=" + (pageId - 1) + " ");
                $(".pageDown").attr("href", "productList.html?categoryid=" + Id + "&pageid=" + (+pageId + 1) + " ");
            }
            var temp=[];
            var pageHref = '';
            for (var i=0;i<pageAll;i++){
                var pageHref = "productList.html?categoryid=" + (Id) + "&pageid=" + (i+1) + " ";
            temp.push('<li><a href="'+pageHref+'" class="nowPage">第 <i>'+(i+1)+'</i>/ <i>'+pageAll+'</i> 页</a></li>');
            }
           $('.pagecontrolList').html(temp.join(''));
            
        }
    })
    $(".nowPage").on('click',function() {
        $(".pagecontrolList").slideToggle(100);
    })
    $(".productPage .nowPage span").html(pageId);

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
