/**
 * Created by Lokie on 2017/7/23.
 */
$(function () {
  $.get("http://182.254.146.100:3000/api/getbrandtitle", function (data) {
    //console.log(data);  /*最开始的数据*/
    var brandTitle = template("brandTitle", data);
    $(".product-ul").html(brandTitle);
  })
  $(".product-lis-all").on("click", "li", function () {
    var brandTitleId = $(this).attr("brandTitleId");
    var brandTitle = $(this).html().split("<")[0];
    //console.log(brandTitle);
    $.get("http://182.254.146.100:3000/api/getbrand?brandtitleid=" + brandTitleId, function (data) {  /*第二个数据*/
      $(".product-lis-nav h3").html(brandTitle).css("font-weight", "600");
      $(".product-lis").removeClass().addClass("product-lis product-lis-grup")
      var brandTitle_lis = template("brandTitle-lis", data);
      $(".product-lis").html(brandTitle_lis);
      var color = ["#F10E0E", "#FF9314", "#8ADF5B"];
      $.each(color, function (i, v) {
        $($(".product-lis-grup").find("s")[i]).css("backgroundColor", color[i]);
      })
      secendClick(function() {  /*点击第三个页面*/
        $(".product-lis-img").on("click","li",function() {
          var productId =$(this).attr("productId");
          $(this).siblings().remove();
          var product_img = $(this).parent()[0];
          console.log(productId);
          $.get("http://182.254.146.100:3000/api/getproductcom?productid="+productId,function(data){  /*第四个页面的获取*/
            //$(".product-lis-nav h3").html(brandTitle).css("font-weight","400");
            console.log(data);
            $(".progress-com-cov").css("display","block")
            var product_lis_com = template("product-lis-com",data);
            $(".progress-com-cov").html(product_lis_com);
            $(".progress-com").before($(product_img).parent().clone(true));
            $(product_img)[0].remove();
            //obj();
          })
        })
      })

    })
  })

  /*点击第二个页面的li*/
  function secendClick(obj) {
    $(".product-lis-grup").on("click", "li", function () {
      var brandTitleId =$(this).attr("brandTitleId");
      var brandTitle = $(this).find("h4").html();
      //console.log(brandTitleId);
      //console.log(brandTitle);
      $.get("http://182.254.146.100:3000/api/getbrandproductlist?brandtitleid="+brandTitleId+"&pagesize"+"8",function(data){  /*第三个页面的获取*/
        $(".product-lis-nav h3").html(brandTitle).css("font-weight","400");
        //console.log(data);
        $(".product-lis").removeClass().addClass("product-lis product-lis-img")
        var product_lis_img = template("product-lis-img",data);
        $(".product-lis").html(product_lis_img);
        obj();
      })
    })
  }


  /*火箭*/
  $('body').append('<div class="sidetoTop"></div>');
  $(document).on("scroll", function () {
    var scrollTop = $(document.body).scrollTop();
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


$("header>span").click(function() {
  //history.go(-1);
  window.location.href =  history.go(-1);
})

})