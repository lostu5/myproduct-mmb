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
    console.log(url)
    var productId = parseInt(url.replace("?productId=", ""));
    var categoryId = GetQueryString("categoryId");
    var productCom = parseInt(GetQueryString("productCom").split("(")[1]);
    console.log(categoryId);
    console.log(productId);
    console.log(productCom);
    $.ajax({   //获取商品种类 放到标签中
        url:'http://182.254.146.100:3000/api/getcategorybyid?categoryid='+categoryId,
        success:function(data) {
            console.log(data);
            $(".productName").html(data.result[0].category).attr('href','productList.html?categoryid='+categoryId+'');
        }
    })
    $.ajax({
        url:'http://182.254.146.100:3000/api/getproduct?productid='+productId,
        success:function(data) {
            console.log(data);
            var title = (data.result[0].productName).split(" ")[0];
            $(".product_self").html(title);
            $(".product_content>h4").html(data.result[0].productName);
            $(".product_content>a").html(data.result[0].productImg);
            $(".product_content>div").html(data.result[0].bjShop);

        }
    })
    $.ajax({
        url:'http://182.254.146.100:3000/api/getproductcom?productid='+productId,
        success:function(data) {
            var product_talk = template("product_t",data);
            console.log(data)
            $('.product_talk_list').html(product_talk);
            $('.product_talk_num').html(productCom);
        }
    })




})
