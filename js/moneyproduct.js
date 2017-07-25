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
    var productid = GetQueryString("productid");
    console.log(productid);
    $(".back  span").click(function() {
        history.back();
    })
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrlproduct?productid='+productid+'',
        success:function(data) {
            console.log(data);
            var moneyproduct = template('money-con',data);
            $('.money-content').html(moneyproduct);
        }
    })
})