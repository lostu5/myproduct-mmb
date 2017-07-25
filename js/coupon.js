/**
 * Created by Lokie on 2017/7/22.
 */
$(function() {
    $(".back  span").click(function () {
        history.back();
    })
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcoupon',
        success:function(data) {
            console.log(data);
            var pres_con = template("pres_con",data);
            $(".content").html(pres_con);
        }
    })

})