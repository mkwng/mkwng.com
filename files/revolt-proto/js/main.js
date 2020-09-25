$(document).ready(function() {

  $("article.content-feed-article h1 a").each(function() {
    $clamp($(this)[0], {clamp:'auto'});
  }); 

  $(window).scroll( $.throttle( 50, scrollUpdate ) );

});

scrollUpdate = function() {
  $("article").futureClass();
  if($(window).scrollTop()>320)
    $(".header-logo").removeClass("splash");
  else
    $(".header-logo").addClass("splash");


  if($(window).scrollTop()>640)
    $("header").stick("splash");
  else
    $("header").unstick("splash");
}


hideArticle = setTimeout(function(){},0);
$returnedArticle = $(".expanded-child");
$returnedVideo = $(".expanded-video");

$("article.content-feed-article.article-news").click(function(e) {
  e.preventDefault();
  clearTimeout(hideArticle);
  $t = $(this);
  $c = $returnedArticle.clone();
  if($t.hasClass("expanded-parent")) {
    $c = $t.next(".expanded-child");
    $t.removeClass("expanded-parent").css("z-index",11);
    $c.slideUp(function() {
      hideArticle=setTimeout(function(){
        $(".expanded-child").remove();
        $t.attr("style","");
        $("article").futureClass();
      },500);
    });
    $("article").removeClass("future");
    $("#cover").removeClass("visible");
  } else {
    $t.addClass("expanded-parent");
    $c.insertAfter($t).slideDown();
    $.scrollTo($t, 500 );
    $("#cover").addClass("visible");
  }
});


$("article.content-feed-article.article-video").click(function(e) {
  e.preventDefault();
  clearTimeout(hideArticle);
  $t = $(this);
  $v = $returnedVideo.clone().removeClass("sticky");
  if($t.hasClass("expanded-parent")) {
    $v = $t.prev(".expanded-video");
    $t.removeClass("expanded-parent").css("z-index",11);
    $v.slideUp(function() {
      hideArticle=setTimeout(function(){
        $(".expanded-video").remove();
        $t.attr("style","");
        $("article").futureClass();
      },500);
    });
    $("article").removeClass("future");
    $(window).unbind('scroll',checkStick);
  } else {
    $t.addClass("expanded-parent");
    $v.css({overflow:"hidden","max-height":"1px",display:"block"}).insertBefore($t).fitVids();
    $.scrollTo($v, 500 );
    $v.css({"max-height":"1000px"});

    pos = $v.offset().top+$v.find(".video-container").height()-44;

    checkStick = function() {
      var yes = pos-$(window).scrollTop()<150;
      if (yes) 
        $v.stick();
      else
        $v.unstick();
    }

    $(window).bind('scroll',checkStick);


  }
});


(function($){
  $.fn.stick = function() {
    $t = $(this);
    if(!$t.hasClass("sticky")){
      $placeholder = $('<div class="video-placeholder"></div>').css({height:$t.height(),width:'1px'});
      $placeholder.insertAfter($t);
      $t.addClass("sticky");
    }
  };
  $.fn.unstick = function() {
    $t = $(this);
    if($t.hasClass("sticky")){
      $('.video-placeholder').remove();
      $t.removeClass("sticky");
    }
  };

  $.fn.futureClass = function() {
    $(this).each(function() {
      $t = $(this);
      if($t.offset().top+50>$(window).scrollTop()+$(window).height())
        $t.addClass("future");
      else
        $t.removeClass("future");
    });
  };
}(jQuery));


