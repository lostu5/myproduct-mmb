/**
 * Created by Lokie on 2017/7/17.
 */
$(function() {
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcategorytitle',
        success:function(data) {
            var product = template('productlist',data);
        $('.tottleProduct').html(product);
        }
    })
    $(".tottleProduct").on('click','h4',function() {
        var Id =parseFloat($(this).attr('productId') );
        var that = this.nextElementSibling;
        console.log(that);
        $.ajax({
            type:'get',
            url:'http://182.254.146.100:3000/api/getcategory',
            data:{titleid:Id},
            dataType:'json',
            success:function(data) {
                console.log(data);
                var productArct = template('productArct',data);
                $(that).html(productArct);
            }
        })
        $(that).slideToggle(100);
        $(that).parents().siblings().find(".category").slideUp(100);
    })
})