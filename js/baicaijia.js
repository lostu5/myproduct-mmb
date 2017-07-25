/**
 * Created by Lokie on 2017/7/17.
 */
$(function () {
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getbaicaijiatitle',
        success: function (data) {
            console.log(data);
            var recomm = template('baicai-titleId', data);
            $('.swiper-wrapper').html(recomm);
            $(".swiper-wrapper").on('click', 'div', function () {
                var titleId = $(this).attr('titleId');
                console.log(titleId);
            })
            /*导航*/
            $(".swiper-wrapper>div:nth-of-type(1)").addClass("active");
            var mySwiper = new Swiper('#topNav', {
                freeMode: true,
                freeModeMomentumRatio: 0.5,
                slidesPerView: 'auto',
            });
            swiperWidth = mySwiper.container[0].clientWidth; //视口的大小
            maxTranslate = mySwiper.maxTranslate();//最大可平移距离
            //console.log(maxTranslate);
            maxWidth = -maxTranslate + swiperWidth / 2;
            //console.log(maxWidth);
            $(".swiper-container").on('tap', function (e) {
                e.preventDefault()
            })
            slide = $(".swiper-wrapper>div:nth-of-type(1)"); //第一个添加默认选中
            //slideLeft = slide.offsetLeft;
            //slideWidth = slide.clientWidth;
            //slideCenter = slideLeft + slideWidth / 2;
            mySwiper.on('tap', function (swiper, e) {
                //console.log(swiper);
                //console.log(e);
                //e.preventDefault();
                slide = swiper.slides[swiper.clickedIndex];
                slideLeft = slide.offsetLeft; //距离左边缘
                //console.log(slideLeft)
                slideWidth = slide.clientWidth; //标签大小
                //console.log(slideWidth)
                slideCenter = slideLeft + slideWidth / 2;// 被点击slide的中心点
                //console.log(slideCenter)
                mySwiper.setWrapperTransition(300); //延时动画
                //如果点击的标签距离小于视口的一半 则偏移为0
                if (slideCenter < swiperWidth / 2) {
                    //console.log(slideCenter);
                    //console.log(swiperWidth / 2);
                    mySwiper.setWrapperTranslate(0)
                    //当点击标签大于最大的可移动距离 则为最大的最大可平移距离
                } else if (slideCenter > maxWidth) {
                    mySwiper.setWrapperTranslate(maxTranslate)
                } else { //点击的坐标减去视口的一半而剩余的距离
                    nowTlanslate = slideCenter - swiperWidth / 2;
                    //console.log(slideCenter);
                    //console.log(swiperWidth / 2);
                    //console.log(nowTlanslate);
                    //这个距离就是需要移动的距离
                    mySwiper.setWrapperTranslate(-nowTlanslate)
                }
                $("#topNav  .active").removeClass('active');//删除默认选中

                $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active') //当前点击添加选中
            })
        }
    })


    $.ajax({
        url: 'http://182.254.146.100:3000/api/getbaicaijiaproduct?titleid=0',
        success: function (data) {
            console.log(data);
            var baicaijialist = template('baicaijiacon', data);
            //console.log(recomm);
            $('.recommul').html(baicaijialist);

            $(".swiper-wrapper").on('click', '.swiper-slide', function () {
                var titleId = $(this).attr('titleId');
                //window.location.href="moneyproduct.html?productid="+titleId+"";
                $.ajax({
                    url: 'http://182.254.146.100:3000/api/getbaicaijiaproduct?titleid=' + titleId,
                    success: function (data) {
                        console.log(data);
                        var baicaijialist2 = template('baicaijiacon', data);
                        $('.recommul').html(baicaijialist2);
                    }
                })
            })
        }
    })

    $(".back  span").click(function () {
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







