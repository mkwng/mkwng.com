
winTop = 0;
winHeight = 0;

$(document).ready(function() {
  $(".transition,.nav,.content").hide();

preload([
    'img/story-1/1-1.jpg',
    'img/story-1/1-2.jpg',
    'img/story-1/1-3.jpg',
    'img/story-1/1-4.jpg',
    'img/story-1/2-1.jpg',
    'img/story-1/2-2.jpg',
    'img/story-1/2-3.jpg',
    'img/story-1/2-4.png',
    'img/story-1/3-1.jpg',
    'img/story-1/3-2.jpg',
    'img/story-1/3-3.jpg'
]);

  // $(".feature-image").moveBg();
  $(window).bind("scroll resize",function() {
    updatePosition();

  });
  $(window).bind("resize",function() {
    $(".content").css("height",$(".content img.bg").height());
  });
});


preload = function(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

updatePosition = function() {
    winTop = $(window).scrollTop()+120;
    winHeight = $(window).height();

    if(winTop>240) {
      $(".transition,.nav").addClass("scroll");
    } else {
      $(".transition,.nav").removeClass("scroll");
    }

    $(".content-article-img").moveBg();

    if($(window).width() > 1600) {
      var $img = $(".content img.bg");
       $img.css({
        left: ($img.parent().width() - $img.width()) / 2
       });
    } else {
      var $img = $(".content img.bg");
       $img.css({left:"-25%"});
    }
}

$(".intro").click(function() {
  $(".transition,.nav").show();
  $(".intro").addClass("intro-remove");
  setTimeout(function() {
    $(".intro").remove();
    $(".content").show(function() {
      setTimeout(function() {
        $(".content").css("height",$(".content img.bg").height());
        updatePosition();
      },100);
    });
    // $(".content-article-img").moveBg();
  },500);
});

glitch = function(i) {
  if(i==1) {
    $(".one .content-article-img").css({"background-image":"url(img/story-1/1-1.jpg)"});
      setTimeout(function() {$(".one .content-article-img").css({"background-image":"url(img/story-1/1-2.jpg)"});},100);
      setTimeout(function() {$(".one .content-article-img").css({"background-image":"url(img/story-1/1-3.jpg)"});},200);
      setTimeout(function() {$(".one .content-article-img").css({"background-image":"url(img/story-1/1-4.jpg)"});},300);
      setTimeout(function() {$(".one .content-article-img").css({"background-image":"url(img/story-1/1.jpg)"});},400);
  } else if(i==2) {
    $(".two .content-article-img").css({"background-image":"url(img/story-1/3-1.jpg)"});
      setTimeout(function() {$(".two .content-article-img").css({"background-image":"url(img/story-1/3-2.jpg)"});},100);
      setTimeout(function() {$(".two .content-article-img").css({"background-image":"url(img/story-1/3-3.jpg)"});},200);
      setTimeout(function() {$(".two .content-article-img").css({"background-image":"url(img/story-1/3.jpg)"});},300);
  } else if(i==3) {
    $(".three .content-article-img").css({"background-image":"url(img/story-1/2-1.jpg)"});
      setTimeout(function() {$(".three .content-article-img").css({"background-image":"url(img/story-1/2-2.jpg)"});},100);
      setTimeout(function() {$(".three .content-article-img").css({"background-image":"url(img/story-1/2-3.jpg)"});},200);
      setTimeout(function() {$(".three .content-article-img").css({"background-image":"url(img/story-1/2-4.png)"});},300);
      setTimeout(function() {$(".three .content-article-img").css({"background-image":"url(img/story-1/2.png)"});},400);
  }
}

$(".one .content-article-img").click(function() {glitch(1)}).one("mouseover",function() {glitch(1)});
$(".two .content-article-img").click(function() {glitch(2)}).one("mouseover",function() {glitch(2)});
$(".three .content-article-img").click(function() {glitch(3)}).one("mouseover",function() {glitch(3)});

(function($){
   $.fn.moveBg = function() {
    $(this).each(function(index) {
      var height = $(this).height();
      var top = $(this).offset().top;
      // index,top + height - winTop,top - winBot
      var ratio = 1-Math.pow((winTop+winHeight-top)/(winHeight+height/2),1);
      $(this).css({"background-position-y":(ratio*100)+"%"});
    });
   };
}(jQuery));